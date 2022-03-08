import React from "react";

const AddEditDriver = () => {
  return (
    <div className="bg-gray-50 flex-grow">
      <div className="m-4 flex justify-end space-x-2 capitalize text-gray-600">
          <span>drivers</span>
          <span>/</span>
          <span className="text-black">new</span>
      </div>
      <div className="m-4 space-y-2 bg-white p-3 font-normal">
        <div className="text-lg">Driver Information</div>
        <div className="grid grid-cols-2 gap-x-1">
          <div className="flex flex-col">
            <label clas>first name</label>
            <input
              className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
              type="text"
              placeholder="first name"
            
            />
          </div>
          <div className="flex flex-col">
            <label>last name</label>
            <input
              className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
              type="text"
              placeholder="last name"
            />
          </div>
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
        <div className="flex space-x-3 justify-end mt-5">
            <button className="border rounded-md py-1 px-5">cancel</button>
            <button className="bg-gray-700 text-white rounded-md py-1 px-5">save</button>
        </div>
      </div>
    </div>
  );
};

export default AddEditDriver;
