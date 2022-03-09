import React, { useState } from "react";
import Menu from "./menu";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Nav = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  return (
    <div className="col-span-1 bg-gray-100 flex flex-col">
      <div className="h-14 border-b border-gray-200 w-full" />
      <div className="space-y-3 flex-grow mt-5">
        <Menu
          selected={currentIndex === 0}
          onClickHandler={() => {
            setCurrentIndex(0);
          }}
        >
          <Link to="/admin/dashboard">
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
          </Link>
        </Menu>
        <Menu
          selected={currentIndex === 1}
          onClickHandler={() => {
            setCurrentIndex(1);
          }}
          subMenus={[
            <NavLink to="/admin/drivers/list">
              {({ isActive }) => (
                <div
                  className={`pl-12 py-2 flex space-x-2  ${
                    isActive && "bg-gray-200"
                  }`}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="capitalize text-sm">drivers list</span>
                </div>
              )}
            </NavLink>,
            <NavLink to="/admin/drivers/new">
              {({ isActive }) => (
                <div
                  className={`pl-12 py-2 flex space-x-2  ${
                    isActive && "bg-gray-200"
                  }`}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="capitalize text-sm">new driver</span>
                </div>
              )}
            </NavLink>,
          ]}
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
          onClickHandler={() => setCurrentIndex(2)}
          subMenus={[
            <NavLink to="/admin/ticketers/list">
              {({ isActive }) => (
                <div
                  className={`pl-12 py-2 flex space-x-2  ${
                    isActive && "bg-gray-200"
                  }`}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="capitalize text-sm">ticketers list</span>
                </div>
              )}
            </NavLink>,
            <NavLink to="/admin/ticketers/new">
              {({ isActive }) => (
                <div
                  className={`pl-12 py-2 flex space-x-2  ${
                    isActive && "bg-gray-200"
                  }`}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="capitalize text-sm">new ticketer</span>
                </div>
              )}
            </NavLink>,
          ]}
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
          onClickHandler={() => setCurrentIndex(3)}
          subMenus={[
            <NavLink to="/admin/buses/new">
              {({ isActive }) => (
                <div
                  className={`pl-12 py-2 flex space-x-2  ${
                    isActive && "bg-gray-200"
                  }`}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="capitalize text-sm">new bus</span>
                </div>
              )}
            </NavLink>,
          ]}
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
          onClickHandler={() => setCurrentIndex(5)}
          subMenus={[
            <NavLink to="/admin/bus_stats/list">
              {({ isActive }) => (
                <div
                  className={`pl-12 py-2 flex space-x-2  ${
                    isActive && "bg-gray-200"
                  }`}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="capitalize text-sm">stats list</span>
                </div>
              )}
            </NavLink>,
            <NavLink to="/admin/bus_stats/new">
              {({ isActive }) => (
                <div
                  className={`pl-12 py-2 flex space-x-2  ${
                    isActive && "bg-gray-200"
                  }`}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="capitalize text-sm">new stat</span>
                </div>
              )}
            </NavLink>,
          ]}
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
            <span>Bus Statistics</span>
          </div>
        </Menu>

        <Menu
          selected={currentIndex === 6}
          onClickHandler={() => {
            setCurrentIndex(6);
            navigate("/admin/settings");
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
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span>Settings</span>
          </div>
        </Menu>
      </div>
    </div>
  );
};

export default Nav;
