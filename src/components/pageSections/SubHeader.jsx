import React, { Component, useState } from "react";
import { useMain } from "../../mainContext";

export const SubHeader = () => {
  const { act } = useMain();
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {act}
          </h1>
        </div>
      </header>
    </>
  );
};
