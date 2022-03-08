import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Layout from './pages/layout';
import reportWebVitals from './reportWebVitals';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
L.Marker.prototype.setIcon(L.icon({
  iconUrl:markerIcon,
}))

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
