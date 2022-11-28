import React, { useContext, useState } from "react";

const MainContext = React.createContext();
const MainUpdateContext = React.createContext();

export function useMain() {
  return useContext(MainContext);
}

export function useMainUpdate() {
  return useContext(MainUpdateContext);
}

export function MainProvider({ children }) {
  const [logged, setLogged] = useState(!!localStorage.getItem("JWT"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [url] = useState(process.env.BACKEND_URL);
  const [JWT, setJWT] = useState(localStorage.getItem("JWT"));
  const [act, setAct] = useState("Dashboard");
  const [fav, setFav] = useState({});
  return (
    <MainContext.Provider value={{ logged, user, url, JWT, act, fav }}>
      <MainUpdateContext.Provider
        value={{
          setLogged,
          setJWT,
          setAct,
          setUser,
          setFav,
        }}
      >
        {children}
      </MainUpdateContext.Provider>
    </MainContext.Provider>
  );
}
