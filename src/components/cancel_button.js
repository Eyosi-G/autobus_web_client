import React from "react";
import { useNavigate } from "react-router-dom";

const CancelButton = ({ onCancelHandler }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => {
        onCancelHandler ? onCancelHandler() : navigate(-1);
      }}
      className="border rounded-md py-1 px-5 drop-shadow-md"
    >
      cancel
    </button>
  );
};

export default CancelButton;
