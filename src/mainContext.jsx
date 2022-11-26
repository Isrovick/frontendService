import React, { useContext, useState, useEffect } from "react";
import axio from "axios";
const { REACT_APP_BACKEND_URL } = process.env;

const MainContext = React.createContext();
const MainUpdateContext = React.createContext();
export function useMain() {
  return useContext(MainContext);
}

export function useMainUpdate() {
  return useContext(MainUpdateContext);
}

export function MainProvider({ children }) {
  const [logged, setlogged] = useState(true);
  const [user, setUser] = useState({
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
      "https://www.pockettactics.com/wp-content/sites/pockettactics/2021/07/coin-master-free-spins-new-550x309.jpg",
  });
  const [url, seturl] = useState(process.env.BACKEND_URL);
  const [JWT, setJWT] = useState(localStorage.getItem(null));
  const [act, setAct] = useState("Dashboard");
  const aux = logged
    ? [{ name: "Dashboard", current: false }]
    : [
        { name: "LogIn", current: false },
        { name: "SignUp", current: false },
      ];
  const [sections, setSections] = useState(aux);

  return (
    <MainContext.Provider value={{ logged, user, url, JWT, act, sections }}>
      <MainUpdateContext.Provider
        value={{
          setlogged: setlogged,
          setJWT: setJWT,
          setname: setUser,
          setAct: setAct,
          setSections: setSections,
        }}
      >
        {children}
      </MainUpdateContext.Provider>
    </MainContext.Provider>
  );
}
