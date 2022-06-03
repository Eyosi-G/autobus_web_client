import React, { useEffect } from "react";
import SearchLocation from "../../components/search_location";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/spinner";
import { fetchDashBoard } from "../../store/dashboard/actions";
import { convertTo12 } from "../../utils/time";
ChartJS.register(...registerables);

const labels = [];
for (let now = 1; now < 25; now++) {
  const _now = now;
  let _next = (_now + 1) % 24;
  _next = _next == 0 ? 24 : _next;
  let label = `${convertTo12(_now)}-${convertTo12(_next)}`;
  labels.push(label);
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.dashboard);
  useEffect(() => {
    console.log("from dashboard");
    console.log(data);
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
          {/* <h1 className="mt-5 font-semibold text-2xl capitalize">
            daily bus data
          </h1> */}
          <div className="space-x-2 mt-5">
            {data.routees.map((route) => (
              <button
                onClick={() => dispatch(fetchDashBoard(route, data.day))}
                className={`px-3 py-1 rounded-md ${
                  data.route == route
                    ? "bg-gray-50 border border-gray-300"
                    : "bg-gray-400"
                }`}
              >
                {route}
              </button>
            ))}
          </div>
          <div className="space-x-2 mt-2">
            {days.map((day) => (
              <button
                onClick={() => dispatch(fetchDashBoard(data.route, day))}
                className={`px-3 py-1 rounded-md ${
                  data.day == day
                    ? "bg-gray-50 border border-gray-300"
                    : "bg-gray-400"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="flex items-center mt-8 space-x-2">
            <div className="h-80" style={{ width: "100%" }}>
              <Line
                data={{
                  labels: labels,
                  datasets: [
                    {
                      lineTension: 0.3,
                      backgroundColor: "#ABAAAB",
                      data: data.commuters && data.commuters.length > 0
                        ? labels.map((label, index) => {

                          for(let i = 0; i < data.commuters.length; i++){
                            let now = data.commuters[i].startTime;
                            let next = (now + 1) % 24;
                            next = next == 0 ? 24 : next;
                            let time = `${convertTo12(now)}-${convertTo12(next)}`
                            if(time == label){
                              return data.commuters[i].commuters;
                            }
                          }
                        })
                        : [],
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
