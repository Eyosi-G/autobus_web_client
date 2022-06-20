import React, { useEffect, useState } from "react";

const Paginate = ({
  limits = [],
  total,
  page,
  limit = 0,
  onLimitChange,
  onPageChange,
}) => {
  if (limits.length === 0) throw new Error("limits length can't be 0");
  if (!limits.includes(limit)) throw new Error("limit isn't found in limits");

  const backPage = () => {
    onPageChange(page - 1);
  };
  const nextPage = () => {
    onPageChange(page + 1);
  };
  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <p>limit : </p>
        <select
          className="bg-transparent border outline-none px-2 "
          value={limit}
          onChange={(e) => {
            onLimitChange(parseInt(e.target.value));
          }}
        >
          {limits.map((limit) => {
            return (
              <option className="border-none" value={limit}>
                {limit}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex space-x-2">
        <p>page : {page + 1}</p>
      </div>
      <div className="flex space-x-2 items-center">
        <button
          type="button"
          disabled={page === 0}
          className={`${page === 0 && "text-gray-400"}`}
          onClick={backPage}
        >
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
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
        </button>
        <button
          type="button"
          disabled={limit * (page + 1) >= total}
          className={`${limit * (page + 1) >= total && "text-gray-400"}`}
          onClick={nextPage}
        >
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
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Paginate;
