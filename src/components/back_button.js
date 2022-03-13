import React from "react";

const BackButton = ({ navigateHandler }) => {
  return (
    <button
      onClick={() => navigateHandler()}
      className="flex space-x-2 items-center px-3 py-1 border rounded-lg capitalize"
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
      <span>back</span>
    </button>
  );
};

export default BackButton;
