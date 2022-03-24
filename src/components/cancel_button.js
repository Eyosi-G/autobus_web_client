import React from "react";

const CancelButton = ({onCancelHandler = ()=>{}}) => {
  return (
    <button onClick={onCancelHandler}className="border rounded-md py-1 px-5 drop-shadow-md">
      cancel
    </button>
  );
};

export default CancelButton;
