import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMain } from "../../mainContext";
import { Disclosure } from "@headlessui/react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

export const Header = () => {
  const { logged, user, act } = useMain();

  const updateSections = () => {
    return logged
      ? [{ name: "Dashboard", current: false }]
      : [
          { name: "LogIn", current: false },
          { name: "SignUp", current: false },
        ];
  };

  const [sections, setSections] = useState(updateSections());
  function classNames(name, ...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    setSections(updateSections());
  }, [logged, act]);

  return (
    <>
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
            {user && logged && (
              <>
                <div className="border-t border-gray-700 pt-4 pb-5">
                  <Link to={`/Profile`}>
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={
                            user.profilePictureUrl ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                          }
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
                    </div>
                  </Link>
                </div>

                <div className="border-t border-gray-700 pt-4 pb-7">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <Link to={`/logout`}>
                        <div className="text-sm font-medium leading-none text-gray-400 hover:text-white focus:outline-none">
                          <ArrowLeftOnRectangleIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Disclosure>
    </>
  );
};
