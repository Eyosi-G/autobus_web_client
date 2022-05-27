import React from "react";

const SaveButton = ({ disable = false, name = "save" }) => {
  return (
    <button
      type="submit"
      data-cy="submit-button"
      className={`bg-gray-700 text-white rounded-md py-1 px-5 drop-shadow-md ${
        disable && "bg-gray-200 text-slate-600"
      }`}
      disabled={disable}
    >
      {name}
    </button>
  );
};

export default SaveButton;
