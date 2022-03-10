import React, { useEffect, useState } from "react";

import StopsInput from "../../components/stops_input";
import CancelButton from "../../components/cancel_button";
import SaveButton from "../../components/save_button";
import axios from "axios";

const AddEditBus = () => {
  const [stops, setStops] = useState([]);
  const [forwardStops, setForwardStops] = useState([]);
  const [backwardStops, setBackwardStops] = useState([]);

  const addToForwardStop = (id) => {
    setForwardStops((stops) => [...stops, id]);
  };

  const removeForwardStop = (id) => {
    setForwardStops((stops) => stops.filter((stop) => stop != id));
  };

  const addToBackwardStop = (id) => {
    setBackwardStops((stops) => [...stops, id]);
  };

  const removeBackwardStop = (id) => {
    setBackwardStops((stops) => stops.filter((stop) => stop != id));
  };

  return (
    <div>
      <div className="m-4 flex capitaliz font-semibold">Register New Bus</div>
      <div className="m-4 space-y-2 bg-white p-3 font-normal capitalize">
        <div className="flex flex-col">
          <label>bus number</label>
          <input
            className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
            type="number"
            placeholder="bus number"
          />
        </div>
        <div className="flex flex-col">
          <label>bus description</label>
          <textarea
            className="border w-full p-2 rounded-md text-gray-600 bg-gray-50 h-40 "
            type="number"
            placeholder="bus description"
          />
        </div>
        <div className="flex flex-col">
          <label>forward stops</label>
          <StopsInput
            lat={9.03448112252767}
            lng={38.74701976776123}
            zoom={16}
            addStop={addToForwardStop}
            removeStop={removeForwardStop}
          />
        </div>
        <div className="flex flex-col">
          <label>forward stops</label>
          <StopsInput
            lat={9.03448112252767}
            lng={38.74701976776123}
            zoom={16}
            addStop={addToBackwardStop}
            removeStop={removeBackwardStop}
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

export default AddEditBus;
