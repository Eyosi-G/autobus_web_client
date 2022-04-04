import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CancelButton from "../../components/cancel_button";
import SaveButton from "../../components/save_button";
import { createTimeFrame, editTimeFrame } from "../../store/timeframe/actions";
import { editTimeFrameReducer } from "../../store/timeframe/reducer";
const AddEditTimeFrame = ({ setOpen, edit = false, timeFrame = null }) => {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(() => {
    if (edit) return timeFrame.start_date.split("T")[0];
    let date = new Date();
    return date.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(() => {
    if (edit) return timeFrame.end_date.split("T")[0];
    let date = new Date();
    return date.toISOString().split("T")[0];
  });

  useEffect(() => {
    if (endDate <= startDate) {
      console.log("second");
      console.log(endDate);
      console.log(startDate);
      let date = new Date(startDate);
      date.setDate(date.getDate() + 1);
      setEndDate(date.toISOString().split("T")[0]);
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate <= startDate) {
      console.log("thrid");
      let date = new Date(endDate);
      date.setDate(date.getDate() - 1);
      setStartDate(date.toISOString().split("T")[0]);
    }
  }, [endDate]);

  return (
    <div className="p-2 bg-white space-y-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = {
            start_date: startDate,
            end_date: endDate,
          };
          if (edit) {
            dispatch(editTimeFrame(timeFrame.id, data));
            return setOpen(false);
          }
          dispatch(createTimeFrame(data));
          setOpen(false);
        }}
      >
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
          <CancelButton onCancelHandler={() => setOpen(false)} />
          <SaveButton />
        </div>
      </form>
    </div>
  );
};

export default AddEditTimeFrame;
