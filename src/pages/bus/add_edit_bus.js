import { useFormik } from "formik";
import React, { useEffect } from "react";
import CancelButton from "../../components/cancel_button";
import SaveButton from "../../components/save_button";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createBus,
  createBusReset,
  updateBus,
  updateBusReset,
} from "../../store/bus/actions";
const AddEditBus = ({ isEdit, setOpenAddEditBus, bus }) => {
  const dispatch = useDispatch();
  const initalValues = {
    side_number: "",
    capacity: "",
  };
  const {
    loading: createBusLoading,
    success: createBusSuccess,
    error: createBusFailure,
  } = useSelector((state) => state.createBus);

  const {
    loading: updateBusLoading,
    success: updateBusSuccess,
    error: updateBusFailure,
  } = useSelector((state) => state.updateBus);

  const formik = useFormik({
    initialValues: initalValues,
    validationSchema: new Yup.object({
      side_number: Yup.number().required("side number is required"),
      capacity: Yup.number().required("capacity is required"),
    }),
    onSubmit: (values, action) => {
      if (isEdit) {
        dispatch(updateBus(bus.id, values));
      } else {
        dispatch(createBus(values));
      }
      action.resetForm();
    },
  });

  useEffect(() => {
    if (isEdit) {
      formik.setValues(bus);
    }
    return () => {
      if (isEdit) {
        dispatch(updateBusReset());
      } else {
        dispatch(createBusReset());
      }
    };
  }, []);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex justify-end">
        <button type="button" onClick={() => setOpenAddEditBus(false)}>
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
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
      <div className="my-2 font-bold space-x-2 flex items-center">
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
        <span>new bus</span>
      </div>
      <div className="flex flex-col">
        <label>
          side number <span className="text-red-500">*</span>
        </label>
        <input
          className="border w-full p-2 rounded-md text-gray-600  bg-gray-50"
          type="text"
          placeholder="side_number"
          name="side_number"
          onChange={formik.handleChange}
          value={formik.values.side_number}
          onBlur={formik.handleBlur}
        />
        <div className="text-sm text-red-500">
          {formik.touched.side_number && formik.errors.side_number}
        </div>
      </div>
      <div className="flex flex-col">
        <label>
          capacity <span className="text-red-500">*</span>
        </label>
        <input
          className="border w-full p-2 rounded-md text-gray-600  bg-gray-50"
          type="text"
          placeholder="capacity"
          name="capacity"
          onChange={formik.handleChange}
          value={formik.values.capacity}
          onBlur={formik.handleBlur}
        />
        <div className="text-sm text-red-500">
          {formik.touched.capacity && formik.errors.capacity}
        </div>
      </div>
      <div className="flex space-x-3 justify-end mt-5">
        <CancelButton
          onCancelHandler={() => {
            setOpenAddEditBus(false);
          }}
        />
        <SaveButton />
      </div>
      <div className="my-2">
        <div className="flex justify-center">
          {updateBusLoading && createBusLoading && "loading...."}
        </div>
        <div className="flex justify-center text-sm text-red-500 capitalize">
          {createBusFailure && "failed to create bus !"}
        </div>
        <div className="flex justify-center text-sm text-green-500 capitalize">
          {createBusSuccess && "bus successfully created !"}
        </div>
        <div className="flex justify-center text-sm text-red-500 capitalize">
          {updateBusFailure && "failed to update bus !"}
        </div>
        <div className="flex justify-center text-sm text-green-500 capitalize">
          {updateBusSuccess && "bus successfully updated !"}
        </div>
      </div>
    </form>
  );
};

export default AddEditBus;
