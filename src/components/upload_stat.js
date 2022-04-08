import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusStats, resetUploadBusStat, uploadBusStat } from "../store/bus_stat/actions";
import Dialog from "./dialog";

const UploadStat = ({ file, onCloseHandler }) => {
  const { loading, progress, success, error } = useSelector(
    (state) => state.uploadBusStat
  );
  const dispatch = useDispatch();

  const uploadMessage = (success = true) => {
    return (
      <div className="my-2">
        <div
          className={`border-l-green-400 bg-green-50 ${
            !success && "border-l-red-400 bg-red-50"
          } border-l-4 b flex justify-between p-1 rounded-md`}
        >
          <span className="capitalize">
            {success ? "file uploaded successfully" : "failed to upload file"}
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    );
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("file", file);
    dispatch(uploadBusStat(formData));
  };

  useEffect(()=>{
    return ()=>{
      dispatch(resetUploadBusStat())
    }
  },[])

  useEffect(()=>{
    dispatch(fetchBusStats(0, 5))
  },[success])

  return (
    <div>
      <div className="flex justify-end">
        <button onClick={() => onCloseHandler()}>
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex space-x-2 items-center">
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </span>
        <p> Document</p>
      </div>
      <div className="my-2 flex justify-between text-gray-700">
        <p>{file.name}</p>
        <p>{file.size / 1000} KB</p>
      </div>
      <div className="bg-gray-200 h-1 my-2">
        <div
          className="h-1 bg-gray-600"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {success && uploadMessage(true)}
      {error && uploadMessage(false)}
      <button
        className={`px-2 py-1 bg-gray-600 text-gray-50 rounded-lg w-full ${
          (loading || success || error) && "bg-gray-400 text-gray-500"
        }`}
        disabled={loading || success || error}
        onClick={onSubmit}
      >
        submit
      </button>
    </div>
  );
};

export default UploadStat;
