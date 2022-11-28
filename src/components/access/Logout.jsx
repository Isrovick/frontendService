import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useMain, useMainUpdate } from "../../mainContext";

export const Logout = () => {
  const [flag, setFlag] = useState(0);
  const { logged, JWT } = useMain();
  const { setLogged, setJWT, setAct, setUser } = useMainUpdate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleYes = () => {
    setFlag(1);
  };

  const handleNo = () => {
    setFlag(2);
  };

  useEffect(() => {
    setAct("Log Out");
    if (flag === 1) {
      localStorage.removeItem("JWT", null);
      setJWT(null);
      localStorage.removeItem("user", null);
      setUser(null);
      setLogged(false);
    }
  }, [flag, logged, JWT]);

  if (!logged || flag === 1) {
    return <Navigate to={"/login"} />;
  }

  if (logged && flag === 2) {
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
              <div className="form-group my-2">
                Are you Sure you want to logout?
              </div>
              <div className="form-group my-2" />
              <div className="form-group my-2">
                <button
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  type="submit"
                  onClick={handleYes}
                >
                  Yes
                </button>
                <div className="form-group my-2" />
                <button
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-sky-500/50 py-2 px-4 text-sm font-medium text-white hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  type="submit"
                  onClick={handleNo}
                >
                  No
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
