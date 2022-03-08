import React from "react";
import Nav from "../components/nav";
import { Routes, Route, Outlet } from "react-router-dom";
import Drivers from "./driver/drivers";
import AddEditDriver from "./driver/add_edit_driver";
import AddEditTicketer from "./ticketer/add_edit_ticketer";
import Ticketers from "./ticketer/ticketers";
import AddEditBus from "./bus/add_edit_bus";
const Layout = () => {
  return (
    <div className="grid grid-cols-5 h-screen overflow-hidden">
      <Nav />
      <div className="overflow-y-scroll col-span-4">
        <div className=" flex flex-col ">
          <div className="h-14 w-full border-b border-gray-200 " />
          <Routes>
            <Route path="drivers/list" element={<Drivers />} />
            <Route path="drivers/new" element={<AddEditDriver />} />
            <Route path="ticketers/list" element={<Ticketers />} />
            <Route path="ticketers/new" element={<AddEditTicketer />} />
            <Route path="buses/new" element={<AddEditBus />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Layout;
