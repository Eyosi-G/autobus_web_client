import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/modal";
import Paginate from "../../components/paginate";
import AddEditTimeFrame from "./add_edit_timeframe";
const Timeframes = () => {
  const [products, setProducts] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 5 },
    { id: 9 },
  ]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const [open, setOpen] = useState(false);

  const onPageChangeHandler = (newPage) => {
    setPage(newPage);
  };
  const onLimitChangeHandler = (newLimit) => {
    setLimit(newLimit);
  };

  return (
    <div className="container p-4">
      <Modal open={open}>
        <div className="absolute h-screen w-screen bg-black bg-opacity-60 flex justify-center items-center z-10">
          <AddEditTimeFrame setOpen={setOpen} />
        </div>
      </Modal>
      <div className="m-4 flex justify-end space-x-2 lowercase text-gray-600">
        <span>TimeFrames</span>
        <span>/</span>
        <span className="text-black">list</span>
      </div>
      <div className="my-2">
        <button
          onClick={() => setOpen(true)}
          className="flex space-x-2 items-center px-3 py-1  rounded-md bg-gray-600 text-white"
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
          <span>new timeframe</span>
        </button>
      </div>
      <table className="w-full border border-collapse">
        <thead className="bg-slate-50">
          <tr className="text-left">
            <th className="p-2">date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map((id) => {
            return (
              <tr className="hover:bg-gray-100">
                <td className="border p-2">June 1, 2010 - July 1, 2010</td>
                <td className="border p-2">
                  <div className="flex space-x-2">
                    <button>
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
                    <button className="text-red-600">
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
                    <Link to={`/admin/timeframes/${id}/schedules`}>
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
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </Link>
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
          total={products.length}
          limit={limit}
          onPageChange={onPageChangeHandler}
          onLimitChange={onLimitChangeHandler}
        />
      </div>
    </div>
  );
};

export default Timeframes;
