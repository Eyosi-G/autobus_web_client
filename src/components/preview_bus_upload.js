import React, { useState } from "react";
import CancelButton from "./cancel_button";
import SaveButton from "./save_button";
import { uploadBus } from "../store/bus/actions";
import { useDispatch } from "react-redux";
import Paginate from "./paginate";

const PreviewBusUpload = ({
  setUploadPreview,
  previewData,
  uploadFile,
  setUploadFile,
}) => {
  const [previewPage, setPreviewPage] = useState(0);
  const [previewLimit, setPreviewLimit] = useState(5);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    setUploadPreview(false);
    setUploadFile(null);
    const formdata = new FormData();
    formdata.append("file", uploadFile);
    dispatch(uploadBus(formdata));
  };

  return (
    <form onSubmit={submitHandler}>
      <div
        className="absolute h-screen w-screen bg-black bg-opacity-60 flex justify-center items-center"
        style={{ zIndex: 200 }}
      >
        <div className="bg-white p-2 w-3/4 rounded-md">
          <table className="w-full border border-collapse rounded-md">
            <thead className="bg-gray-900 text-white">
              <tr className="font-semibold capitalize">
                <td className="p-2">side number</td>
                <td className="p-2">capacity</td>
              </tr>
            </thead>
            <tbody>
              {previewData
                .slice(
                  previewPage * previewLimit,
                  previewPage * previewLimit + previewLimit
                )
                .map((row) => {
                  return (
                    <tr>
                      <td className="border p-2">{row[0]}</td>
                      <td className="border p-2">{row[1]}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="flex space-x-3 justify-end mt-5">
            <Paginate
              total={previewData.length}
              page={previewPage}
              limit={previewLimit}
              limits={[5]}
              onLimitChange={(_newLimit) => {
                setPreviewLimit(_newLimit);
              }}
              onPageChange={(_newPage) => {
                setPreviewPage(_newPage);
              }}
            />
          </div>
          <div className="flex space-x-3 justify-end mt-5">
            <CancelButton onCancelHandler={() => setUploadPreview(false)} />
            <SaveButton />
          </div>
        </div>
      </div>
    </form>
  );
};

export default PreviewBusUpload;
