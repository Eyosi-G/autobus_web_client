import React from "react";
import CancelButton from "../../components/cancel_button";
import SaveButton from "../../components/save_button";

const AddEditDriver = () => {
  return (
    <div className="bg-gray-50 flex-grow">
      <div className="m-4 flex justify-end space-x-2 lowercase text-gray-600">
          <span>drivers</span>
          <span>/</span>
          <span className="text-black">new</span>
      </div>
      <div className="m-4 space-y-2 bg-white p-3 font-normal">
    
        <div className="grid grid-cols-2 gap-x-1">
          <div className="flex flex-col">
            <label clas>first name</label>
            <input
              className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
              type="text"
              placeholder="e.g abebe"
            
            />
          </div>
          <div className="flex flex-col">
            <label>last name</label>
            <input
              className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
              type="text"
              placeholder="e.g kebede"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label>email</label>
          <input
            className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
            type="email"
            placeholder="e.g email@me"
          />
        </div>
        <div className="flex flex-col">
          <label>phonenumber</label>
          <input
            className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
            type="number"
            placeholder="e.g 0911213221"
          />
        </div>
        <div className="flex space-x-3 justify-end mt-5">
          <CancelButton/>
          <SaveButton/>
        </div>
      </div>
    </div>
  );
};

export default AddEditDriver;
