import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import LoadStops from "./load_stops";
import SearchLocation from "./search_location";

const StopsInput = ({ lat, lng, zoom, addStop, removeStop }) => {
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
        <LoadStops  addStop={addStop} removeStop={removeStop} />
        <SearchLocation/>
      </MapContainer>
    </div>
  );
};

export default StopsInput;
