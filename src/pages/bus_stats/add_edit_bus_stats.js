import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/back_button";
import CancelButton from "../../components/cancel_button";
import Dialog from "../../components/dialog";
import Modal from "../../components/modal";
import SaveButton from "../../components/save_button";
import Spinner from "../../components/spinner";
import { fetchBuses } from "../../store/bus/actions";
import {
  createBusStat,
  resetCreateBusStat,
} from "../../store/bus_stat/actions";

const AddEditBusStat = ({ edit = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    loading: createBusStatLoading,
    success: createBusStatSuccess,
    error: createBusStatError,
  } = useSelector((state) => state.createBusStat);

  const {
    loading: busesListLoading,
    data: { count, buses },
    error: busesListError,
  } = useSelector((state) => state.busesList);

  const initialValues = {
    bus_number: 0,
    morning_commuters: 0,
    afternoon_commuters: 0,
    date: new Date().toISOString().split("T")[0],
  };

  const onSubmitHandler = (values, action) => {
    // dispatch(createBusStat(values));
    action.resetForm();
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmitHandler,
  });

  const dialogMessage = () => {
    if (createBusStatSuccess) return "Bus Stat Inserted Successfully !";
    if (createBusStatError) return "Failed to insert bus stat !";
  };

  const closeDialog = () => {
    if (createBusStatSuccess) return dispatch(resetCreateBusStat());
    if (createBusStatError) return dispatch(resetCreateBusStat());
  };

  useEffect(() => {
    dispatch(fetchBuses(0, 100));
  }, []);

  useEffect(() => {
    if (buses.length > 0)
      formik.setValues({ ...formik.values, bus_number: buses[0].bus_number });
  }, [buses]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Modal open={createBusStatLoading || busesListLoading}>
        <div
          style={{ zIndex: 200 }}
          className=" absolute h-screen w-screen bg-black bg-opacity-40 flex items-center justify-center"
        >
          <Spinner color="white" />
        </div>
      </Modal>
      <Modal open={createBusStatError}>
        <Dialog
          severity="failure"
          message={dialogMessage()}
          close={() => closeDialog()}
        />
      </Modal>
      <Modal open={createBusStatSuccess}>
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
            <select
              className="appearance-none w-full outline-none bg-gray-50 "
              onChange={formik.handleChange}
              name="bus_number"
              value={
                formik.values.bus_number != 0 ? formik.values.bus_number : null
              }
            >
              {buses.map((bus) => {
                return <option value={bus.bus_number}>{bus.bus_number}</option>;
              })}
            </select>
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
          <CancelButton onCancelHandler={() => {}} />
          <SaveButton />
        </div>
      </div>
    </form>
  );
};

export default AddEditBusStat;
