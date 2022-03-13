import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dialog from "../../components/dialog";
import Modal from "../../components/modal";
import Paginate from "../../components/paginate";
import Spinner from "../../components/spinner";
import AddEditTimeFrame from "./add_edit_timeframe";
import {
  resetCreateTimeFrame,
  fetchTimeFrames,
  deleteTimeFrame,
  resetDeleteTimeFrame,
  resetEditTimeFrame,
} from "../../store/timeframe/actions";
import { toISOString, toLongDate } from "../../utils/date_format";
import Confirmation from "../../components/confirmation";
import Empty from "../../components/empty";

const Timeframes = () => {
  const dispatch = useDispatch();
  const {
    loading: createTimeFrameLoading,
    success: createTimeFrameSuccess,
    error: createTimeFrameError,
  } = useSelector((state) => state.createTimeFrame);

  const {
    loading,
    data: { count = 0, timeFrames = [] },
    error,
  } = useSelector((state) => state.timeFrameList);

  const {
    loading: deleteTimeFrameLoading,
    success: deleteTimeFrameSuccess,
    error: deleteTimeFrameError,
  } = useSelector((state) => state.deleteTimeFrame);

  const {
    loading: editTimeFrameLoading,
    success: editTimeFrameSuccess,
    error: editTimeFrameError,
  } = useSelector((state) => state.editTimeFrame);

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const [formOpen, setFormOpen] = useState(false);

  const onPageChangeHandler = (newPage) => {
    setPage(newPage);
  };
  const onLimitChangeHandler = (newLimit) => {
    setLimit(newLimit);
  };

  useEffect(() => {
    dispatch(fetchTimeFrames(page, limit));
  }, [page, limit]);

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [currentTimeFrame, setCurrentTimeFrame] = useState(null);
  const [edit, setEdit] = useState(false);

  const successDialogMessage = () => {
    if (createTimeFrameSuccess) return "timeframe created successfully";
    if (deleteTimeFrameSuccess) return "timeframe deleted successfully ";
    if (editTimeFrameSuccess) return "timeframe edited successfully";
  };

  const errorDialogMessage = () => {
    if (createTimeFrameError) return "failed to create timeframe";
    if (deleteTimeFrameError) return "failed to delete timeframe";
    if (editTimeFrameError) return "failed to edit timeframe";
  };

  const closeDialogHandler = () => {
    if (createTimeFrameSuccess || createTimeFrameError) return dispatch(resetCreateTimeFrame());
    if (deleteTimeFrameSuccess || deleteTimeFrameError) return dispatch(resetDeleteTimeFrame());
    if (editTimeFrameSuccess || editTimeFrameError) return dispatch(resetEditTimeFrame())
  };

  return (
    <div className="container p-4">
      <Modal open={openConfirmation}>
        <div className="absolute h-screen w-screen bg-black bg-opacity-40 flex justify-center items-center">
          <Confirmation
            handleDelete={() => {
              if (currentTimeFrame) {
                dispatch(deleteTimeFrame(currentTimeFrame.id));
                setOpenConfirmation(false);
              }
            }}
            handleCancel={() => {
              setOpenConfirmation(false);
              setCurrentTimeFrame(null);
            }}
          />
        </div>
      </Modal>
      <Modal open={formOpen}>
        <div className="absolute h-screen w-screen bg-black bg-opacity-60 flex justify-center items-center z-10">
          <AddEditTimeFrame
            timeFrame={currentTimeFrame}
            edit={edit}
            setOpen={setFormOpen}
          />
        </div>
      </Modal>

      <Modal open={createTimeFrameLoading || deleteTimeFrameLoading || editTimeFrameLoading}>
        <div className="absolute h-screen w-screen bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-10 rounded-lg">
            <Spinner className="mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-black" />
          </div>
        </div>
      </Modal>

      <Dialog
        open={createTimeFrameError || deleteTimeFrameError || editTimeFrameError}
        severity="failure"
        message={errorDialogMessage()}
        close={() => closeDialogHandler()}
      />
      <Dialog
        open={createTimeFrameSuccess || deleteTimeFrameSuccess || editTimeFrameSuccess}
        severity="success"
        message={successDialogMessage()}
        close={() => closeDialogHandler()}
      />

      <div className="flex items-center justify-between mb-3 ">
        <p className="font-semibold capitalize">Timeframes</p>
        <button
          onClick={() => setFormOpen(true)}
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
          <span className="lowercase">new timeframe</span>
        </button>
      </div>
      {!loading && timeFrames.length == 0 ? (
        <Empty />
      ) : (
        <div>
          <table className="w-full border border-collapse bg-white">
            <thead className="capitalize">
              <tr className="text-left">
                <th className="p-2">date</th>
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
              {timeFrames.map((timeFrame) => {
                return (
                  <tr className="hover:bg-gray-50">
                    <td
                      className="border p-2  hover:cursor-pointer"
                      onClick={() =>
                        navigate(`/admin/timeframes/${timeFrame.id}/schedules`)
                      }
                    >
                      <div className="space-x-2">
                        <span className="bg-amber-100 px-2 py-2 rounded-lg">
                          {toLongDate(new Date(timeFrame.start_date))}
                        </span>
                        <span className="font-bold">-</span>
                        <span className="bg-amber-100 px-2 py-2 rounded-lg">
                          {toLongDate(new Date(timeFrame.end_date))}
                        </span>
                      </div>
                    </td>
                    <td className="border p-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setCurrentTimeFrame(timeFrame);
                            setEdit(true);
                            setFormOpen(true);
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
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                        <button
                          className="text-red-600"
                          onClick={() => {
                            setCurrentTimeFrame(timeFrame);
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

export default Timeframes;
