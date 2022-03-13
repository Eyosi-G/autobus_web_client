import React, { useEffect, useState } from "react";

import StopsInput from "../../components/stops_input";
import CancelButton from "../../components/cancel_button";
import SaveButton from "../../components/save_button";
import axios from "axios";
import BackButton from "../../components/back_button";
import { useNavigate } from "react-router-dom";

const AddEditBus = () => {
  const [forwardStops, setForwardStops] = useState([]);
  const [backwardStops, setBackwardStops] = useState([]);
  const [wayPoints, setWayPoints] = useState([""]);
  const navigate = useNavigate();

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
      <div className="flex justify-end my-2">
        <BackButton navigateHandler={() => navigate("/admin/buses/list")} />
      </div>
      <div className="m-4 flex capitaliz font-semibold">Register New Bus</div>
      <div className="m-4 space-y-2 bg-white p-3 font-normal capitalize">
        <div className="flex flex-col">
          <label>bus number</label>
          <input
            className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
            type="number"
            placeholder="e.g 12"
          />
        </div>
        <div className="flex flex-col">
          <label>price</label>
          <input
            className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
            type="number"
            placeholder="e.g 3.50"
          />
        </div>
        <div className="flex flex-col">
          <label>starting place</label>
          <input
            className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
            type="text"
            placeholder="e.g ferensay"
          />
        </div>
        <div className="flex flex-col">
          <label>destination place</label>
          <input
            className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
            type="text"
            placeholder="e.g legehar"
          />
        </div>
        <div>
          <div className="flex flex-row space-x-2 items-center">
            <div className="flex flex-col flex-grow">
              <label>waypoint - [1]</label>
              <input
                className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
                type="text"
                placeholder="e.g legehar"
              />
            </div>
            <button
              className="bg-gray-100 rounded-full p-1"
              onClick={() => {
                setWayPoints([...wayPoints, ""]);
              }}
            >
              <span className="text-gray-500">
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
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </button>
          </div>

          {wayPoints.slice(1).map((wayPoint, index) => {
            return (
              <div className="flex flex-row space-x-2 items-center">
                <div className="flex flex-col flex-grow">
                  <label>waypoint - [{index + 2}]</label>
                  <input
                    className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
                    type="text"
                    placeholder="e.g legehar"
                  
                    value={wayPoints[index + 1]}
                    onChange={(e) => {
                      const _wayPoints = [...wayPoints];
                      _wayPoints[index + 1] = e.target.value;
                      setWayPoints(_wayPoints);
                    }}
                  />
                </div>
                <button
                  className="bg-gray-100 rounded-full p-1"
                  onClick={() => {
                    const _wayPoints = [...wayPoints]
                    _wayPoints.splice(index + 1, 1)
                    setWayPoints(_wayPoints)
                  }}
                >
                  <span className="text-gray-500">
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
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            );
          })}
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
