import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import BackButton from "../../components/back_button";
import CancelButton from "../../components/cancel_button";
import Dialog from "../../components/dialog";
import Modal from "../../components/modal";
import SaveButton from "../../components/save_button";
import Spinner from "../../components/spinner";
import { fetchRoutes, resetFetchRoutes } from "../../store/route/actions";
import {
  createBusStat,
  editBusStat,
  fetchSingleBusStat,
  resetCreateBusStat,
  resetEditBusStat,
  resetFetchSingleBusStat,
} from "../../store/bus_stat/actions";
import Stat from "./stat";

const AddEditBusStat = ({ edit = false }) => {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState("");
  const onBusStatChange = (index, startTime, endTime, commuters) => {
    console.log("here", commuters);
    let _stats = [...stats];
    _stats[index] = {
      ..._stats[index],
      startTime,
      endTime,
      commuters,
    };
    setStats(_stats);
  };

  const removeBusStat = (index) => {
    let _stats = [...stats];
    _stats.splice(index, 1);
    setStats(_stats);
  };

  const validateBusStat = () => {
    let starts = stats.map((busStat) => busStat.startTime);
    let ends = stats.map((busStat) => busStat.endTime);
    let _startSet = new Set(starts);
    let _endSet = new Set(ends);
    return _startSet.size < starts.length || _endSet.size < _endSet.length;
  };
  const dispatch = useDispatch();
  const {
    loading: createBusStatLoading,
    success: createstatsuccess,
    error: createBusStatError,
  } = useSelector((state) => state.createBusStat);
  const params = useParams();

  const {
    loading: editBusStatLoading,
    success: editstatsuccess,
    error: editBusStatError,
  } = useSelector((state) => state.editBusStat);

  const {
    loading: routesListLoading,
    data: { count, routes },
    error: routesListError,
  } = useSelector((state) => state.routesList);

  const {
    loading: busStatLoading,
    data: busStatData,
    error: busStatError,
  } = useSelector((state) => state.fetchSingleBusStat);

  const initialValues = {
    route_number: "",
    date: new Date().toISOString().split("T")[0],
  };

  const onSubmitHandler = (values, action) => {
    if (validateBusStat()) {
      setError("overlapping time slots");
    } else {
      setError("");
      const data = {
        ...values,
        stats: stats,
      };
      if (edit) {
        const { id } = params;
        dispatch(editBusStat(id, data));
      } else {
        dispatch(createBusStat(data));
      }
      setStats([]);
      action.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmitHandler,
  });

  const dialogMessage = () => {
    if (createstatsuccess) return "Bus Stat Inserted Successfully !";
    if (createBusStatError) return "Failed to insert bus stat !";
    if (editstatsuccess) return "bus stat edited successfully !";
    if (editBusStatError) return "failed to edit bus stat !";
  };

  const closeDialog = () => {
    if (createBusStatError || createstatsuccess)
      return dispatch(resetCreateBusStat());
    if (editstatsuccess || editBusStatError)
      return dispatch(resetEditBusStat());
    if (busStatError) return dispatch(resetFetchSingleBusStat());
  };

  useEffect(() => {
    dispatch(fetchRoutes(0, 100));

    if (edit) {
      const { id } = params;
      dispatch(fetchSingleBusStat(id));
    }
    return () => {
      dispatch(resetCreateBusStat());
      dispatch(resetFetchRoutes());
      dispatch(resetFetchSingleBusStat());
      dispatch(resetEditBusStat());
    };
  }, []);

  useEffect(() => {
    if (busStatData) {
      busStatData.date = busStatData.date.split("T")[0];
      formik.setValues(busStatData);
      setStats(busStatData.stats);
    }
  }, [busStatData]);

  useEffect(() => {
    if (routes.length > 0)
      formik.setValues({
        ...formik.values,
        route_number: routes[0].route_number,
      });
  }, [routes]);

  const retryHandler = () => {
    if (busStatError) {
      const { id } = params;
      dispatch(fetchSingleBusStat(id));
    }
    if (routesListError) {
      dispatch(fetchRoutes());
    }
  };

  if (routesListError || busStatError) {
    return (
      <div className="flex justify-center mt-40">
        <button
          className="capitalize px-2 py-1 border rounded-md"
          onClick={retryHandler}
        >
          retry
        </button>
      </div>
    );
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <Modal
        open={createBusStatLoading || busStatLoading || editBusStatLoading}
      >
        <div
          style={{ zIndex: 200 }}
          className=" absolute h-screen w-screen bg-black bg-opacity-40 flex items-center justify-center"
        >
          <Spinner color="white" />
        </div>
      </Modal>
      <Modal open={createBusStatError || editBusStatError}>
        <Dialog
          severity="failure"
          message={dialogMessage()}
          close={() => closeDialog()}
        />
      </Modal>
      <Modal open={createstatsuccess || editstatsuccess}>
        <Dialog
          severity="success"
          message={dialogMessage()}
          close={() => closeDialog()}
        />
      </Modal>
      <div className="flex justify-end my-2">
        <BackButton />
      </div>
      <div className="m-4 mb-2 capitalize font-semibold ">
        {edit ? (
          <div className="flex items-center space-x-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </span>
            <span>edit bus stat</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <span>
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
            </span>
            <span>add bus stat</span>
          </div>
        )}
      </div>
      <div className="m-4 space-y-4 bg-white p-7 capitalize">
        <div className="flex flex-col">
          <label>date</label>
          <input
            data-cy="stat-date"
            className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
            type="date"
            onChange={formik.handleChange}
            name="date"
            value={formik.values.date}
          />
        </div>
        <div className="flex flex-col">
          <label>route number</label>
          <div className="flex space-x-2 border w-full p-2 rounded-md  bg-gray-50 items-center">
            <div className="w-full">
              {routesListLoading ? (
                <PulseLoader size={5} />
              ) : (
                <select
                  className="appearance-none  w-full outline-none bg-gray-50 "
                  onChange={formik.handleChange}
                  name="route_number"
                  data-cy="stat-bus-number"
                  value={
                    formik.values.route_number != 0
                      ? formik.values.route_number
                      : null
                  }
                >
                  {routes.map((route) => {
                    return (
                      <option value={route.route_number}>
                        {route.route_number}
                      </option>
                    );
                  })}
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
        </div>
        <div className="flex justify-end">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-100 rounded-full p-2 flex items-center space-x-2"
              onClick={() => {
                setStats([...stats, {}]);
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
              <span>add bus stat</span>
            </button>
          </div>
        </div>
        <div>
          {stats.map((busStat, index) => {
            return (
              <Stat
                outCommuters={busStat.commuters}
                outStartTime={busStat.startTime}
                edit={edit}
                outEndTime={busStat.endTime}
                index={index}
                onBusStatChange={onBusStatChange}
                removeBusStat={removeBusStat}
              />
            );
          })}
        </div>

        <div className="text-sm text-red-500">{error}</div>
        <div className="flex space-x-3 justify-end mt-5">
          <CancelButton />
          <SaveButton disable={routes.length < 1} />
        </div>
      </div>
    </form>
  );
};

export default AddEditBusStat;
