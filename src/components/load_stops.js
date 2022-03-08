import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const LoadStops = ({ stops, addStop, removeStop }) => {
  const map = useMap();
  useEffect(() => {
    const unselectedStopIcon = L.divIcon({
      className: "rounded-full bg-red-400",
    });

    const selectedStopIcon = L.divIcon({
      className: "rounded-full bg-green-400",
    });

    L.geoJSON(stops, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
          icon: unselectedStopIcon,
        });
      },
      onEachFeature: function (feature, layer) {
        layer.addEventListener("click", (e) => {
          if (!feature.properties.isSelected) {
            addStop(feature.properties.id);
            e.target.setIcon(selectedStopIcon);
          } else {
            removeStop(feature.properties.id);
            e.target.setIcon(unselectedStopIcon);
          }
          feature.properties.isSelected = !feature.properties.isSelected;
        });
      },
    }).addTo(map);
  }, []);
  return null;
};

export default LoadStops;
