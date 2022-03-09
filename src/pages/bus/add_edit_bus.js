import React, { useEffect, useState } from "react";

import StopsInput from "../../components/stops_input";
import CancelButton from "../../components/cancel_button";
import SaveButton from "../../components/save_button";

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

  useEffect(() => {
    //load stops
    const stops = [
      {
        type: "Feature",
        properties: {
          id: 1,
        },
        geometry: {
          type: "Point",
          coordinates: [38.74701976776123, 9.03448112252767],
        },
      },
      {
        type: "Feature",
        properties: {
          id: 2,
        },
        geometry: {
          type: "Point",
          coordinates: [38.744423389434814, 9.034120867380942],
        },
      },
      {
        type: "Feature",
        properties: {
          id: 3,
        },
        geometry: {
          type: "Point",
          coordinates: [38.74976634979248, 9.035540694401123],
        },
      },
      {
        type: "Feature",
        properties: {
          id: 4,
        },
        geometry: {
          type: "Point",
          coordinates: [38.74770641326904, 9.038677008883285],
        },
      },
      {
        type: "Feature",
        properties: {
          id: 5,
        },
        geometry: {
          type: "Point",
          coordinates: [38.74598979949951, 9.042385453607007],
        },
      },
    ];
    setStops(stops);
  }, []);

  return (
    <div className="bg-gray-50 flex-grow">
      <div className="m-4 flex justify-end space-x-2 lowercase text-gray-600">
        <span>Buses</span>
        <span>/</span>
        <span className="text-black">new</span>
      </div>
      <div className="m-4 space-y-2 bg-white p-3 font-normal">
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
            stops={stops}
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
            stops={stops}
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
