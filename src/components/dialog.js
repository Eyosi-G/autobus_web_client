import React, { useState } from "react";

const Dialog = ({
  open = false,
  close = () => {},
  severity = "success",
  message = "",
}) => {
  if (!(severity === "success" || severity === "failure"))
    throw new Error("illegal serverity");
  return (
    <div
      className={`${!open && "hidden"}  rounded border-l-8 ${
        severity == "success" ? "border-l-green-400" : "border-l-red-400"
      } border-l-green-400 flex bg-white py-2 px-4`}
    >
      <span
        className={`${
          severity == "success" ? "text-green-400" : "text-red-400"
        } flex items-center mx-2`}
      >
        {severity == "success" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </span>
      <div className="flex flex-col">
        <p>{severity == "success" ? "Success" : "Failure"}</p>
        <p className="text-gray-500 capitalize">{message}</p>
      </div>
      <span className="flex-grow"></span>
      <button className="text-gray-300 uppercase" onClick={()=>close()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Dialog;
