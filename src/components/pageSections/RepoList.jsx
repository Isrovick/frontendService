import React, { useEffect, useReducer, useState } from "react";
import { Navigate } from "react-router-dom";
import { useMain } from "../../mainContext";
import { apolloClient } from "../../index";
import { findAll, setFavourite } from "../../gql/queries";

export const RepoList = ({ _repos, _favs }) => {
  const { logged, user } = useMain();
  const [repos, setRepos] = useState(_repos);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  if (!logged) return <Navigate to={"/login"} />;

  useEffect(() => {}, [ignored]);

  const handleFavourite = (id, name, index) => {
    apolloClient
      .mutate({
        mutation: setFavourite(id, name),
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    let newRepos = repos.map((repo) => {
      if (repo.idUser === id && repo.name === name) {
        repo.favourite = !repo.favourite;
      }
      return repo;
    });
    if (_favs) {
      newRepos = newRepos.filter((repo) => repo.favourite);
    }
    setRepos(newRepos);
    forceUpdate();
  };
  return (
    <ul role="list" className="-my-6 divide-y divide-gray-200">
      {repos.map((repo, index) => (
        <li key={index} className="flex py-6">
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md"></div>
          {repo.isPrivate ? (
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
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          ) : (
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
                d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          )}
          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>
                  <a href={repo.href}>{repo.name}</a>
                </h3>
                <button
                  type="button"
                  className="font-medium hover:text-indigo-500"
                  onClick={() => handleFavourite(repo.idUser, repo.name)}
                >
                  {repo.favourite ? (
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
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  ) : (
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
                        d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">{repo.color}</p>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
              <p className="text-gray-500">Owner: {repo.owner}</p>

              <div className="flex">
                <a
                  href={repo.url}
                  target={"_blank"}
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {repo.url}
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
