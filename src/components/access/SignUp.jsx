import React, { useEffect, useState } from "react";
import { useMain, useMainUpdate } from "../../mainContext";
import { Navigate } from "react-router-dom";
import { apolloClient } from "../../index";
import { signUp } from "../../gql/queries";

export const SignUp = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [password_confirmaton, setpassword_confirmaton] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(false);

  const { logged } = useMain();
  const { setLogged, setAct, setUser, setJWT } = useMainUpdate();

  useEffect(() => {
    setAct("Sign up");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password_confirmaton) {
      alert("passwords don't match");
    }
    setLoading(true);
    apolloClient
      .mutate({
        mutation: signUp(name, email, password),
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setData(res.data.signUp);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.log(err);
      });
  };

  if (logged) {
    return <Navigate to={"/Dashhoard"} />;
  }

  const HandleEmail = (e) => {
    setemail(e.target.value);
  };
  const HandlePassword = (e) => {
    setpassword(e.target.value);
  };
  const HandlePasswordC = (e) => {
    setpassword_confirmaton(e.target.value);
  };
  const HandleN = (e) => {
    setName(e.target.value);
  };

  if (loading) return "Loading...";
  if (error) return `Error Signing up! ${error}`;
  if (data) {
    const { token, user } = data;
    localStorage.setItem("JWT", token);
    setJWT(token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setLogged(true);
    return <Navigate to={"/Dashboard"} />;
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="row"></div>
      <div className="row">
        <div className="col-sm">Sign up</div>
        <div className="col-sm">
          <form onSubmit={handleSubmit}>
            <div className="form-group my-2">
              <input
                type="text"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Name"
                onChange={HandleN}
              />
            </div>
            <div className="form-group my-2">
              <input
                type="email"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email"
                onChange={HandleEmail}
              />
            </div>
            <div className="form-group my-2">
              <input
                type="password"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                onChange={HandlePassword}
              />
            </div>
            <div className="form-group my-2">
              <input
                type="password"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password confirmation"
                onChange={HandlePasswordC}
              />
            </div>
            <div className="form-group my-2">
              <button
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="col-sm"></div>
      </div>
    </div>
  );
};
