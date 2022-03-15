import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/back_button";
import CancelButton from "../../components/cancel_button";
import SaveButton from "../../components/save_button";

const AddEditBusStat = ({edit = false}) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      bus_number: 0,
      side_number: 0,
      total_commuters: 0,
      date: new Date().toISOString().split('T')[0]
    }
  })
  return (
    <div>
      <div className="flex justify-end my-2">
        <BackButton navigateHandler={() => navigate("/admin/bus_stats/list")} />
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
      <div className="m-4 space-y-4 bg-white p-3 font-normal rounded-md shadow-sm capitalize">
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
          <label>side number</label>
          <input
            className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
            type="number"
            placeholder="e.g 1140"
            onChange={formik.handleChange}
            name="size_number"
            value={formik.values.side_number}
          />
        </div>
        <div className="flex flex-col">
          <label>bus number</label>
          <input
            className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
            type="number"
            placeholder="e.g 60"
            onChange={formik.handleChange}
            name="bus_number"
            value={formik.values.bus_number}
          />
        </div>
        <div className="flex flex-col">
          <label>total commuters</label>
          <input
            className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
            type="number"
            placeholder="e.g 60"
            onChange={formik.handleChange}
            name="total_commuters"
            value={formik.values.total_commuters}
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

export default AddEditBusStat;
