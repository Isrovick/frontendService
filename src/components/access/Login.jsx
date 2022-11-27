import React, { useEffect, useState } from "react";
import { useMain, useMainUpdate } from "../../mainContext";
import axio from "axios";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { logged, url } = useMain();
  const { setlogged, setname, setAct } = useMainUpdate();

  useEffect(() => {
    setAct("Log In");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axio
      .post(
        url + "login",
        {
          headers: {},
          user: {
            email: email,
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        setlogged(response.data.logged_in);
        setname(response.data.name);
        localStorage.setItem("tkn", response.data.tkn);
        localStorage.setItem("name", response.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
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
