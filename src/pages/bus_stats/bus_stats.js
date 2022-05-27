import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Confirmation from "../../components/confirmation";
import Dialog from "../../components/dialog";
import Empty from "../../components/empty";
import Modal from "../../components/modal";
import Paginate from "../../components/paginate";
import Spinner from "../../components/spinner";
import UploadStat from "../../components/upload_stat";
import {
  deleteBusStat,
  fetchBusStats,
  resetDeleteBusStat,
  resetFetchBusStats,
} from "../../store/bus_stat/actions";
import { convertTo12 } from "../../utils/time";
const BusSats = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const navigate = useNavigate();

  const uploadRef = useRef(null);
  const onPageChangeHandler = (_newPage) => {
    setPage(_newPage);
  };
  const onLimitChangeHandler = (_newLimt) => {
    setLimit(_newLimt);
  };

  const hours = [];
  for (let i = 1; i < 25; i++) {
    hours.push(i);
  }

  const {
    loading,
    data: { count, stats },
    error,
  } = useSelector((state) => state.busStatsList);

  const {
    loading: deleteBusStatLoading,
    success: deleteBusStatSuccess,
    error: deleteBusStatError,
  } = useSelector((state) => state.deleteBusStat);

  useEffect(() => {
    dispatch(fetchBusStats(page, limit));
  }, [limit, page]);

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [currentStat, setCurretStat] = useState(null);

  const [openUpload, setOpenUpload] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);

  return (
    <div className="p-4">
      <Modal open={deleteBusStatLoading}>
        <div className="absolute h-screen w-screen bg-black bg-opacity-40 flex justify-center items-center">
          <Spinner color="white" />
        </div>
      </Modal>
      <Modal open={openConfirmation}>
        <div className="absolute h-screen w-screen bg-black bg-opacity-40 flex justify-center items-center">
          <Confirmation
            handleDelete={() => {
              if (currentStat) {
                dispatch(deleteBusStat(currentStat.id));
                setOpenConfirmation(false);
              }
            }}
            handleCancel={() => {
              setOpenConfirmation(false);
            }}
          />
        </div>
      </Modal>
      <div className="flex items-center justify-between">
        <span className="font-semibold">Bus Stats </span>
        <div className="my-3 flex justify-end items-center">
          <button
            data-cy="new-bus-stats"
            onClick={() => navigate("/admin/bus_stats/new")}
            className="flex space-x-2 items-center px-3 py-1  rounded-md bg-gray-600 text-white mr-2"
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
            <span>new stat</span>
          </button>
          <button
            className="flex space-x-2 items-center px-3 py-1  rounded-md bg-gray-600 text-white"
            onClick={() => uploadRef.current.click()}
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <span>upload stats</span>
          </button>
          <input
            type="file"
            className="hidden"
            ref={uploadRef}
            onChange={(e) => {
              console.log(e.target.files);
              setUploadFile(e.target.files[0]);
              setOpenUpload(true);
            }}
            onClick={(e) => {
              e.target.value = null;
            }}
          />
        </div>
      </div>
      <Modal open={error}>
        <Dialog
          severity="failure"
          message={"error"}
          close={() => dispatch(resetFetchBusStats())}
        />
      </Modal>
      <Modal open={deleteBusStatError}>
        <Dialog
          severity="failure"
          message={deleteBusStatError}
          close={() => dispatch(resetDeleteBusStat())}
        />
      </Modal>
      <Modal open={deleteBusStatSuccess}>
        <Dialog
          severity="success"
          message={"bus stat deleted successfully"}
          close={() => dispatch(resetDeleteBusStat())}
        />
      </Modal>

      <Modal open={openUpload}>
        <div className="absolute h-screen w-screen bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-2 w-1/2 rounded-lg">
            <UploadStat
              file={uploadFile}
              onCloseHandler={() => setOpenUpload(false)}
            />
          </div>
        </div>
      </Modal>

      {!loading && stats.length == 0 ? (
        <Empty message="no bus stats found" />
      ) : (
        <div>
          <div className="w-full  overflow-auto h-96">
            <table className=" border border-collapse bg-white overflow-clip ">
              <thead className="capitalize">
                <tr className="text-left whitespace-nowrap">
                  <th className="p-2">date</th>
                  <th className="p-2">day</th>
                  <th className="p-2">route number</th>
                  {hours.map((hour) => {
                    let nextHour = (hour + 1) % 24;
                    let timeslot =
                      convertTo12(hour) + " - " + convertTo12(nextHour);
                    return (
                      <th className="p-2  w-1/100 uppercase">{timeslot}</th>
                    );
                  })}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={7}>
                    {loading && (
                      <div className=" w-full flex items-center justify-center m-2">
                        <Spinner />
                      </div>
                    )}
                  </td>
                </tr>
                {stats.map((stat) => {
                  return (
                    <tr className="whitespace-nowrap" data-cy="stat-item">
                      <td className="border p-2">{stat.date.split("T")[0]}</td>
                      <td className="border p-2">{stat.day}</td>
                      <td className="border p-2">{stat.route_number}</td>
                      {hours.map((hour) => {
                        let nextHour = (hour + 1) % 24;
                        const _stat = stat.stats.find(
                          (_data) =>
                            _data.startTime == hour && _data.endTime == nextHour
                        );
                        if (_stat) {
                          return (
                            <td className="border p-2">{_stat.commuters}</td>
                          );
                        }
                        return <td className="border p-2">--</td>;
                      })}
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
                              data-cy="stat-edit"
                              className="flex space-x-2"
                              onClick={() => {
                                navigate(`/admin/bus_stats/${stat.id}/edit`);
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
                              data-cy="stat-delete"
                              className="text-red-600 flex space-x-2"
                              onClick={() => {
                                setCurretStat(stat);
                                setOpenConfirmation(true);
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
          </div>
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

export default BusSats;
