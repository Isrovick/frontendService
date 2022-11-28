import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useMain, useMainUpdate } from "../../mainContext";
import { findAll } from "../../gql/queries";
import { useQuery } from "@apollo/client";
import { RepoList } from "../pageSections/RepoList";

export const Favourites = () => {
  const { logged, user } = useMain();
  const { setAct } = useMainUpdate();

  if (!logged) {
    return <Navigate to={"/Login"} />;
  }
  const { loading, error, data } = useQuery(findAll(user.id));

  useEffect(() => {
    setAct("Favourites");
  }, []);

  if (loading) return "Loading...";
  if (error) {
    return (
      <div>
        <h1>
          Something went wrong... <br /> <br />
          Please check set the credentials at > Profile -> Github Credentials
        </h1>
      </div>
    );
  }
  return (
    <div>
      <RepoList
        _repos={data.findAll.filter((repo) => repo.favourite)}
        _favs={true}
      />
    </div>
  );
};
