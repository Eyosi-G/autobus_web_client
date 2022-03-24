import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

const SearchLocation = () => {
  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState([]);

  const map = useMap();

  const loadPlaces = async () => {
    const places = await axios.get("http://localhost:8080/api/v1/places");
    setPlaces(places.data || []);
  };

  useEffect(() => {
    loadPlaces()
  }, []);

  

  return (
    <div
      className="absolute bg-white right-1 top-1 p-2 max-h-56 flex flex-col rounded-md"
      style={{ zIndex: "2000" }}
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
        <input
          className="outline-none ml-1 bg-gray-100"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="e.g jemo"
          type="text"
        />
      </div>
      <div className="space-y-2 overflow-y-scroll">
        {places
          .filter((place) => place.name.includes(search))
          .map((place) => (
            <div
              onClick={() => {
                map.flyTo(place.location.coordinates);
              }}
              className="my-1 p-1 hover:bg-gray-100 hover:cursor-pointer"
            >
              {place.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchLocation;
