import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/back_button";
import Dialog from "../../components/dialog";
import Modal from "../../components/modal";
import Paginate from "../../components/paginate";
import Spinner from "../../components/spinner";
import {
  generateSchedule,
  getSchedules,
  resetGenerateSchedule,
  resetGetSchedule,
} from "../../store/schedule/actions";
import {
  fetchSingleTimeFrame,
  resetFetchSingleTimeFrame,
} from "../../store/timeframe/actions";
import { toLongDate } from "../../utils/date_format";
const Schedules = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 5 },
    { id: 9 },
  ]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const params = useParams();
  const dispatch = useDispatch();
  const {
    loading: singelTimeFrameLoading,
    data: singleTimeFrameData,
    error: singleTimeFrameError,
  } = useSelector((state) => state.singleTimeFrame);

  const {
    loading: generateScheduleLoading,
    success: generateScheduleSuccess,
    error: generateScheduleError,
  } = useSelector((state) => state.generateSchedule);

  const {
    loading: getScheduleLoading,
    data: { count, schedules },
    error: getScheduleError,
  } = useSelector((state) => state.getSchedules);

  const onPageChangeHandler = (newPage) => {
    setPage(newPage);
  };
  const onLimitChangeHandler = (newLimit) => {
    setLimit(newLimit);
  };

  useEffect(() => {
    const id = params.id;
    dispatch(fetchSingleTimeFrame(id));
    dispatch(getSchedules(id));
    return () => {
      dispatch(resetFetchSingleTimeFrame());
      dispatch(resetGenerateSchedule());
      dispatch(resetGetSchedule());
    };
  }, []);

  useEffect(() => {
    dispatch(getSchedules(id, page, limit));
  }, [generateScheduleSuccess, page, limit]);

  const generateScheduleHandler = () => {
    const id = params.id;
    dispatch(generateSchedule(id));
  };

  const dialogCloseHandler = () => {
    if (singleTimeFrameError) return dispatch(resetFetchSingleTimeFrame());
    if (generateScheduleError) return dispatch(resetGenerateSchedule());
    if (getScheduleError) return dispatch(resetGetSchedule());
  };

  const dialogMessage = () => {
    if (singleTimeFrameError) return "couldn't fetch time data";
    if (generateScheduleError) return "couldn't generate schedule";
    if (getScheduleError) return "could't fetch schedules";
  };

  return (
    <div>
      <Modal
        open={singleTimeFrameError || generateScheduleError || getScheduleError}
      >
        <Dialog
          severity="failure"
          message={dialogMessage()}
          close={dialogCloseHandler}
        />
      </Modal>
      <div className="flex justify-end my-2">
        <BackButton />
      </div>
      <div className="flex items-center justify-between mb-3 ">
        <p className="font-semibold capitalize space-x-2">
          <span className="bg-amber-100 px-2 py-1 rounded-lg">
            {singleTimeFrameData &&
              toLongDate(new Date(singleTimeFrameData.start_date))}
          </span>
          <span>-</span>
          <span className="bg-amber-100 px-2 py-1 rounded-lg">
            {singleTimeFrameData &&
              toLongDate(new Date(singleTimeFrameData.end_date))}
          </span>
        </p>
        <button
          disabled={count > 0}
          onClick={generateScheduleHandler}
          className={`flex space-x-2 items-center px-3 py-1 rounded-md bg-gray-700 text-gray-50 ${
            count > 0 && "bg-gray-200 text-slate-600"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
          <span>generate schedule</span>
        </button>
      </div>
      {getScheduleLoading ||
        generateScheduleLoading ||
        (singelTimeFrameLoading && (
          <div className="py-2 flex justify-center">
            <Spinner />
          </div>
        ))}
      {
        <div>
          <table className="w-full border border-collapse bg-white">
            <thead>
              <tr className="text-left capitalize">
                <th className="p-2">date</th>
                <th className="p-2">bus number</th>
                <th className="p-2">side number</th>
                <th className="p-2">shift</th>
                <th className="p-2">driver</th>
                <th className="p-2">ticketer</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {schedules.map((schedule) => {
                return (
                  <tr
                    className="hover:bg-gray-50 hover:cursor-pointer"
                    onClick={() => navigate(`/admin/schedules/${schedule.id}`)}
                  >
                    <td className="border p-2">
                      {toLongDate(new Date(schedule.date))}
                    </td>
                    <td className="border p-2">{schedule.bus_number}</td>
                    <td className="border p-2">{schedule.side_number}</td>
                    <td className="border p-2">{schedule.shift}</td>
                    <td className="border p-2">{`${schedule.driver.first_name} ${schedule.driver.last_name}`}</td>
                    <td className="border p-2">{`${schedule.ticketer.first_name} ${schedule.ticketer.last_name}`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-end mt-2">
            <Paginate
              limits={[5, 10, 15]}
              page={page}
              total={count}
              limit={limit}
              onPageChange={onPageChangeHandler}
              onLimitChange={onLimitChangeHandler}
            />
          </div>
        </div>
      }
    </div>
  );
};

export default Schedules;
