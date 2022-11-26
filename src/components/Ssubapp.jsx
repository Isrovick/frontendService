import React, { Component, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useMain, useMainUpdate } from "../mainContext";
import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Home } from "./Home.jsx";
import { Dashboard } from "./Dashboard";
import { Login } from "./Login";
import { Register as SignUp } from "./Register";
import { Logout } from "./Logout";
import { Profile } from "./Profile";

export const Subapp = () => {
  const { logged, user, act, sections } = useMain();
  const { setAct, setSections } = useMainUpdate();

  function classNames(name, ...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <Router>
        <>
          <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-800">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {sections.map((item) => (
                          <Link
                            to={item.name}
                            key={item.name}
                            onClick={() => setAct(item.name)}
                            className={classNames(
                              item.current,
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  {user && (
                    <Link to={`/Profile`} onClick={() => setAct("Profile")}>
                      <div className="border-t border-gray-700 pt-4 pb-3">
                        <div className="flex items-center px-5">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user ? user.imageUrl : null}
                              alt=""
                            />
                          </div>

                          <div className="ml-3">
                            <div className="text-base font-medium leading-none text-white">
                              {user ? user.name : null}
                            </div>
                            <div className="text-sm font-medium leading-none text-gray-400">
                              {user ? user.email : null}
                            </div>
                          </div>
                          <Link
                            to={`/logout`}
                            onClick={() => setAct("Log Out")}
                          >
                            <div className="text-sm font-medium leading-none text-gray-400 hover:text-white focus:outline-none">
                              <ArrowLeftOnRectangleIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </Disclosure>
            <header className="bg-white shadow">
              <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {act}
                </h1>
              </div>
            </header>
            <main>
              <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                  <Routes>
                    <Route element={<Home />} path={"/"} exact />
                    <Route element={<Dashboard />} path={"/Dashboard"} />
                    <Route element={<Profile />} path={"/Profile"} />
                    <Route element={<Login />} path={"/Login"} />
                    <Route element={<SignUp />} path={"/Register"} />
                    <Route element={<Logout />} path={"/Logout"} />
                  </Routes>
                </div>
              </div>
            </main>
          </div>
        </>
        ) }
      </Router>
    </>
  );
};
