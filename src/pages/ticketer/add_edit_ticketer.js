import React from "react";
import CancelButton from "../../components/cancel_button";
import SaveButton from "../../components/save_button";

const AddEditTicketer = () => {
  return (
    <div>
      <div className="m-4 flex capitaliz font-semibold">New Ticketer</div>
      <div className="m-4 space-y-2 bg-white p-3 font-normal rounded-md capitalize">
        <div className="flex flex-col mb-2 space-y-1">
          <label>profile photo</label>
          <div className="h-36 w-36 bg-gray-100 border-2 border-dashed border-black flex justify-center items-center">
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <input className="hidden" type="file" />
        </div>

        <div className="grid grid-cols-2 gap-x-2 gap-y-2">
          <div className="flex flex-col">
            <label>first name</label>
            <input
              className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
              type="text"
              placeholder="first name"
            />
          </div>
          <div className="flex flex-col">
            <label>last name</label>
            <input
              className="border w-full p-2 rounded-md text-gray-600  bg-gray-50"
              type="text"
              placeholder="last name"
            />
          </div>
          <div className="flex flex-col">
            <label>email</label>
            <input
              className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
              type="email"
              placeholder="email"
            />
          </div>
          <div className="flex flex-col">
            <label>phonenumber</label>
            <input
              className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
              type="number"
              placeholder="phonenumber"
            />
          </div>

          <div className="flex flex-col">
            <label>gender</label>
            <div className="flex space-x-2">
              <div className="flex items-center space-x-2">
                <input name="gender" type="radio" checked="true" />
                <label>male</label>
              </div>
              <div className="flex items-center space-x-2">
                <input name="gender" type="radio" checked="false" />
                <label>female</label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 justify-end mt-5">
          <CancelButton />
          <SaveButton />
        </div>
      </div>
    </div>
  );
};

export default AddEditTicketer;
