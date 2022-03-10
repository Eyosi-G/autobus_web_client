import React from "react";
import Nav from "../components/nav";
import { Routes, Route } from "react-router-dom";
import Drivers from "./driver/drivers";
import AddEditDriver from "./driver/add_edit_driver";
import AddEditTicketer from "./ticketer/add_edit_ticketer";
import Ticketers from "./ticketer/ticketers";
import AddEditBus from "./bus/add_edit_bus";
import Timeframes from "./timeframe/timeframes";
import Schedules from "./schedule/schedules";

import BusStats from "./bus_stats/bus_stats";
import AddEditBusStat from "./bus_stats/add_edit_bus_stats";
import Dashboard from "./dashboard/dashboard";
import Settings from "./settings/settings";
const Layout = () => {
  return (
    <div className="grid grid-cols-5 h-screen overflow-hidden">
      <Nav />
      <div className="overflow-y-scroll col-span-4">
        <div className=" flex flex-col min-h-screen ">
          <div className="h-14 w-full border-b border-gray-200 " />
          <div className="bg-gray-100 flex-grow p-4">
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="drivers/list" element={<Drivers />} />
              <Route path="drivers/new" element={<AddEditDriver />} />
              <Route path="ticketers/list" element={<Ticketers />} />
              <Route path="ticketers/new" element={<AddEditTicketer />} />
              <Route path="buses/new" element={<AddEditBus />} />
              <Route path="timeframes/list" element={<Timeframes />} />
              <Route path="timeframes/:id/schedules" element={<Schedules />} />
              <Route path="bus_stats/list" element={<BusStats />} />
              <Route path="bus_stats/new" element={<AddEditBusStat />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
