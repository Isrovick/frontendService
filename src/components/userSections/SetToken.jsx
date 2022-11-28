import React, { useEffect, useState } from "react";
import { useMain, useMainUpdate } from "../../mainContext";
import { Navigate } from "react-router-dom";
import { setGithubCredentials } from "../../gql/queries";
import { apolloClient } from "../../index";

export const SetToken = () => {
  const [username, setusername] = useState("");
  const [token, settoken] = useState("");

  const { logged, user } = useMain();
  const { setAct } = useMainUpdate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(false);
  useEffect(() => {
    setAct("Github Credentials");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    apolloClient
      .mutate({
        mutation: setGithubCredentials(user.id, username, token),
      })
      .then((res) => {
        setLoading(false);
        setData(true);
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.log(err);
      });
  };
  const HandleUserName = (e) => {
    setusername(e.target.value);
  };

  const HandleToken = (e) => {
    settoken(e.target.value);
  };

  if (!logged) {
    return <Navigate to={"/Login"} />;
  }
  if (loading) return "Loading...";
  if (error) return `Error inserting credentials! ${error}`;
  if (data) return "Credentials inserted successfully!";
  return (
    <div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="row"></div>
        <div className="row">
          <div className="col-sm"></div>
          <div className="col-sm">
            <form onSubmit={handleSubmit}>
              <div className="form-group my-2">Github Credentials</div>
              <div className="form-group my-2">
                <input
                  type="username"
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Username"
                  onChange={HandleUserName}
                />
              </div>
              <div className="form-group my-2">
                <input
                  type="token"
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Token"
                  onChange={HandleToken}
                />
              </div>
              <div className="form-group my-2">
                <button
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  type="submit"
                >
                  Set Token
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
