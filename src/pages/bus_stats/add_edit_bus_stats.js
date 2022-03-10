import React from "react";
import CancelButton from "../../components/cancel_button";
import SaveButton from "../../components/save_button";

const AddEditBusStat = () => {
  return (
    <div>
      <div className="m-4 flex capitaliz font-semibold">Add New Bus Stat</div>
      <div className="m-4 space-y-4 bg-white p-3 font-normal rounded-md shadow-sm capitalize">
        <div className="flex flex-col">
          <label>date</label>
          <input
            className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
            type="date"
          />
        </div>
        <div className="flex flex-col">
          <label>side number</label>
          <input
            className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
            type="number"
            placeholder="e.g 1140"
          />
        </div>
        <div className="flex flex-col">
          <label>bus number</label>
          <input
            className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
            type="number"
            placeholder="e.g 60"
          />
        </div>
        <div className="flex flex-col">
          <label>total commuters</label>
          <input
            className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
            type="number"
            placeholder="e.g 60"
          />
        </div>
        <div className="flex space-x-3 justify-end mt-5">
          <CancelButton />
          <SaveButton />
        </div>
      </div>
    </div>
  );
};

export default AddEditBusStat;
