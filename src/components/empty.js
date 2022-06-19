import React from "react";
import empty from '../images/empty.svg'
const Empty = ({message}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 mt-10">
      <img src={empty} className="h-52 w-52" />
      <div className="text-sm text-gray-500 capitalize tracking-wider font-thin">
        {message}
      </div>
    </div>
  );
};

export default Empty;
