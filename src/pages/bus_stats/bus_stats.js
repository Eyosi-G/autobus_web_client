import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dialog from "../../components/dialog";
import Empty from "../../components/empty";
import Modal from "../../components/modal";
import Paginate from "../../components/paginate";
import Spinner from "../../components/spinner";
import {
  fetchBusStats,
  resetFetchBusStats,
} from "../../store/bus_stat/actions";
const BusSats = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const navigate = useNavigate();

  const onPageChangeHandler = (_newPage) => {
    setPage(_newPage);
  };
  const onLimitChangeHandler = (_newLimt) => {
    setLimit(_newLimt);
  };

  const {
    loading,
    data: { count, stats },
    error,
  } = useSelector((state) => state.busStatsList);

  useEffect(() => {
    dispatch(fetchBusStats(page, limit));
  }, [limit, page]);
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Bus Stats </span>
        <div className="my-3 flex justify-end items-center">
          <button
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
          <button className="flex space-x-2 items-center px-3 py-1  rounded-md bg-gray-600 text-white">
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
        </div>
      </div>
      <Modal open={error}>
        <Dialog
          severity="failure"
          message={error}
          close={() => dispatch(resetFetchBusStats())}
        />
      </Modal>
      {!loading && stats.length == 0 ? (
        <Empty message="no bus stats found" />
      ) : (
        <div>
          <table className="w-full border border-collapse bg-white">
            <thead className="capitalize">
              <tr className="text-left">
                <th className="p-2">date</th>
                <th className="p-2">bus number</th>
                <th className="p-2">morning commmuters</th>
                <th className="p-2">afternoon commmuters</th>
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
                  <tr>
                    <td className="border p-2">{stat.date.split("T")[0]}</td>
                    <td className="border p-2">{stat.bus_number}</td>
                    <td className="border p-2">{stat.morning_commuters}</td>
                    <td className="border p-2">{stat.afternoon_commuters}</td>
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
                          <button className="flex space-x-2" onClick={() => {}}>
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
                            className="text-red-600 flex space-x-2"
                            onClick={() => {}}
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

export default BusSats;
