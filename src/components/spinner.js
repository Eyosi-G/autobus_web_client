import React from "react";
import { BeatLoader } from "react-spinners";

const Spinner = ({ color = "black", size = 14 }) => {
  return <BeatLoader color={color} size={size} />;
};

export default Spinner;
