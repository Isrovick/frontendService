import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useMain, useMainUpdate } from "../../mainContext";
import { apolloClient } from "../../index";
import { setFavourite } from "../../gql/queries";

export const FavouriteQuestion = () => {
  const { logged } = useMain();
  const { setAct } = useMainUpdate();
  const { idUser, name, flag } = useParams();
  const [action, setAction] = useState(0);
  if (!logged) {
    return <Navigate to={"/login"} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleYes = () => {
    setAction(1);
  };

  const handleNo = () => {
    setAction(2);
  };

  useEffect(() => {
    setAct("Favourite Question");
  }, [action, logged]);

  if (action) {
    console.log(flag);
    if (action === 1)
      apolloClient
        .mutate({
          mutation: setFavourite(idUser, name),
        })
        .then((res) => {
          console.log(res);
          return <Navigate to={"/Dashboard"} />;
        })
        .catch((err) => {
          console.log(err);
        });

    return "Loading...";
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
                {flag ? (
                  <div className="form-group my-2">
                    Are you Sure you want to add "{name}" to your favourite
                    repos?
                  </div>
                ) : (
                  <div className="form-group my-2">
                    Are you Sure you want to Remove "{name}" to your favourite
                    repos?
                  </div>
                )}
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
