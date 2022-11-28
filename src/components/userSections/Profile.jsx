import React, { useEffect } from "react";
import { useMain, useMainUpdate } from "../../mainContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Profile = () => {
  const { logged, user } = useMain();
  const { setAct } = useMainUpdate();

  useEffect(() => {
    setAct("Profile");
  }, []);

  if (!logged) return <Navigate to={"/login"} />;
  return (
    <>
      <ul role="list" className="-my-6 divide-y divide-gray-200">
        <li key={user.id} className="flex py-6">
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img
              src={
                user.profilePictureUrl ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt="User profile picture"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>
                  <a href="#">{user.name}</a>
                </h3>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </a>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
              <p className="text-gray-500">{user.email}</p>

              <div className="flex">
                <Link to={`/SetToken`}>
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {"Github Credentials"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};
