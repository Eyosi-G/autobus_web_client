import React, { useState } from "react";

const Menu = ({
  children,
  onClickHandler,
  selected = false,
  subMenus = [],
}) => {
  return (
    <div
      className={`border-l-4  ${
        selected ? "border-green-300" : "border-gray-800"
      }`}
    >
      <div
        className={`flex px-5 py-2 justify-between ${
          selected && "bg-gray-700"
        }`}
        onClick={() => {
          onClickHandler();
        }}
      >
        {children}
        {subMenus.length > 0 && (
          <button>
            {selected ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </button>
        )}
      </div>
      {subMenus.length > 0 && (
        <div className={`${!selected && "hidden"}`}>
          {subMenus.map((subMenu) => {
            return subMenu;
          })}
        </div>
      )}
    </div>
  );
};

export default Menu;
