import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal";
import Paginate from "../../components/paginate";
import {
  deleteBulkSchedule,
  deleteSchedule,
  getSchedules,
  resetDeleteBulkSchedule,
  resetDeleteSchedule,
  resetGetSchedules,
} from "../../store/schedule/actions";
import { convertTo12 } from "../../utils/time";
import defaultImage from "../../images/default.jpg";
import { baseURL } from "../../utils/axios";
import GenerateSchedule from "./generate_schedule";
import Confirmation from "../../components/confirmation";
import Loading from "../../components/loading";
import Empty from "../../components/empty";
import SuccessMessage from "../../components/success_message";
import ErrorMessage from "../../components/error_message";
const Schedules = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const dispatch = useDispatch();
  const [generateScheduleMenu, setGenerateScheduleMenu] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [bulkDeleteConfirmation, setBulkDeleteConfirmation] = useState(false);
  const [schedule, setSchedule] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [schedulesToBeDeleted, setSchedulesToBeDeleted] = useState([]);

  const {
    loading: schedulesLoading,
    error: schedulesError,
    data: { count, schedules },
  } = useSelector((state) => state.getSchedules);

  const onPageChangeHandler = (newPage) => {
    setPage(newPage);
  };
  const onLimitChangeHandler = (newLimit) => {
    setLimit(newLimit);
  };

  useEffect(() => {
    dispatch(getSchedules(page, limit));
  }, [page, limit]);

  const openGenerateMenu = () => {
    setGenerateScheduleMenu(true);
  };
  const closeGenerateMenu = () => {
    setGenerateScheduleMenu(false);
  };

  const {
    loading: deleteScheduleLoading,
    success: deleteScheduleSuccess,
    error: deleteScheduleError,
  } = useSelector((state) => state.deleteSchedule);

  const {
    loading: scheduleBulkDeleteLoading,
    success: scheduleBulkDeleteSuccess,
    error: scheduleBulkDeleteError,
  } = useSelector((state) => state.scheduleBulkDelete);
  useEffect(() => {
    if (
      schedules.length > 0 &&
      schedules.length == schedulesToBeDeleted.length
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectAll, schedulesToBeDeleted]);
  return (
    <div>
      <Modal open={confirmation}>
        <div className="absolute h-screen w-screen bg-black bg-opacity-40 flex justify-center items-center">
          <Confirmation
            handleDelete={() => {
              if (schedule) {
                setConfirmation(false);
                dispatch(deleteSchedule(schedule.id));
                setSchedule(null);
              }
            }}
            handleCancel={() => {
              setConfirmation(false);
              setSchedule(null);
            }}
          />
        </div>
      </Modal>
      <Modal open={bulkDeleteConfirmation}>
        <div className="absolute h-screen w-screen bg-black bg-opacity-40 flex justify-center items-center">
          <Confirmation
            handleDelete={() => {
              dispatch(deleteBulkSchedule(schedulesToBeDeleted));
              setBulkDeleteConfirmation(false);
              setSchedulesToBeDeleted([]);
            }}
            handleCancel={() => {
              setBulkDeleteConfirmation(false);
              setSchedulesToBeDeleted([]);
            }}
          />
        </div>
      </Modal>

      {/* schedule bulk delete */}
      {scheduleBulkDeleteError && (
        <ErrorMessage
          message={scheduleBulkDeleteError}
          onClickHandler={() => dispatch(resetDeleteBulkSchedule())}
        />
      )}
      {scheduleBulkDeleteSuccess && (
        <SuccessMessage
          message="schedules successfully deleted"
          onClickHandler={() => dispatch(resetDeleteBulkSchedule())}
        />
      )}
      {/* delete schedule */}
      <Loading
        open={
          deleteScheduleLoading || schedulesLoading || scheduleBulkDeleteLoading
        }
      />
      {deleteScheduleError && (
        <ErrorMessage
          message={deleteScheduleError}
          onClickHandler={() => dispatch(resetDeleteSchedule())}
        />
      )}
      {deleteScheduleSuccess && (
        <SuccessMessage
          message="schedule successfully deleted"
          onClickHandler={() => dispatch(resetDeleteSchedule())}
        />
      )}
      {/* fetch schedules */}
      {schedulesError && (
        <ErrorMessage
          message={schedulesError}
          onClickHandler={() => dispatch(resetGetSchedules())}
        />
      )}
      <Modal open={generateScheduleMenu}>
        <div className="absolute h-screen w-screen bg-black bg-opacity-60 flex justify-center items-center z-10">
          <div className="w-1/2 bg-white p-4 rounded-md">
            <GenerateSchedule closeGenerateMenu={closeGenerateMenu} />
          </div>
        </div>
      </Modal>
      {schedulesToBeDeleted.length == 0 && (
        <div className="flex justify-between items-center mt-5 relative">
          <div className="capitalize font-bold">schedules</div>
          <div className="flex items-center justify-end mb-3 space-x-2 ">
            <button
              data-cy="new_schedule"
              onClick={() => {
                navigate("/admin/schedules/new");
              }}
              className={`flex space-x-2 items-center px-3 py-1 rounded-md bg-gray-700 text-gray-50 `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>new schedule</span>
            </button>
            <button
              onClick={() => {
                openGenerateMenu();
              }}
              className={`flex space-x-2 items-center px-3 py-1 rounded-md bg-gray-700 text-gray-50 `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>generate schedule</span>
            </button>
          </div>
        </div>
      )}
      {schedulesToBeDeleted.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={() => setBulkDeleteConfirmation(true)}
            className="text-red-500 my-2 mx-2 bg-red-50 p-1 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      )}
      {schedules.length == 0 && !schedulesLoading && (
        <Empty message="empty schedules" />
      )}
      {schedules.length > 0 && (
        <div>
          <table className="w-full border border-collapse bg-white">
            <thead className="bg-gray-700 capitalize text-white">
              <tr className="text-left capitalize">
                <th className="p-2">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => {
                      if (e.target.checked) {
                        let _schedules = schedules.map(
                          (schedule) => schedule.id
                        );
                        setSchedulesToBeDeleted(_schedules);
                      } else {
                        setSchedulesToBeDeleted([]);
                      }
                    }}
                  />
                </th>
                <th className="p-2">day</th>
                <th className="p-2">start time</th>
                <th className="p-2">end time</th>
                <th className="p-2">driver</th>
                <th className="p-2">ticketer</th>
                <th className="p-2">route</th>
                <th className="p-2">side number</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {schedules.map((schedule) => {
                return (
                  <tr className="hover:bg-gray-50 hover:cursor-pointer">
                    <td className="border p-2">
                      <input
                        type="checkbox"
                        checked={schedulesToBeDeleted.includes(schedule.id)}
                        onChange={(e) => {
                          console.log("here");
                          if (schedulesToBeDeleted.includes(schedule.id)) {
                            let _filtered = schedulesToBeDeleted.filter(
                              (_scheduleId) => _scheduleId != schedule.id
                            );
                            setSchedulesToBeDeleted(_filtered);
                          } else {
                            setSchedulesToBeDeleted([
                              ...schedulesToBeDeleted,
                              schedule.id,
                            ]);
                          }
                        }}
                      />
                    </td>
                    <td className="border p-2">{schedule.day}</td>
                    <td className="border p-2">
                      {convertTo12(schedule.startTime)}
                    </td>
                    <td className="border p-2">
                      {convertTo12(schedule.endTime)}
                    </td>
                    <td className="border p-2 whitespace-nowrap">
                      <div className="flex justify-start items-center">
                        <img
                          src={
                            schedule.driver && schedule.driver.image
                              ? process.env.NODE_ENV === "production"
                                ? schedule.driver.image
                                : `${baseURL}/images/${schedule.driver.image}`
                              : defaultImage
                          }
                          className="h-12 w-12 object-cover rounded-full mr-2"
                        />
                        <div className="flex space-x-2">
                          <span>{schedule.driver.first_name}</span>
                          <span>{schedule.driver.last_name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="border p-2">
                      <div className="flex justify-start items-center">
                        <img
                          src={
                            schedule.ticketer.image
                              ? process.env.NODE_ENV === "production"
                                ? schedule.ticketer.image
                                : `${baseURL}/images/${schedule.ticketer.image}`
                              : defaultImage
                          }
                          className="h-12 w-12 object-cover rounded-full mr-2"
                        />
                        <div className="flex space-x-2">
                          <span>{schedule.ticketer.first_name}</span>
                          <span>{schedule.ticketer.last_name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="border p-2">{schedule.route}</td>
                    <td className="border p-2">{schedule.bus}</td>
                    <td className="border p-2">
                      <div className="relative group flex justify-end">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </span>
                        <div
                          className="hidden group-hover:block absolute p-2 bg-gray-50 rounded-lg drop-shadow-md space-y-2"
                          style={{ zIndex: 100 }}
                        >
                          <button
                            data-cy="edit"
                            className="flex space-x-2"
                            onClick={() => {
                              navigate(`/admin/schedules/${schedule.id}/edit`);
                            }}
                          >
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </span>
                            <span>edit</span>
                          </button>
                          <button
                            data-cy="delete-timeframe"
                            className="text-red-600 flex space-x-2"
                            onClick={() => {
                              setConfirmation(true);
                              setSchedule(schedule);
                            }}
                          >
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </span>
                            <span>delete</span>
                          </button>
                        </div>
                      </div>
                    </td>
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
      )}
    </div>
  );
};

export default Schedules;
