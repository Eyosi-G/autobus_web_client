import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dialog from "../../components/dialog";
import Modal from "../../components/modal";
import Paginate from "../../components/paginate";
import Spinner from "../../components/spinner";

import Confirmation from "../../components/confirmation";
import { fetchBuses } from "../../store/bus/actions";
import Empty from "../../components/empty";

const Buses = () => {
  const dispatch = useDispatch();
  const {
    loading: createTimeFrameLoading,
    success: createTimeFrameSuccess,
    error: createTimeFrameError,
  } = useSelector((state) => state.createTimeFrame);

  const {
    loading,
    data: { count = 0, buses = [] },
    error,
  } = useSelector((state) => state.busesList);

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const onPageChangeHandler = (newPage) => {
    setPage(newPage);
  };
  const onLimitChangeHandler = (newLimit) => {
    setLimit(newLimit);
  };

  useEffect(() => {
    dispatch(fetchBuses(page, limit));
  }, [page, limit]);

  const [openConfirmation, setOpenConfirmation] = useState(false);

  return (
    <div className="container p-4">
      <div className="flex items-center justify-between mb-3 ">
        <p className="font-semibold capitalize">Buses</p>
        <button
          onClick={() => {
            navigate("/admin/buses/new");
          }}
          className="flex space-x-2 items-center px-3 py-1 rounded-md bg-gray-700 text-white"
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
          <span className="lowercase">new bus</span>
        </button>
      </div>

      {buses.length === 0 ? (
        <Empty message="there are not buses registered !" />
      ) : (
        <div>
          <table className="w-full border border-collapse bg-white">
            <thead className="capitalize">
              <tr className="text-left">
                <th className="p-2">bus number</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading && (
                <tr>
                  <td colSpan={2}>
                    <div className="flex justify-center my-2">
                      <Spinner />
                    </div>
                  </td>
                </tr>
              )}
              {buses.map((bus) => {
                return (
                  <tr className="hover:bg-gray-50">
                    <td
                      className="border p-2 hover:cursor-pointer"
                      onClick={() => {}}
                    ></td>
                    <td className="border p-2">
                      <div className="flex space-x-2">
                        <button onClick={() => {}}>
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
                        </button>
                        <button
                          className="text-red-600"
                          onClick={() => {
                            setOpenConfirmation(true);
                          }}
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

export default Buses;
