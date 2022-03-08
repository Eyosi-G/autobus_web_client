import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import LoadStops from "./load_stops";

const StopsInput = ({ lat, lng, zoom, stops, addStop, removeStop }) => {
  return (
    <div className="relative h-64">
      <MapContainer
        center={{ lat: lat, lng: lng }}
        zoom={zoom}
        className="h-64"
      >
        <TileLayer
          attribution=""
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
        />
        <LoadStops stops={stops} addStop={addStop} removeStop={removeStop} />
      </MapContainer>
      <div
        className="absolute bg-white right-1 top-1 p-2 max-h-56 flex flex-col"
        style={{ zIndex: "1000" }}
      >
        <div className="flex w-full border p-2 mb-2 bg-gray-100 rounded-md">
          <span className="text-gray-800">
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
                d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <input className="outline-none ml-1 bg-gray-100" type="text" />
        </div>
        <div className="space-y-2 overflow-y-scroll">
          <div className="my-1 p-1 hover:bg-gray-100">ferensay legasion</div>
          <div className="my-1 p-1 hover:bg-gray-100">ferensay legasion</div>
        </div>
      </div>
    </div>
  );
};

export default StopsInput;
