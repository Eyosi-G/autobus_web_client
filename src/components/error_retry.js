import React from "react";

const ErrorRetry = ({ action, errorMsg }) => {
  return (
    <div className="flex h-72 w-full justify-center items-center">
      <div className="flex flex-col items-center space-y-2 ">
        <div className="text-sm text-gray-500 capitalize">{errorMsg}</div>
        <button
          onClick={action}
          className="rounded-md py-1 px-2 border outline-none capitalize"
        >
          retry
        </button>
      </div>
    </div>
  );
};

export default ErrorRetry;
