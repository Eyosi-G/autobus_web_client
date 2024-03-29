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
import Empty from "../../components/empty";
import { baseURL } from "../../utils/axios";
import Modal from "../../components/modal";
import Confirmation from "../../components/confirmation";
import defaultImage from "../../images/default.jpg";
import ChangePassword from "../../components/change_password";
import ErrorMessage from "../../components/error_message";
import SuccessMessage from "../../components/success_message";
import Loading from "../../components/loading";

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
  const [limit, setLimit] = useState(4);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const onPageChangeHandler = (_newPage) => {
    setPage(_newPage);
  };
  const onLimitChangeHandler = (_newLimt) => {
    setLimit(_newLimt);
  };

  useEffect(() => {
    dispatch(fetchTicketers(page, limit, search));
    return () => {
      dispatch(resetFetchTicketers());
    };
  }, [page, limit, search]);

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [currentTicketer, setCurrentTicketer] = useState(null);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  return (
    <div>
      <Modal open={openChangePassword}>
        <div
          className="absolute h-screen w-screen bg-black bg-opacity-40 flex justify-center items-center"
          style={{ zIndex: 1000 }}
        >
          <div className="w-1/2 bg-white rounded-md">
            <ChangePassword
              userId={currentTicketer && currentTicketer.id}
              cancelHandler={() => {
                setCurrentTicketer(null);
                setOpenChangePassword(false);
              }}
            />
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
      <Loading open={deleteTicketerLoading || loading} />
      {deleteTicketerError && (
        <ErrorMessage
          message={deleteTicketerError}
          onClickHandler={() => dispatch(resetDeleteTicketer())}
        />
      )}
      {deleteTicketerSuccess && (
        <SuccessMessage
          message="ticketer deleted successfully"
          onClickHandler={() => dispatch(resetDeleteTicketer())}
        />
      )}
      {error && (
        <ErrorMessage
          message={error}
          onClickHandler={() => dispatch(resetFetchTicketers())}
        />
      )}

      <div className="flex items-center justify-between my-3 ">
        <p className="font-semibold capitalize">Manage Ticketers</p>
        <button
          data-cy="add-ticketer"
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
      <Search search={search} onSearchChange={(value) => setSearch(value)} />
      {!loading && ticketers.length === 0 ? (
        <Empty message="empty list of ticketers please add some." />
      ) : (
        <div>
          <table className="w-full border border-collapse bg-white mt-2">
            <thead className="bg-gray-700 text-white capitalize">
              <tr className="text-left">
                <th></th>
                <th className="p-2">first name</th>
                <th className="p-2">last name</th>
                <th className="p-2">phone number</th>
                <th className="p-2">email</th>
                <th className="p-2">gender</th>
                <th className="p-2">birth date</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {ticketers.map((ticketer) => {
                return (
                  <tr data-cy="ticketer">
                    <td className="border p-2">
                      <div className="flex justify-center">
                        <img
                          src={
                            ticketer.image
                              ? process.env.NODE_ENV === "production"
                                ? ticketer.image
                                : `${baseURL}/images/${ticketer.image}`
                              : defaultImage
                          }
                          className="h-12 w-12 object-cover rounded-full"
                        />
                      </div>
                    </td>
                    <td className="border p-2">{ticketer.first_name}</td>
                    <td className="border p-2">{ticketer.last_name}</td>
                    <td className="border p-2">
                      {ticketer.user.phone_number || "--"}
                    </td>
                    <td className="border p-2">
                      {ticketer.user.email || "--"}
                    </td>
                    <td className="border p-2">{ticketer.gender}</td>
                    <td className="border p-2">
                      {ticketer.birth_date.split("T")[0]}
                    </td>
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
                            className="flex space-x-2"
                            onClick={() => {
                              setCurrentTicketer(ticketer);
                              setOpenChangePassword(true);
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
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </span>
                            <span>change password</span>
                          </button>
                          <button
                            data-cy="delete-ticketer"
                            className="text-red-600 flex space-x-2"
                            onClick={() => {
                              setCurrentTicketer(ticketer);
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
          <div className="flex justify-end mt-2">
            <Paginate
              limits={[4, 8, 12]}
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
