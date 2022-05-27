import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CancelButton from "../../components/cancel_button";
import SaveButton from "../../components/save_button";
import Spinner from "../../components/spinner";
import {
  generateSchedule,
  resetGenerateSchedule,
} from "../../store/schedule/actions";
import { convertTo12 } from "../../utils/time";

const hours = [];
for (let i = 1; i < 25; i++) {
  hours.push(i);
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const GenerateSchedule = ({ closeGenerateMenu }) => {
  const [startWorkingHour, setStartWorkingHour] = useState(1);
  const [endWorkingHour, setEndWorkingHour] = useState(2);
  const [workingDays, setWorkingDays] = useState(() => hours.map((_) => false));
  const [breaks, setBreaks] = useState([]);

  const dispatch = useDispatch();

  const removeBreak = (index) => {
    let _breaks = [...breaks];
    _breaks.splice(index, 1);
    setBreaks(_breaks);
  };

  const onStartHourChange = (index, val) => {
    let _breaks = [...breaks];
    _breaks[index].startTime = val;
    setBreaks(_breaks);
  };

  const onEndHourChange = (index, val) => {
    let _breaks = [...breaks];
    _breaks[index].endTime = val;
    setBreaks(_breaks);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let _workingDays = [];
    workingDays.forEach((_, index) => {
      if (workingDays[index]) {
        _workingDays.push(days[index]);
      }
    });

    dispatch(
      generateSchedule(_workingDays, startWorkingHour, endWorkingHour, breaks)
    );
  };

  const {
    loading: generateScheduleLoading,
    success: generateScheduleSuccess,
    error: generateScheduleError,
  } = useSelector((state) => state.generateSchedule);

  useEffect(() => {
    return () => {
      dispatch(resetGenerateSchedule());
    };
  }, []);
  return (
    <div>
      <div className="flex justify-end my-2">
        <button onClick={() => closeGenerateMenu()}>
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="font-semibold capitalize">working hours</div>
        <div className="flex space-x-2 items-center my-2">
          <div className="flex flex-col ml-2">
            <div>starts at</div>
            <div className="flex ">
              <select
                className="outline-none border p-1  w-full rounded-md text-gray-600 bg-gray-50"
                onChange={(e) => {
                  setStartWorkingHour(e.target.value);
                }}
                value={startWorkingHour}
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
                value={endWorkingHour}
                onChange={(e) => {
                  setEndWorkingHour(e.target.value);
                }}
              >
                {hours.map((hour) => (
                  <option value={hour}>{convertTo12(hour)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="font-semibold text-black capitalize">working days</div>
        <div className="flex space-x-4 items-center ml-2 mt-2">
          {days.map((day, index) => {
            return (
              <div className="flex items-center space-x-1 text-gray-600">
                <input
                  type="checkbox"
                  checked={workingDays[index]}
                  onChange={(e) => {
                    let _workingDays = [...workingDays];
                    _workingDays[index] = e.target.checked;
                    setWorkingDays(_workingDays);
                  }}
                ></input>
                <label>{day}</label>
              </div>
            );
          })}
        </div>
        <div className="font-semibold text-black capitalize mt-2">breaks</div>
        <div className="flex justify-end">
          <button
            onClick={() =>
              setBreaks([
                ...breaks,
                {
                  startTime: 1,
                  endTime: 2,
                },
              ])
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        {breaks.map((val, index) => {
          return (
            <div className="flex space-x-2 items-center my-2">
              <div className="flex flex-col ml-2">
                <div>starts at</div>
                <div className="flex ">
                  <select
                    className="outline-none border p-1  w-full rounded-md text-gray-600 bg-gray-50"
                    onChange={(e) => {
                      onStartHourChange(index, e.target.value);
                    }}
                    value={breaks[index].startTime}
                  >
                    {hours.map((hour) => (
                      <option value={hour}>{convertTo12(hour)}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-5"></div>
              <div className="flex flex-col ml-2 ">
                <div>ends at</div>
                <div className="flex">
                  <select
                    className="outline-none  border p-1  w-full rounded-md text-gray-600 bg-gray-50"
                    value={breaks[index].endTime}
                    onChange={(e) => {
                      onEndHourChange(index, e.target.value);
                    }}
                  >
                    {hours.map((hour) => (
                      <option value={hour}>{convertTo12(hour)}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-grow justify-end">
                <div>&nbsp;</div>
                <button onClick={() => removeBreak(index)}>
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
            </div>
          );
        })}
        <div className="flex space-x-3 justify-end mt-5">
          <CancelButton
            onCancelHandler={() => {
              closeGenerateMenu();
            }}
          />
          <SaveButton name="generate" />
        </div>
      </form>
      {generateScheduleSuccess && (
        <div className="flex space-x-2 items-center text-green-500 justify-center mt-3">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <div>schedules successfully generated</div>
        </div>
      )}

      {generateScheduleError && (
        <div className="flex space-x-2 items-center text-red-500 justify-center mt-3">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <div>failed to generate schedule</div>
        </div>
      )}

      {generateScheduleLoading && (
        <div className="flex space-x-2 items-center justify-center mt-3">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default GenerateSchedule;
