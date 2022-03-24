import React from "react";
import { PulseLoader } from "react-spinners";

const Spinner = ({ color = "black" }) => {
  return <PulseLoader color={color} />;
};

export default Spinner;
