import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import SearchLocation from "../../components/search_location";

const Dashboard = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-x-2">
        <div className="rounded-lg drop-shadow-sm bg-orange-400 overflow-hidden">
          <div className="font-semibold text-lg p-2 tracking-wider">
            199
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
            201
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
      <div>
        <div className="relative h-96  w-full mt-7 rounded-lg overflow-clip">
          <MapContainer
            center={{ lat: 9.03448112252767, lng: 38.74701976776123 }}
            zoom={18}
            className="h-full w-full"
          >
            <TileLayer
              attribution=""
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              subdomains="abcd"
            />

            <SearchLocation />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
