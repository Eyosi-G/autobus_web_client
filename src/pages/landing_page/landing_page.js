import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import io from "socket.io-client";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { fetchStops, resetStops } from "../../store/stop/actions";
import { searchBuses } from '../../store/bus/actions'

const bus = (number) =>
  L.divIcon({
    className: "bus",
    html: `
      <div><span>${number}</span></div>
    `,
  });

const unselectedStop = L.divIcon({
  className: "text-red-400",
  html: `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `,
});

const selectedEndStop = L.divIcon({
  className: "bg-amber-600 h-12 w-12 rounded-full p-2 ",
  html: `<div></div>`,
});

const selectedStartStop = L.divIcon({
  className: "bg-green-600 h-12 w-12 rounded-full p-2",
  html: `<div></div>`,
});

const icon = L.divIcon({
  className: "my_location",
  html: `<div>
          <span> 
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>  
          </span>
        </div>`,
});

let buses = {};
let startStop = null;
let endStop = null;

const LandingPage = () => {
  const dispatch = useDispatch();
  const {
    loading: stopsLoading,
    stops,
    error: stopsError,
  } = useSelector((state) => state.fetchStops);

  const {
    loading: searchLoading,
    data: searchBusesData,
    error: searchError,
  } = useSelector((state) => state.searchBus);

  const [mapLayer, setMapLayer] = useState(null);
  const [openBusDrawer, setOpenBusDrawer] = useState(false);
  const [userPosition, setUserPosition] = useState(null);
  const [map, setMap] = useState(null);

  const handleSearchBuses = () => {
    if (startStop && endStop) {
      const data = {
        start_terminal: {
          lon: startStop.coordinates[0],
          lat: startStop.coordinates[1],
          id: startStop.id,
        },
        end_terminal: {
          lon: endStop.coordinates[0],
          lat: endStop.coordinates[1],
          id: endStop.id,
        },
        buses: Object.values(buses).map((bus) => {
          return {
            lat: bus.lat,
            bus_number: bus.bus_number,
            lon: bus.lon,
            id: bus.id,
          };
        }),
      };

      dispatch(searchBuses(data))
    }
  };
  useEffect(() => {
    const socket = io("http://localhost:8080");
    socket.on("CURRENT_LOCATION_BROADCAST", (data) => {
      if (map) {
        if (!buses[data.id]) {
          const marker = L.marker(L.latLng(data.lat, data.lon), {
            icon: bus(data.bus_number),
          });

          marker.addTo(map);
          buses = { ...buses, [data.id]: { marker: marker, ...data } };
        } else {
          const marker = buses[data.id].marker;
          marker.setLatLng(L.latLng(data.lat, data.lon)).update();
          buses = { ...buses, [data.id]: { marker: marker, ...data } };
        }
      }
    });
    return () => {
      socket.close();
    };
  }, [map]);

  useEffect(() => {
    if (map) {
      if (mapLayer) map.removeLayer(mapLayer);
      const layer = L.geoJSON(stops, {
        pointToLayer: (feature, latlng) => {
          return L.marker(latlng, {
            icon: unselectedStop,
          });
        },
        onEachFeature: (feature, layer) => {
          layer.addEventListener("click", (e) => {
            if (feature.startSelected) {
              startStop = null;
              feature.startSelected = false;
              e.target.setIcon(unselectedStop);
              return;
            }

            if (feature.endSelected) {
              endStop = null;
              feature.endSelected = false;
              e.target.setIcon(unselectedStop);
              return;
            }

            if (!feature.startSelected && !startStop) {
              startStop = {
                coordinates: feature.coordinates,
                id: feature.id,
              };
              feature.startSelected = true;
              e.target.setIcon(selectedStartStop);
              handleSearchBuses();
              return;
            }

            if (!feature.endSelected && !endStop && startStop) {
              endStop = {
                coordinates: feature.coordinates,
                id: feature.id,
              };
              feature.endSelected = true;
              e.target.setIcon(selectedEndStop);
              handleSearchBuses();
              return;
            }
          });
        },
      });

      layer.addTo(map);
      setMapLayer(layer);
    }
  }, [stops, map]);

  useEffect(() => {
    if (searchBusesData.length > 0) {
      console.log(searchBusesData);
      setOpenBusDrawer(true)
    }
  }, [searchBusesData]);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.watchPosition(
  //       (position) => {
  //         if (map) {
  //           console.log(userPosition)
  //           const latlng = L.latLng(
  //             position.coords.latitude,
  //             position.coords.longitude
  //           );
  //           if (!userPosition) {
  //             const marker = L.marker(latlng, {
  //               icon,
  //             });
  //             setUserPosition(marker);
  //             marker.addTo(map);
  //           } else {
  //             userPosition.setLatLng(latlng);
  //           }
  //         }
  //       },
  //       (err) => {}
  //     );
  //   }
  // }, [map]);

  useEffect(() => {
    dispatch(fetchStops());
    return () => dispatch(resetStops());
  }, []);
  return (
    <div className="relative grid grid-cols-4 h-screen overflow-clip">
      <div
        className={`h-screen col-span-4 ${openBusDrawer && "sm:col-span-3"}`}
      >
        <MapContainer
          center={{ lat: 9.03448112252767, lng: 38.74701976776123 }}
          zoom={18}
          className="h-full w-full z-10 sm:z-50"
          whenCreated={setMap}
        >
          <TileLayer
            attribution=""
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
          />
        </MapContainer>
      </div>
      {openBusDrawer && (
        <div className="absolute bg-black bg-opacity-40 top-0 right-0 left-0 bottom-0 z-50 flex flex-col justify-end sm:col-span-1 sm:bg-white sm:z-0 sm:relative">
          <div className="bg-white h-1/2 rounded-t-lg sm:rounded-none sm:h-full ">
            <div className="flex p-2 justify-end">
              <button
                className="rounded-full border p-1"
                onClick={() => setOpenBusDrawer(false)}
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="h-full overflow-y-scroll">
              {[1, 2, 3, 4, 5, 6].map((_) => {
                return (
                  <div className="rounded-md shadow-md m-1 overflow-clip hover:cursor-pointer hover:bg-gray-50 border-l-8 border-l-gray-900">
                    <div className="flex flex-col p-1 ">
                      <div className="font-bold border h-10 w-10 rounded-full flex items-center justify-center ">
                        12
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-gray-900 font-thin">12343</div>
                        <div className="flex space-x-3 items-center  border border-gray-800 py-1 px-2 rounded-full">
                          <span>
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
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </span>
                          <span>12 min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
