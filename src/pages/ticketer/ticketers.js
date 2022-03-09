import React, { useState } from "react";
import Paginate from "../../components/paginate";
import driver from "../../resources/images/driver.jpg";
const Ticketers = () => {
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
          <span>Ticketers</span>
          <span>/</span>
          <span className="text-black">list</span>
      </div>
      <table className="w-full border border-collapse">
        <thead className="bg-slate-50">
          <tr className="text-left">
            <th></th>
            <th className="p-2">first name</th>
            <th className="p-2">last name</th>
            <th className="p-2">phone number</th>
            <th className="p-2">email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map((_) => {
            return (
              <tr>
                <td className="border p-2">
                  <div className="flex justify-center">
                    <img
                      src={driver}
                      className="h-12 w-12 object-cover rounded-full"
                    />
                  </div>
                </td>
                <td className="border p-2">abebe</td>
                <td className="border p-2">kebede</td>
                <td className="border p-2">0911139074</td>
                <td className="border p-2">abebe@gmail.com</td>
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

export default Ticketers;
