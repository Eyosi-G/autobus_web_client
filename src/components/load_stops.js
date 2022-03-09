import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const LoadStops = ({ stops, addStop, removeStop }) => {
  const map = useMap();
  useEffect(() => {
    const unselectedStopIcon = L.divIcon({
      className: "text-red-400",
      html: `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `,
    });

    const selectedStopIcon = L.divIcon({
      className: "text-green-400",
      html: `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `,
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
