import React, { useEffect, useRef, useState } from "react";

import CancelButton from "../../components/cancel_button";
import SaveButton from "../../components/save_button";
import axios from "axios";
import BackButton from "../../components/back_button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createBus,
  fetchSingleBus,
  resetCreateBus,
  resetFetchSingleBus,
} from "../../store/bus/actions";
import Dialog from "../../components/dialog";
import Modal from "../../components/modal";
import Spinner from "../../components/spinner";
import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import SearchLocation from "../../components/search_location";
import MapInputSigns from "../../components/map_input_signs";
import { fetchStops, resetStops } from "../../store/stop/actions";

const unselectedStopIcon = L.divIcon({
  className: "text-red-400",
  html: `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    `,
});

const selectedForwardStopIcon = L.divIcon({
  className: "text-green-400",
  html: `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    `,
});

const selectedBackwardStopIcon = L.divIcon({
  className: "text-yellow-400",
  html: `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    `,
});

const AddEditBus = ({ edit = false }) => {
  const [forwardStops, setForwardStops] = useState({});
  const [backwardStops, setBackwardStops] = useState({});
  const [forwardLayer, setForwardLayer] = useState(null);
  const [backwardLayer, setBackwardLayer] = useState(null);

  const [forwardRouteLayer, setForwardRouteLayer] = useState(null);
  const [backwardRouteLayer, setBackwardRouteLayer] = useState(null);

  // const [stops, setStops] = useState([]);

  const [forwardMap, setForwadMap] = useState();
  const [backwardMap, setBackwardMap] = useState();

  const [wayPoints, setWayPoints] = useState([]);
  const [busNumber, setBusNumber] = useState(0);
  const dispatch = useDispatch();

  const {
    loading: createBusLoading,
    success: createBusSuccess,
    error: createBusError,
  } = useSelector((state) => state.createBus);

  const {
    loading: singleBusLoading,
    data: singleBusData,
    error: singleBusError,
  } = useSelector((state) => state.singleBus);

  const {
    loading: stopsLoading,
    stops,
    error: stopsError,
  } = useSelector((state) => state.fetchStops);

  const addToForwardStop = (id, lat, lng) => {
    setForwardStops((stops) => ({ ...stops, [id]: { lat, lng } }));
  };

  const removeForwardStop = (id) => {
    setForwardStops((stops) => {
      let s = { ...stops };
      delete s[`${id}`];
      return s;
    });
  };

  const addToBackwardStop = (id, lat, lng) => {
    setBackwardStops((stops) => ({ ...stops, [id]: { lat, lng } }));
  };

  const removeBackwardStop = (id) => {
    setBackwardStops((stops) => {
      let s = { ...stops };
      delete s[`${id}`];
      return s;
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      bus_number: busNumber,
      forward_stops: Object.keys(forwardStops),
      backward_stops: Object.keys(backwardStops),
      waypoint_places: wayPoints,
    };
    dispatch(createBus(data));
    setBusNumber(0);
    setForwardStops([]);
    setBackwardStops([]);
    setWayPoints([]);
  };

  const closeDialogHandler = () => {
    if (createBusSuccess || createBusError) dispatch(resetCreateBus());
    if (singleBusData || singleBusError) dispatch(resetFetchSingleBus());
  };
  const successDialogMessage = () => {
    if (createBusSuccess) return "bus created successfully !";
  };
  const errorDialogMessage = () => {
    if (createBusError) return "bus creation failed!";
    if (singleBusError) return "failed fetching bus info!";
  };

  const params = useParams();

  useEffect(async () => {
    try {
      if (forwardRouteLayer) forwardMap.removeLayer(forwardRouteLayer);
      const response = await axios.get(
        `http://router.project-osrm.org/route/v1/driving/${Object.values(
          forwardStops
        )
          .map((forward) => `${forward.lng},${forward.lat}`)
          .join(";")}?overview=full&geometries=geojson`
      );
      if (response.status != 200) return;
      const layer = L.geoJSON(response.data.routes[0].geometry);
      setForwardRouteLayer(layer);
      layer.addTo(forwardMap);
    } catch (error) {}
  }, [forwardStops]);

  useEffect(async () => {
    try {
      if (backwardRouteLayer) backwardMap.removeLayer(backwardRouteLayer);
      const response = await axios.get(
        `http://router.project-osrm.org/route/v1/driving/${Object.values(
          backwardStops
        )
          .map((backward) => `${backward.lng},${backward.lat}`)
          .join(";")}?overview=full&geometries=geojson`
      );
      if (response.status != 200) return;
      const layer = L.geoJSON(response.data.routes[0].geometry);
      setBackwardRouteLayer(layer);
      layer.addTo(backwardMap);
    } catch (e) {}
  }, [backwardStops]);

  useEffect(() => {
    if (edit) {
      const { id } = params;
      dispatch(fetchSingleBus(id));
    }
    dispatch(fetchStops());
    return () => {
      dispatch(resetStops());
    };
  }, []);

  useEffect(() => {
    if (forwardMap) {
      if (forwardLayer) forwardMap.removeLayer(forwardLayer);
      const layer = L.geoJSON(stops, {
        pointToLayer: function (feature, latlng) {
          if (backwardStops[feature.id]) {
            return L.marker(latlng, {
              icon: selectedBackwardStopIcon,
            });
          }
          if (forwardStops[feature.id]) {
            return L.marker(latlng, {
              icon: selectedForwardStopIcon,
            });
          }
          return L.marker(latlng, {
            icon: unselectedStopIcon,
          });
        },
        onEachFeature: function (feature, layer) {
          layer.addEventListener("click", (e) => {
            if (backwardStops[feature.id]) {
              return;
            }
            if (!feature.isSelected) {
              console.log(feature);
              addToForwardStop(
                feature.id,
                feature.coordinates[1],
                feature.coordinates[0]
              );
              e.target.setIcon(selectedForwardStopIcon);
            } else {
              removeForwardStop(feature.id);
              e.target.setIcon(unselectedStopIcon);
            }
            feature.isSelected = !feature.isSelected;
          });
        },
      });

      layer.addTo(forwardMap);
      setForwardLayer(layer);
    }
  }, [stops, forwardMap, backwardStops]);

  useEffect(() => {
    if (backwardMap) {
      if (backwardLayer) backwardMap.removeLayer(backwardLayer);
      const layer = L.geoJSON(stops, {
        pointToLayer: function (feature, latlng) {
          if (forwardStops[feature.id]) {
            return L.marker(latlng, {
              icon: selectedForwardStopIcon,
            });
          }
          if (backwardStops[feature.id]) {
            return L.marker(latlng, {
              icon: selectedBackwardStopIcon,
            });
          }
          return L.marker(latlng, {
            icon: unselectedStopIcon,
          });
        },
        onEachFeature: function (feature, layer) {
          if (forwardStops[feature.id]) return;
          layer.addEventListener("click", (e) => {
            if (forwardStops[feature.id]) {
              return;
            }
            if (!feature.isSelected) {
              addToBackwardStop(
                feature.id,
                feature.coordinates[1],
                feature.coordinates[0]
              );
              e.target.setIcon(selectedBackwardStopIcon);
            } else {
              removeBackwardStop(feature.id);
              e.target.setIcon(unselectedStopIcon);
            }
            feature.isSelected = !feature.isSelected;
          });
        },
      });
      setBackwardLayer(layer);
      layer.addTo(backwardMap);
    }
  }, [stops, backwardMap, forwardStops]);

  useEffect(() => {
    if (edit && singleBusData) {
      const { bus_number, forward_stops, backward_stops, waypoint_places } =
        singleBusData;


      const getStops = (stops) => {
        let _stops = {};
        for (let stop of stops) {
          _stops[stop.id] = {
            lat: stop.coordinates[1],
            lng: stop.coordinates[0],
          };
        }
        return _stops;
      };
      setBusNumber(bus_number);
      setForwardStops(getStops(forward_stops));
      setBackwardStops(getStops(backward_stops));
      setWayPoints(waypoint_places);
    }
  }, [singleBusData]);

  return (
    <div>
      <Modal open={createBusLoading || singleBusLoading}>
        <div
          className="absolute h-screen w-screen bg-black bg-opacity-40 flex justify-center items-center "
          style={{ zIndex: 3000 }}
        >
          <Spinner color="white" />
        </div>
      </Modal>

      <Modal open={createBusError || singleBusError}>
        <Dialog
          severity="failure"
          message={errorDialogMessage()}
          close={() => closeDialogHandler()}
        />
      </Modal>
      <Modal open={createBusSuccess}>
        <Dialog
          severity="success"
          message={successDialogMessage()}
          close={() => closeDialogHandler()}
        />
      </Modal>
      <div className="flex justify-end my-2">
        <BackButton />
      </div>
      <div className="m-4 flex capitaliz font-semibold">Register New Bus</div>
      <form onSubmit={submitHandler}>
        <div className="m-4 space-y-2 bg-white p-3 font-normal capitalize">
          <div className="flex flex-col">
            <label>bus number</label>
            <input
              className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
              type="number"
              placeholder="e.g 12"
              onChange={(e) => setBusNumber(e.target.value)}
              value={busNumber}
            />
          </div>
          <div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-100 rounded-full p-2 flex items-center space-x-2"
                onClick={() => {
                  setWayPoints([...wayPoints, ""]);
                  console.log("here");
                }}
              >
                <span className="text-gray-500">
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
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <span>add waypoints</span>
              </button>
            </div>

            {wayPoints.map((wayPoint, index) => {
              return (
                <div className="flex flex-col ">
                  <label>waypoint - [{index + 1}]</label>
                  <div className="flex flex-grow items-center space-x-2">
                    <input
                      className="border w-full p-2 rounded-md text-gray-600 bg-gray-50"
                      type="text"
                      placeholder="e.g legehar"
                      value={wayPoints[index]}
                      onChange={(e) => {
                        const _wayPoints = [...wayPoints];
                        _wayPoints[index] = e.target.value;
                        setWayPoints(_wayPoints);
                      }}
                    />
                    <button
                      className="bg-gray-100 rounded-full p-1"
                      onClick={() => {
                        const _wayPoints = [...wayPoints];
                        _wayPoints.splice(index, 1);
                        setWayPoints(_wayPoints);
                      }}
                    >
                      <span className="text-gray-500">
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
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <MapInputSigns />
          <div className="flex flex-col">
            <label>forward stops</label>
            <div className="relative h-64">
              <MapContainer
                center={{ lat: 9.03448112252767, lng: 38.74701976776123 }}
                zoom={18}
                className="h-64"
                whenCreated={setForwadMap}
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
          <div className="flex flex-col">
            <label>backward stops</label>
            <div className="relative h-64">
              <MapContainer
                center={{ lat: 9.03448112252767, lng: 38.74701976776123 }}
                zoom={18}
                className="h-64"
                whenCreated={setBackwardMap}
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

          <div className="flex space-x-3 justify-end mt-5">
            <CancelButton />
            <SaveButton />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEditBus;
