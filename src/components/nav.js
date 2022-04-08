import React, { useEffect, useState } from "react";
import Menu from "./menu";
import lion from "../resources/images/lion.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Nav = ({ menuOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate()
  return (
    <div
      className={`${
        menuOpen ? "hidden" : "flex"
      } flex-col min-w-max col-span-1 bg-gray-800  `}
      style={{ zIndex: 150 }}
    >
      <div className="h-36 p-2 flex justify-center items-center">
        <img src={lion} className="h-full  object-cover text-white" />
      </div>
      <div className="space-y-3 flex-grow mt-5 text-white">
        <Menu
          selected={currentIndex === 0}
          onClickHandler={() => {
            setCurrentIndex(0);
            navigate("/admin/dashboard");
          }}
        >
          <div className="flex space-x-2 justify-start items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span>Dashboard</span>
          </div>
        </Menu>
        <Menu
          selected={currentIndex === 1}
          onClickHandler={() => {
            setCurrentIndex(1);
            navigate("/admin/drivers/list");
          }}
        >
          <div className="flex space-x-2 justify-start items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span>Drivers</span>
          </div>
        </Menu>
        <Menu
          selected={currentIndex === 2}
          onClickHandler={() => {
            setCurrentIndex(2);
            navigate("/admin/ticketers/list");
          }}
        >
          <div className="flex space-x-2 justify-start items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span>Ticketers</span>
          </div>
        </Menu>
        <Menu
          selected={currentIndex === 3}
          onClickHandler={() => {
            setCurrentIndex(3);
            navigate("/admin/buses/list");
          }}
        >
          <div className="flex space-x-2 justify-start items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
            </span>
            <span>Buses</span>
          </div>
        </Menu>

        <Menu
          selected={currentIndex === 4}
          onClickHandler={() => {
            setCurrentIndex(4);
            navigate("/admin/timeframes/list");
          }}
        >
          <div className="flex space-x-2 justify-start items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span>Schedules</span>
          </div>
        </Menu>
        <Menu
          selected={currentIndex === 5}
          onClickHandler={() => {
            setCurrentIndex(5);
            navigate("/admin/bus_stats/list");
          }}
        >
          <div className="flex space-x-2 justify-start items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
              </svg>
            </span>
            <span>Bus Stats</span>
          </div>
        </Menu>
      </div>
    </div>
  );
};

export default Nav;
