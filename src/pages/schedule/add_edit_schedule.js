import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import BackButton from "../../components/back_button";
import CancelButton from "../../components/cancel_button";
import SaveButton from "../../components/save_button";
import { fetchBuses } from "../../store/bus/actions";
import { fetchDrivers } from "../../store/driver/actions";
import { fetchRoutes } from "../../store/route/actions";
import { fetchTicketers } from "../../store/ticketer/actions";
import { convertTo12 } from "../../utils/time";
import defaultImage from "../../images/default.jpg";
import * as Yup from "yup";
import {
  createSchedule,
  fetchSingleSchedule,
  resetCreateSchedule,
  resetUpdateSchedule,
  updateSchedule,
} from "../../store/schedule/actions";

import { useParams } from "react-router-dom";
import SuccessMessage from "../../components/success_message";
import ErrorMessage from "../../components/error_message";
import Loading from "../../components/loading";
const hours = [];
for (let i = 1; i < 25; i++) {
  hours.push(i);
}
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const AddEditSchedule = ({ edit = false }) => {
  const param = useParams();

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      startTime: 1,
      endTime: 2,
      day: "",
      bus: "",
      driver: "",
      ticketer: "",
      route: "",
    },
    validationSchema: new Yup.object({
      startTime: Yup.number().required("start hour is required"),
      endTime: Yup.number().required("end hour is required"),
      day: Yup.string().required("day is required"),
      bus: Yup.number().required("bus number is required"),
      driver: Yup.string().required("driver is required"),
      ticketer: Yup.string().required("tickter is required"),
      route: Yup.number().required("route is required"),
    }),
    onSubmit: (values, action) => {
      if (edit) {
        const { id } = param;
        dispatch(updateSchedule(id, values));
      } else {
        dispatch(createSchedule(values));
        // action.resetForm();
      }
    },
  });
  const {
    loading: createScheduleLoading,
    success: createScheduleSuccess,
    error: createScheduleError,
  } = useSelector((state) => state.createSchedule);

  let {
    data: { loading: busesLoading, buses },
  } = useSelector((state) => state.fetchBuses);

  const {
    data: { loading: driversLoading, drivers },
  } = useSelector((state) => state.driversList);

  const {
    data: { loading: ticketersLoading, ticketers },
  } = useSelector((state) => state.ticketersList);

  const {
    data: { loading: routesLoading, routes },
  } = useSelector((state) => state.routesList);

  const { data: singleScheduleData } = useSelector(
    (state) => state.singleSchedule
  );

  const {
    error: updateScheduleError,
    loading: updateScheduleLoading,
    success: updateScheduleSuccess,
  } = useSelector((state) => state.updateSchedule);

  useEffect(() => {
    dispatch(fetchBuses(0, 1000));
    dispatch(fetchDrivers(0, 1000, ""));
    dispatch(fetchTicketers(0, 1000, ""));
    dispatch(fetchRoutes(0, 1000));
    if (edit) {
      const { id } = param;
      dispatch(fetchSingleSchedule(id));
    }
  }, []);

  useEffect(() => {
    if (singleScheduleData) {
      let schedule = {
        ...singleScheduleData,
        driver: singleScheduleData.driver.id,
        ticketer: singleScheduleData.ticketer.id,
      };
      formik.setValues(schedule);
    }
  }, [singleScheduleData]);

  return (
    <div>
      <Loading open={createScheduleLoading || updateScheduleLoading} />
      <div className="flex justify-end my-2">
        <BackButton />
      </div>
      <div className="m-4 mb-2 capitalize font-semibold ">
        {/* create schedule */}
        {createScheduleSuccess && (
          <SuccessMessage
            onClickHandler={() => dispatch(resetCreateSchedule())}
            message="schedule created succesfully"
          />
        )}
        {createScheduleError && (
          <ErrorMessage
            message={createScheduleError}
            onClickHandler={() => dispatch(resetCreateSchedule())}
          />
        )}
        {/* update schedule */}
        {updateScheduleSuccess && (
          <SuccessMessage
            message="schedules updated"
            onClickHandler={() => dispatch(resetUpdateSchedule())}
          />
        )}
        {updateScheduleError && (
          <ErrorMessage
            message={updateScheduleError}
            onClickHandler={() => dispatch(resetUpdateSchedule())}
          />
        )}
        <div className="flex items-center space-x-2">
          <span>
            {edit ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            ) : (
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
            )}
          </span>
          <span>{edit ? "edit schedule" : "new schedule"}</span>
        </div>
      </div>
      <div className="m-4 mt-0 space-y-2 bg-white p-3 font-normal rounded-md capitalize">
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <div className="flex space-x-2">
              <div className="flex flex-col flex-grow">
                <label>starts at</label>
                <div className="flex space-x-2 border w-full p-2 rounded-md  bg-gray-50 items-center">
                  <div className="w-full">
                    <select
                      className="outline-none w-full rounded-md text-gray-600 bg-gray-50 appearance-none"
                      value={formik.values.startTime}
                      name="startTime"
                      onChange={formik.handleChange}
                    >
                      {hours.map((hour) => (
                        <option value={hour}>{convertTo12(hour)}</option>
                      ))}
                    </select>
                  </div>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
                <div className="text-sm text-red-500">
                  {formik.errors.startTime}
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <label>ends at</label>
                <div className="flex space-x-2 border w-full p-2 rounded-md  bg-gray-50 items-center">
                  <div className="w-full">
                    <select
                      className="outline-none w-full rounded-md text-gray-600 bg-gray-50 appearance-none"
                      value={formik.values.endTime}
                      name="endTime"
                      onChange={formik.handleChange}
                    >
                      {hours.map((hour) => (
                        <option value={hour}>{convertTo12(hour)}</option>
                      ))}
                    </select>
                  </div>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
                <div className="text-sm text-red-500">
                  {formik.errors.endTime}
                </div>
              </div>
            </div>
            <div>
              <label>day</label>
              <div className="flex space-x-2">
                {days.map((day) => {
                  return (
                    <div className="flex items-center space-x-1">
                      <input
                        type="radio"
                        name="day"
                        checked={formik.values.day == day}
                        value={day}
                        onChange={formik.handleChange}
                      />
                      <label>{day}</label>
                    </div>
                  );
                })}
              </div>
              <div className="text-sm text-red-500">{formik.errors.day}</div>
            </div>
            <div>
              <label>buses</label>
              <div className="flex space-x-2 border w-full p-2 rounded-md  bg-gray-50 items-center">
                <div className="w-full">
                  {busesLoading ? (
                    <PulseLoader size={5} />
                  ) : (
                    <select
                      className="outline-none w-full rounded-md text-gray-600 bg-gray-50 appearance-none"
                      value={formik.values.bus}
                      name="bus"
                      onChange={formik.handleChange}
                    >
                      <option></option>
                      {buses.map((bus) => (
                        <option value={bus.side_number}>
                          {bus.side_number}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              <div className="text-sm text-red-500">{formik.errors.bus}</div>
            </div>

            <div>
              <label>drivers</label>
              <div className="flex space-x-2 border w-full p-2 rounded-md  bg-gray-50 items-center">
                <div className="w-full">
                  {driversLoading ? (
                    <PulseLoader size={5} />
                  ) : (
                    <select
                      className="outline-none w-full rounded-md text-gray-600 bg-gray-50 appearance-none"
                      value={formik.values.driver}
                      name="driver"
                      onChange={formik.handleChange}
                    >
                      <option></option>
                      {drivers.map((driver) => (
                        <option value={driver.id}>
                          {driver.first_name + " " + driver.last_name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              <div className="text-sm text-red-500">{formik.errors.driver}</div>
            </div>
            <div>
              <label>ticketers</label>
              <div className="flex space-x-2 border w-full p-2 rounded-md  bg-gray-50 items-center">
                <div className="w-full">
                  {ticketersLoading ? (
                    <PulseLoader size={5} />
                  ) : (
                    <select
                      className="outline-none w-full rounded-md text-gray-600 bg-gray-50 appearance-none"
                      value={formik.values.ticketer}
                      name="ticketer"
                      onChange={formik.handleChange}
                    >
                      <option></option>
                      {ticketers.map((ticketer) => (
                        <option value={ticketer.id}>
                          {ticketer.first_name + " " + ticketer.last_name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              <div className="text-sm text-red-500">
                {formik.errors.ticketer}
              </div>
            </div>
            <div>
              <label>routes</label>
              <div className="flex space-x-2 border w-full p-2 rounded-md  bg-gray-50 items-center">
                <div className="w-full">
                  {routesLoading ? (
                    <PulseLoader size={5} />
                  ) : (
                    <select
                      className="outline-none w-full rounded-md text-gray-600 bg-gray-50 appearance-none"
                      value={formik.values.route}
                      name="route"
                      onChange={formik.handleChange}
                    >
                      <option></option>
                      {routes.map((route) => (
                        <option value={route.route_number}>
                          {route.route_number}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              <div className="text-sm text-red-500">{formik.errors.route}</div>
            </div>
            <div className="flex space-x-3 justify-end mt-5">
              <CancelButton />
              <SaveButton />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditSchedule;
