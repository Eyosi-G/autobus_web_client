import React from "react";

const Confirmation = ({ handleCancel = () => {}, handleDelete = () => {} }) => {
  return (
    <div className="bg-white py-5 px-5 w-1/2 space-y-1 rounded-md">
      <div className="flex justify-center">
        <span className="bg-red-100 text-red-700 p-4 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </span>
      </div>
      <div className="text-lg text-center font-semibold">Are you sure ?</div>
      <div className="text-sm text-gray-500 text-center">
        Are you sure you want to delete this item ? You can't undo this
        action.
      </div>
      <div className="flex justify-end space-x-2 font-semibold">
        <button
          className="border px-2 py-1 rounded-md mt-4 text-sm font-semibold"
          onClick={handleCancel}
        >
          cancel
        </button>
        <button
          data-cy="confirm-delete"
          className="bg-red-300 px-2 py-1 rounded-md mt-4 text-sm font-semibold"
          onClick={handleDelete}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
