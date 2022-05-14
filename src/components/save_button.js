import React from "react";

const SaveButton = ({disable = false}) => {
  return (
    <button
      data-cy="submit-button"
      className={`bg-gray-700 text-white rounded-md py-1 px-5 drop-shadow-md ${
        disable && "bg-gray-200 text-slate-600"
      }`}
      disabled={disable}
    >
      save
    </button>
  );
};

export default SaveButton;
