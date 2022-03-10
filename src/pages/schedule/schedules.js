import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Paginate from "../../components/paginate";
const Schedules = () => {
  const { id } = useParams();
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
  const [startDate, setStartDate] = useState("June 12, 2021");
  const [endDate, setEndDate] = useState("July 12, 2021");

  const onPageChangeHandler = (newPage) => {
    setPage(newPage);
  };
  const onLimitChangeHandler = (newLimit) => {
    setLimit(newLimit);
  };

  return (
    <div>
      <div className="m-4 flex justify-end space-x-2 lowercase text-gray-600">
        <span className="capitalize">{`${startDate} - ${endDate}`}</span>
        <span>/</span>
        <span className="text-black">Schedules</span>
      </div>
      <div className="flex justify-end my-4">
        <button className="flex space-x-2 items-center px-3 py-1 border rounded-md bg-gray-600 text-white drop-shadow-md">
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
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
          <span>generate schedule</span>
        </button>
      </div>
      <table className="w-full border border-collapse">
        <thead className="bg-slate-50">
          <tr className="text-left">
            <th className="p-2">driver</th>
            <th className="p-2">ticketer</th>
            <th className="p-2">bus number</th>
            <th className="p-2">shifts</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map((id) => {
            return (
              <tr className="hover:bg-gray-100">
                <td className="border p-2">Abebe Kebede</td>
                <td className="border p-2">Tigist Assefa</td>
                <td className="border p-2">53</td>
                <td className="border p-2">morning</td>
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

export default Schedules;
