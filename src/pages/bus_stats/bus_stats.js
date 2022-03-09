import React, { useState } from "react";
import Paginate from "../../components/paginate";
import driver from "../../resources/images/driver.jpg";
const BusSats = () => {
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

  const onPageChangeHandler = (_newPage) => {
    setPage(_newPage);
  };
  const onLimitChangeHandler = (_newLimt) => {
    setLimit(_newLimt);
  };
  return (
    <div className="container p-4">
      <div className="m-4 flex justify-end space-x-2 lowercase text-gray-600">
        <span>bus stats</span>
        <span>/</span>
        <span className="text-black">list</span>
      </div>

      <div className="my-2">
        <button className="flex space-x-2 items-center px-3 py-1  rounded-md bg-gray-600 text-white">
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
          <span>upload stats</span>
        </button>
      </div>
      <table className="w-full border border-collapse">
        <thead className="bg-slate-50">
          <tr className="text-left">
            <th className="p-2">date</th>
            <th className="p-2">side number</th>
            <th className="p-2">bus number</th>
            <th className="p-2">total commmuters</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map((_) => {
            return (
              <tr>
                <td className="border p-2">11-09-2021</td>
                <td className="border p-2">12290</td>
                <td className="border p-2">56</td>
                <td className="border p-2">3360</td>
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

export default BusSats;
