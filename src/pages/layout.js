import React, { useState } from "react";
import Nav from "../components/nav";
import { Routes as RootRoute, Route, useNavigate } from "react-router-dom";
import Drivers from "./driver/drivers";
import AddEditDriver from "./driver/add_edit_driver";
import AddEditTicketer from "./ticketer/add_edit_ticketer";
import Ticketers from "./ticketer/ticketers";
import AddEditRoute from "./route/add_edit_route";
import Schedules from "./schedule/schedules";

import BusStats from "./bus_stats/bus_stats";
import AddEditRouteStat from "./bus_stats/add_edit_bus_stats";
import Dashboard from "./dashboard/dashboard";
import Settings from "./settings/settings";
import Routes from "./route/routes";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth/actions";
import AddEditBus from "./bus/add_edit_bus";
import Buses from "./bus/buses";
import AddEditSchedule from "./schedule/add_edit_schedule";
const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className="grid grid-cols-5 h-screen overflow-hidden">
      <Nav menuOpen={menuOpen} />
      <div
        className={`overflow-y-scroll ${
          menuOpen ? "col-span-5" : "col-span-4"
        }`}
      >
        <div className=" flex flex-col min-h-screen ">
          <div className="h-14 w-full border-b border-gray-200 flex justify-between items-center">
            <button onClick={toggleMenu} className="ml-2">
              {menuOpen ? (
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
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              ) : (
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
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
            <div className="mr-6 group">
              <div className="bg-slate-100 h-12 w-12 rounded-full relative flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div className="hidden group-hover:flex flex-col absolute bg-gray-50   space-y-3 right-3 px-3 py-3 drop-shadow-lg rounded-md">
                <button
                  className="flex space-x-2"
                  onClick={() => navigate("/admin/settings")}
                >
                  <span>
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </span>
                  <span>settings</span>
                </button>
                <button className="flex space-x-2" onClick={logoutHandler}>
                  <span>
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </span>
                  <span>logout</span>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 flex-grow p-4 ">
            <RootRoute>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="drivers/list" element={<Drivers />} />
              <Route path="drivers/new" element={<AddEditDriver />} />
              <Route path="ticketers/list" element={<Ticketers />} />
              <Route path="ticketers/new" element={<AddEditTicketer />} />
              <Route path="routes/new" element={<AddEditRoute />} />
              <Route path="routes/list" element={<Routes />} />
              <Route
                path="routes/:id/edit"
                element={<AddEditRoute edit={true} />}
              />
              {/* buses routes */}
              <Route path="buses/new" element={<AddEditBus />} />
              <Route path="buses/list" element={<Buses />} />
              <Route
                path="buses/:id/edit"
                element={<AddEditBus edit={true} />}
              />
              <Route path="schedules/list" element={<Schedules />} />
              <Route path="schedules/new" element={<AddEditSchedule />} />
              <Route path="bus_stats/list" element={<BusStats />} />
              <Route path="bus_stats/new" element={<AddEditRouteStat />} />
              <Route
                path="bus_stats/:id/edit"
                element={<AddEditRouteStat edit={true} />}
              />
            </RootRoute>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
