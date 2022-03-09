import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import CancelButton from "../../components/cancel_button";
import SaveButton from "../../components/save_button";

const AddEditTimeFrame = ({ setOpen }) => {
  const [startDate, setStartDate] = useState(() => {
    let date = new Date();
    return date.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(() => {
    let date = new Date();
    return date.toISOString().split("T")[0];
  });

  useEffect(() => {
    if (endDate <= startDate) {
      let date = new Date(startDate);
      date.setDate(date.getDate() + 1);
      setEndDate(date.toISOString().split("T")[0]);
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate <= startDate) {
      let date = new Date(endDate);
      date.setDate(date.getDate() - 1);
      setStartDate(date.toISOString().split("T")[0]);
    }
  }, [endDate]);

  return (
    <div className="p-2 bg-white space-y-2">
      <form onSubmit={(e)=>{
          e.preventDefault()
          setOpen(false);
      }}>
        <div className="flex space-x-2">
          <div>
            <label>start date</label>
            <input
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-gray-100 p-2"
              type="date"
            />
          </div>
          <div>
            <label>end date</label>
            <input
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-gray-100 p-2"
              type="date"
            />
          </div>
        </div>
        <div className="flex space-x-3 justify-end mt-5">
          <CancelButton/>
          <SaveButton/>
        </div>
      </form>
    </div>
  );
};

export default AddEditTimeFrame;
