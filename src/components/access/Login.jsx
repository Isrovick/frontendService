import React, { useEffect, useState } from "react";
import { useMain, useMainUpdate } from "../../mainContext";
import { Navigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { login } from "../../gql/queries";

export const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { logged } = useMain();
  const { setLogged, setAct, setUser, setJWT } = useMainUpdate();
  const [getLazyQuery, { data, loading, error }] = useLazyQuery(
    login(email, password)
  );

  useEffect(() => {
    setAct("Log In");
  }, [data, loading, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getLazyQuery();
  };
  const HandleEmail = (e) => {
    setemail(e.target.value);
  };

  const HandlePassword = (e) => {
    setpassword(e.target.value);
  };

  if (logged) {
    return <Navigate to={"/Dashboard"} />;
  }
  if (loading) return "LOADING";
  if (error) return `Error! ${error}`;
  if (data) {
    const { token, user } = data.login;
    localStorage.setItem("JWT", token);
    setJWT(token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setLogged(true);
    return <Navigate to={"/Dashboard"} />;
  }
  return (
    <div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="row"></div>
        <div className="row">
          <div className="col-sm"></div>
          <div className="col-sm">
            <form onSubmit={handleSubmit}>
              <div className="form-group my-2">Log In</div>
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
                <button
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="col-sm"></div>
        </div>
      </div>
    </div>
  );
};
