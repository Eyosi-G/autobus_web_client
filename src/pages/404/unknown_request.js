import React from "react";
import _404 from "../../images/404.svg";
const UnknownRequest = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex items-center justify-center">
        <img src={_404} className="h-1/4 w-1/4"/>
      </div>
    </div>
  );
};

export default UnknownRequest;
