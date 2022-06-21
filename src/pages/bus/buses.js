import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Empty from "../../components/empty";
import Loading from "../../components/loading";
import Modal from "../../components/modal";
import Paginate from "../../components/paginate";
import PreviewBusUpload from "../../components/preview_bus_upload";
import SuccessMessage from "../../components/success_message";
import ErrorMessage from "../../components/error_message";

import {
  deleteBus,
  deleteBusReset,
  fetchBuses,
  fetchBusesReset,
  uploadBus,
  uploadBusReset,
} from "../../store/bus/actions";
import AddEditBus from "./add_edit_bus";
import Confirmation from "../../components/confirmation";
import Search from "../../components/search";

const Buses = () => {
  const dispatch = useDispatch();
  const [openAddEditBus, setOpenAddEditBus] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [singleBus, setSingleBus] = useState(null);
  const uploadRef = useRef();
  const [uploadFile, setUploadFile] = useState();
  const [previewData, setPreviewData] = useState([]);
  const [showUploadPreview, setUploadPreview] = useState(false);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState();

  const uploadHandler = (e) => {
    uploadRef.current.click();
  };

  function csvToArray(str) {
    try {
      let rows = str.slice(str.indexOf("\n") + 1).split("\n");
      rows = rows.map((row) => row.split(","));
      return rows;
    } catch (e) {
      return [];
    }
  }

  const onUploadChange = (e) => {
    const input = e.target.files[0];
    const reader = new FileReader();
    setUploadFile(input);
    reader.onload = function (e) {
      const text = e.target.result;
      const rows = csvToArray(text);
      setPreviewData(rows);
      setUploadPreview(true);
    };

    reader.readAsText(input);
  };

  const {
    loading: createBulkBusesLoading,
    success: createBulkBusesSuccess,
    error: createBulkBusesFailure,
  } = useSelector((state) => state.createBulkBuses);

  const {
    loading: fetchBusesLoading,
    data: { buses, count },
    error: fetchBusesFailure,
  } = useSelector((state) => state.fetchBuses);

  const { success: deleteBusSuccess, error: deleteBusError } = useSelector(
    (state) => state.deleteBus
  );

  useEffect(() => {
    dispatch(fetchBuses(page, limit, search));
  }, [page, limit, search]);


  const onSearchChange = (value) => {
    setSearch(value)
  };
  return (
    <div>
      <Loading open={createBulkBusesLoading || fetchBusesLoading} />
      {/* delete bus */}
      {deleteBusError && (
        <ErrorMessage
          message={deleteBusError}
          onClickHandler={() => dispatch(deleteBusReset())}
        />
      )}
      {deleteBusSuccess && (
        <SuccessMessage
          message="bus successfully deleted"
          onClickHandler={() => dispatch(deleteBusReset())}
        />
      )}

      {/* fetch buses */}
      {fetchBusesFailure && (
        <ErrorMessage
          message={fetchBusesFailure}
          onClickHandler={() => dispatch(fetchBusesReset())}
        />
      )}
      {/* bulk upload buses */}
      {createBulkBusesFailure && (
        <ErrorMessage
          message={createBulkBusesFailure}
          onClickHandler={() => dispatch(uploadBusReset())}
        />
      )}
      {createBulkBusesSuccess && (
        <SuccessMessage
          message="buses uploaded successfully"
          onClickHandler={() => dispatch(uploadBusReset())}
        />
      )}

      <Modal open={showUploadPreview}>
        <PreviewBusUpload
          previewData={previewData}
          setUploadPreview={setUploadPreview}
          uploadFile={uploadFile}
          setUploadFile={setUploadFile}
        />
      </Modal>

      <Modal open={openAddEditBus}>
        <div
          className="absolute h-screen w-screen bg-black bg-opacity-60 flex justify-center items-center"
          style={{ zIndex: 200 }}
        >
          <div className="w-1/2 bg-white p-4 rounded-md">
            <AddEditBus
              isEdit={isEdit}
              setOpenAddEditBus={setOpenAddEditBus}
              bus={singleBus}
            />
          </div>
        </div>
      </Modal>
      <Modal open={openConfirmation}>
        <div className="absolute h-screen w-screen bg-black bg-opacity-40 flex justify-center items-center">
          <Confirmation
            handleDelete={() => {
              if (singleBus) {
                dispatch(deleteBus(singleBus.id));
                setOpenConfirmation(false);
                setSingleBus(null);
              }
            }}
            handleCancel={() => {
              setOpenConfirmation(false);
              setSingleBus(null);
            }}
          />
        </div>
      </Modal>

      <div className="flex items-center justify-between">
        <span className="font-semibold">Buses </span>
        <div className="my-3 flex justify-end items-center">
          <button
            onClick={() => setOpenAddEditBus(true)}
            data-cy="new_bus"
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
            <span>new bus</span>
          </button>
          <button
            onClick={uploadHandler}
            className="flex space-x-2 items-center px-3 py-1  rounded-md bg-gray-600 text-white"
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
            <span>upload bus</span>
          </button>
          <input
            type="file"
            className="hidden"
            ref={uploadRef}
            onChange={onUploadChange}
            onClick={(e) => (e.value = null)}
            value=""
            accept=".csv"
          />
        </div>
      </div>
      <Search search={search} onSearchChange={onSearchChange} placeholder="e.g 1000" />

      {buses.length == 0 && !fetchBusesLoading && (
        <Empty message="empty buses" />
      )}
      {buses.length > 0 && (
        <div className="mt-2">
          <table className="w-full border border-collapse bg-white">
            <thead className="bg-gray-700 text-white capitalize">
              <tr className="font-semibold capitalize">
                <td className="p-2">side number</td>
                <td className="p-2">capacity</td>
                <td className="p-2"></td>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus, index) => {
                return (
                  <tr data-cy="buses">
                    <td className="border p-2">{bus.side_number}</td>
                    <td className="border p-2">{bus.capacity}</td>

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
                            data-cy="edit-bus"
                            className="flex space-x-2"
                            onClick={() => {
                              setIsEdit(true);
                              setSingleBus(bus);
                              setOpenAddEditBus(true);
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
                            data-cy="delete-bus"
                            className="text-red-600 flex space-x-2"
                            onClick={() => {
                              setSingleBus(bus);
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
          <div className="flex space-x-3 justify-end mt-5">
            <Paginate
              total={count}
              page={page}
              limit={limit}
              limits={[5, 10, 15]}
              onLimitChange={(_newLimit) => {
                setLimit(_newLimit);
              }}
              onPageChange={(_newPage) => {
                setPage(_newPage);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Buses;
