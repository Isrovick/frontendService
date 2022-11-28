import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pageSections/Home.jsx";
import { Dashboard } from "./userSections/Dashboard";
import { Login } from "./access/Login";
import { SignUp } from "./access/SignUp";
import { Logout } from "./access/Logout";
import { Profile } from "./userSections/Profile";
import { Header } from "./pageSections/Header";
import { SubHeader } from "./pageSections/SubHeader";
import { FavouriteQuestion } from "./userSections/FavouriteQuestion";
import { SetToken } from "./userSections/SetToken";
import { Favourites } from "./userSections/Favourites";

export const Subapp = () => {
  return (
    <Router>
      <div className="min-h-full">
        <Header />
        <SubHeader />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <Routes>
                <Route element={<Home />} path={"/"} exact />
                <Route element={<Dashboard />} path={"/Dashboard"} />
                <Route element={<Favourites />} path={"/Favourites"} />
                <Route element={<Profile />} path={"/Profile"} />
                <Route element={<Login />} path={"/Login"} />
                <Route element={<SignUp />} path={"/signUp"} />
                <Route element={<Logout />} path={"/Logout"} />
                <Route element={<SetToken />} path={"/SetToken"} />
                <Route
                  element={<FavouriteQuestion />}
                  path={"/FavouriteQuestion/:idUser/:name/:flag"}
                />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
};
