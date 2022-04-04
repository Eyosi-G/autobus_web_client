import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader, PulseLoader } from "react-spinners";
import BackButton from "../../components/back_button";
import CancelButton from "../../components/cancel_button";
import Dialog from "../../components/dialog";
import Modal from "../../components/modal";
import SaveButton from "../../components/save_button";
import Spinner from "../../components/spinner";
import { fetchBuses, resetFetchBuses } from "../../store/bus/actions";
import {
  createBusStat,
  editBusStat,
  fetchSingleBusStat,
  resetCreateBusStat,
  resetEditBusStat,
  resetFetchSingleBusStat,
} from "../../store/bus_stat/actions";

const AddEditBusStat = ({ edit = false }) => {
  const dispatch = useDispatch();

  const {
    loading: createBusStatLoading,
    success: createBusStatSuccess,
    error: createBusStatError,
  } = useSelector((state) => state.createBusStat);
  const params = useParams();

  const {
    loading: editBusStatLoading,
    success: editBusStatSuccess,
    error: editBusStatError,
  } = useSelector((state) => state.editBusStat);

  const {
    loading: busesListLoading,
    data: { count, buses },
    error: busesListError,
  } = useSelector((state) => state.busesList);

  const {
    loading: busStatLoading,
    data: busStatData,
    error: busStatError,
  } = useSelector((state) => state.fetchSingleBusStat);

  const initialValues = {
    bus_number: 0,
    morning_commuters: 0,
    afternoon_commuters: 0,
    date: new Date().toISOString().split("T")[0],
  };

  const onSubmitHandler = (values, action) => {
    if (edit) {
      const { id } = params;
      dispatch(editBusStat(id, values));
    } else {
      dispatch(createBusStat(values));
    }
    action.resetForm();
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmitHandler,
  });

  const dialogMessage = () => {
    if (createBusStatSuccess) return "Bus Stat Inserted Successfully !";
    if (createBusStatError) return "Failed to insert bus stat !";
    if (editBusStatSuccess) return "bus stat edited successfully !";
    if (editBusStatError) return "failed to edit bus stat !";
  };

  const closeDialog = () => {
    if (createBusStatError || createBusStatSuccess)
      return dispatch(resetCreateBusStat());
    if (editBusStatSuccess || editBusStatError)
      return dispatch(resetEditBusStat());
    if (busStatError) return dispatch(resetFetchSingleBusStat());
  };

  useEffect(() => {
    dispatch(fetchBuses(0, 100));
    if (edit) {
      const { id } = params;
      dispatch(fetchSingleBusStat(id));
    }
    return () => {
      dispatch(resetCreateBusStat());
      dispatch(resetFetchBuses());
      dispatch(resetFetchSingleBusStat());
      dispatch(resetEditBusStat());
    };
  }, []);

  useEffect(() => {
    if (busStatData) {
      busStatData.date = busStatData.date.split("T")[0];
      formik.setValues(busStatData);
    }
  }, [busStatData]);

  useEffect(() => {
    if (buses.length > 0)
      formik.setValues({ ...formik.values, bus_number: buses[0].bus_number });
  }, [buses]);

  const retryHandler = () => {
    if (busStatError) {
      const { id } = params;
      dispatch(fetchSingleBusStat(id));
    }
    if (busesListError) {
      dispatch(fetchBuses());
    }
  };

  if (busesListError || busStatError) {
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
      <Modal open={createBusStatSuccess || editBusStatSuccess}>
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
            className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
            type="date"
            onChange={formik.handleChange}
            name="date"
            value={formik.values.date}
          />
        </div>
        <div className="flex flex-col">
          <label>bus number</label>
          <div className="flex space-x-2 border w-full p-2 rounded-md  bg-gray-50 items-center">
            <div className="w-full">
              {busesListLoading ? (
                <PulseLoader size={5} />
              ) : (
                <select
                  className="appearance-none  w-full outline-none bg-gray-50 "
                  onChange={formik.handleChange}
                  name="bus_number"
                  value={
                    formik.values.bus_number != 0
                      ? formik.values.bus_number
                      : null
                  }
                >
                  {buses.map((bus) => {
                    return (
                      <option value={bus.bus_number}>{bus.bus_number}</option>
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
        <div className="flex flex-col">
          <label>morning commuters</label>
          <input
            className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
            type="number"
            placeholder="e.g 60"
            onChange={formik.handleChange}
            name="morning_commuters"
            value={formik.values.morning_commuters}
          />
        </div>
        <div className="flex flex-col">
          <label>afternoon commuters</label>
          <input
            className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
            type="number"
            placeholder="e.g 60"
            onChange={formik.handleChange}
            name="afternoon_commuters"
            value={formik.values.afternoon_commuters}
          />
        </div>
        <div className="flex space-x-3 justify-end mt-5">
          <CancelButton />
          <SaveButton disable={buses.length < 1} />
        </div>
      </div>
    </form>
  );
};

export default AddEditBusStat;
