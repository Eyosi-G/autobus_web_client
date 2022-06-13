import React, { useEffect, useState } from "react";
import { convertTo12 } from "../../utils/time";

const hours = [];
for (let i = 1; i < 25; i++) {
  hours.push(i);
}

const Stat = ({
  edit,
  outCommuters,
  outEndTime,
  outStartTime,
  index,
  onBusStatChange,
  removeBusStat,
  sumitted
}) => {
  const [startTime, setStartTime] = useState(() =>
    edit ? outStartTime : hours[0]
  );
  const [endTime, setEndTime] = useState(() => (edit ? outEndTime : hours[1]));
  const [commuters, setCommuters] = useState(outCommuters);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);

  const validate = () => {
    const _errors = {};
    if (!commuters) {
      _errors.commuters = "commuters is required";
    }
    if (isNaN(commuters)) {
      _errors.commuters = "commuters should be number";
    }
    setErrors(_errors);
  };

  useEffect(() => {
    console.log(startTime);
    console.log(endTime);
    let _startTime = (parseInt(endTime) + 1) % 24;
    _startTime = _startTime == 0 ? 24 : _startTime;
    if (_startTime != startTime) {
      let _endTime = (parseInt(startTime) + 1) % 24;
      _endTime = _endTime == 0 ? 24 : _endTime;
      setEndTime(_endTime);
    }
  }, [startTime]);

  useEffect(() => {
    let _endTime = (parseInt(startTime) + 1) % 24;
    _endTime = _endTime == 0 ? 24 : _endTime;
    if (_endTime != endTime) {
      let _startTime = (parseInt(endTime) + 1) % 24;
      _startTime = _startTime == 0 ? 24 : _startTime;
      setStartTime(_startTime);
    }
  }, [endTime]);

  useEffect(() => {
    validate();
    onBusStatChange(index, startTime, endTime, parseInt(commuters), errors);
    if(sumitted){
      setTouched(true);
    }
  }, [commuters, endTime, startTime,sumitted]);
  
  return (
    <div>
      <div className="flex space-x-2 items-center my-2">
        <div className="flex flex-col ml-2">
          <div>starts at</div>
          <div className="flex ">
            <select
              className="outline-none border p-1  w-full rounded-md text-gray-600 bg-gray-50"
              onChange={(e) => {
                setStartTime(e.target.value);
              }}
              value={startTime}
            >
              {hours.map((hour) => (
                <option value={hour}>{convertTo12(hour)}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col ml-2 mr-4">
          <div>ends at</div>
          <div className="flex">
            <select
              className="outline-none  border p-1  w-full rounded-md text-gray-600 bg-gray-50"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
              }}
            >
              {hours.map((hour) => (
                <option value={hour}>{convertTo12(hour)}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col grow">
          <div>commuters</div>
          <div>
            <input
              className="border p-1  w-full rounded-md text-gray-600 bg-gray-50"
              type="number"
              onBlur={(e) => {
                setTouched(true);
              }}
              onChange={(e) => {
                setCommuters(e.target.value);
              }}
              value={commuters}
            />
          </div>
        </div>
        <button
          type="button"
          className="ml-2"
          onClick={() => removeBusStat(index)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="text-red-500 text-sm flex justify-end">
        {touched && errors.commuters}
      </div>
    </div>
  );
};

export default Stat;
