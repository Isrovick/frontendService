import React from "react";
import { Navigate } from "react-router-dom";
import { useMain } from "../../mainContext";

export const Home = () => {
  const { logged } = useMain();

  if (logged) {
    return <Navigate to={"/Dashhoard"} />;
  } else {
    return <Navigate to={"/login"} />;
  }
};
