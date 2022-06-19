import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dialog from "../../components/dialog";
import Modal from "../../components/modal";
import Paginate from "../../components/paginate";
import Spinner from "../../components/spinner";

import Confirmation from "../../components/confirmation";
import {
  deleteRoute,
  fetchRoutes,
  resetCreateRoute,
  resetDeleteRoute,
} from "../../store/route/actions";
import Empty from "../../components/empty";
import Loading from "../../components/loading";
import SuccessMessage from "../../components/success_message";
import ErrorMessage from "../../components/error_message";

const Routes = () => {
  const dispatch = useDispatch();

  const {
    loading,
    data: { count = 0, routes = [] },
    error,
  } = useSelector((state) => state.routesList);

  const {
    loading: deleteRouteLoading,
    success: deleteRouteSuccess,
    error: deleteRouteError,
  } = useSelector((state) => state.deleteRoute);

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
    dispatch(fetchRoutes(page, limit));
  }, [page, limit]);

  useEffect(() => {
    return () => {
      dispatch(resetDeleteRoute());
    };
  }, []);

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(null);

  return (
    <div className="p-4">
      <Modal open={openConfirmation}>
        <div className="absolute h-screen w-screen bg-black bg-opacity-40 flex justify-center items-center">
          <Confirmation
            handleDelete={() => {
              if (currentRoute) {
                dispatch(deleteRoute(currentRoute.id));
                setOpenConfirmation(false);
              }
            }}
            handleCancel={() => {
              setOpenConfirmation(false);
              setCurrentRoute(null);
            }}
          />
        </div>
      </Modal>

      <Loading open={deleteRouteLoading || loading} />
      {deleteRouteSuccess && (
        <SuccessMessage
          message="route deleted successfully "
          onClickHandler={() => dispatch(resetDeleteRoute())}
        />
      )}
      {deleteRouteError && (
        <ErrorMessage
          message={deleteRouteError}
          onClickHandler={() => dispatch(resetDeleteRoute())}
        />
      )}

      <div className="flex items-center justify-between my-3 ">
        <p className="font-semibold capitalize">Routes</p>
        <button
          onClick={() => {
            navigate("/admin/routes/new");
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
          <span className="lowercase">new route</span>
        </button>
      </div>

      {!loading && routes.length === 0 ? (
        <Empty message="there are not routes registered !" />
      ) : (
        <div>
          <table className="w-full border border-collapse bg-white">
            <thead className="capitalize bg-gray-700 text-white">
              <tr className="text-left">
                <th className="p-2">route number</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {routes.map((route) => {
                return (
                  <tr className="hover:bg-gray-50">
                    <td
                      className="border p-2 hover:cursor-pointer"
                      onClick={() => {}}
                    >
                      {route.route_number}
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
                            onClick={() =>
                              navigate(`/admin/routes/${route.id}/edit`)
                            }
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
                            className="text-red-600 flex space-x-2"
                            onClick={() => {
                              setOpenConfirmation(true);
                              setCurrentRoute(route);
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

export default Routes;
