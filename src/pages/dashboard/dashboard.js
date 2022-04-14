import React, { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import SearchLocation from "../../components/search_location";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/spinner";
import { fetchDashBoard } from "../../store/dashboard/actions";
ChartJS.defaults.backgroundColor = [
  "#c44368",
  "#1e648f",
  "#04c908",
  "#3ee0a8",
  "#04c3be",
  "#d38e81",
  "#93d976",
];
ChartJS.register(...registerables);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(fetchDashBoard());
  }, []);
  return (
    <div className="p-4">
      {loading && (
        <div className="flex items-center justify-center mt-40 ">
          <Spinner />
        </div>
      )}
      {data && (
        <div>
          <div className="grid grid-cols-3 gap-x-2">
            <div className="rounded-lg drop-shadow-sm bg-orange-400 overflow-hidden">
              <div className="font-semibold text-lg p-2 tracking-wider">
                {data.drivers}
              </div>
              <div className="p-2 flex justify-between items-center">
                <span className="capitalize">total drivers</span>
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="rounded-lg drop-shadow-sm bg-green-300 overflow-hidden ">
              <div className="font-semibold text-lg p-2 tracking-wider">
                {data.ticketers}
              </div>
              <div className="p-2 flex justify-between items-center">
                <span className="capitalize">total ticketers</span>
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-8 space-x-2">
            <div className="h-80" style={{ width: "100%" }}>
              <Bar
                data={{
                  labels: [
                    "Monday",
                    "Tuesday",
                    "Wedensay",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  datasets: [
                    {
                      label: "morning",
                      backgroundColor: "#ABAAAB",
                      data: data.commuters.map((commuter) => commuter.morning),
                    },
                    {
                      label: "afternoon",
                      backgroundColor: "#53586E",
                      data: data.commuters.map(
                        (commuter) => commuter.afternoon
                      ),
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
