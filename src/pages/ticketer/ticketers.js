import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Paginate from "../../components/paginate";
import Search from "../../components/search";
import {
  deleteTicketer,
  fetchTicketers,
  resetDeleteTicketer,
  resetFetchTicketers,
} from "../../store/ticketer/actions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/spinner";
import Empty from "../../components/empty";
import { baseURL } from "../../utils/axios";
import Modal from "../../components/modal";
import Confirmation from "../../components/confirmation";
import Dialog from "../../components/dialog";
const Ticketers = (props) => {
  const dispatch = useDispatch();
  const {
    loading,
    data: { count, ticketers },
    error,
  } = useSelector((state) => state.ticketersList);

  const {
    loading: deleteTicketerLoading,
    success: deleteTicketerSuccess,
    error: deleteTicketerError,
  } = useSelector((state) => state.deleteTicketer);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const navigate = useNavigate();

  const onPageChangeHandler = (_newPage) => {
    setPage(_newPage);
  };
  const onLimitChangeHandler = (_newLimt) => {
    setLimit(_newLimt);
  };

  useEffect(() => {
    dispatch(fetchTicketers(page, limit));
    return () => {
      dispatch(resetFetchTicketers());
    };
  }, [page, limit]);



  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [currentTicketer, setCurrentTicketer] = useState(null);

  return (
    <div>
      <Modal open={deleteTicketerLoading}>
        <div className="absolute h-screen w-screen bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-10 rounded-lg">
            <Spinner className="mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-black" />
          </div>
        </div>
      </Modal>
      <Modal open={openConfirmation}>
        <div className="absolute h-screen w-screen bg-black bg-opacity-40 flex justify-center items-center">
          <Confirmation
            handleDelete={() => {
              if (currentTicketer) {
                dispatch(deleteTicketer(currentTicketer.id));
                setOpenConfirmation(false);
              }
            }}
            handleCancel={() => {
              setOpenConfirmation(false);
            }}
          />
        </div>
      </Modal>
      <div className="my-2">
        <Dialog
          open={deleteTicketerError}
          severity="failure"
          message="failed to delete ticketer."
          close={() => dispatch(resetDeleteTicketer())}
        />
      </div>
      <div className="my-2">
        <Dialog
          open={deleteTicketerSuccess}
          severity="success"
          message="ticketer deleted successfully !"
          close={() => dispatch(resetDeleteTicketer())}
        />
      </div>

      <div className="flex items-center justify-between mb-3 ">
        <p className="font-semibold capitalize">Manage Ticketers</p>
        <button
          onClick={() => navigate("/admin/ticketers/new")}
          className="flex space-x-2 items-center px-3 py-1 rounded-md bg-gray-700 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
          </svg>
          <span className="lowercase">new ticketer</span>
        </button>
      </div>
      {!loading && ticketers.length === 0 ? (
        <Empty message="empty list of ticketers please add some." />
      ) : (
        <div>
          <Search />
          <table className="w-full border border-collapse bg-white">
            <thead>
              <tr className="text-left">
                <th></th>
                <th className="p-2">first name</th>
                <th className="p-2">last name</th>
                <th className="p-2">phone number</th>
                <th className="p-2">email</th>
                <th className="p-2">gender</th>
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
              {ticketers.map((ticketer) => {
                return (
                  <tr>
                    <td className="border p-2">
                      <div className="flex justify-center">
                        <img
                          src={`${baseURL}/images/${ticketer.image}`}
                          className="h-12 w-12 object-cover rounded-full"
                        />
                      </div>
                    </td>
                    <td className="border p-2">{ticketer.first_name}</td>
                    <td className="border p-2">{ticketer.last_name}</td>
                    <td className="border p-2">{ticketer.phone_number}</td>
                    <td className="border p-2">{ticketer.email}</td>
                    <td className="border p-2">{ticketer.gender}</td>
                    <td className="border p-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            navigate(`/admin/ticketers/${ticketer.id}/edit`)
                          }
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
                            setCurrentTicketer(ticketer);
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

export default Ticketers;
