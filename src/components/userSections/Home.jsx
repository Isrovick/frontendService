import React from "react";
import { Navigate } from "react-router-dom";
import { useMain, useMainUpdate } from "../../mainContext";

export const Home = () => {
  const { logged, url, tkn } = useMain();
  const { setlogged } = useMainUpdate();

  if (logged) {
    return <Navigate to={"/Dashhoard"} />;
  } else {
    return <Navigate to={"/login"} />;
  }
};
