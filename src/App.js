import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function App() {
  const [ipifyQueryResult, setIpifyQueryResult] = useState([]);

  const ipifyQueryURL = `https://geo.ipify.org/api/v2/country?apiKey=${process.env.REACT_APP_ACCESS_TOKEN_IPIFY}`;
  const ipifyAccountBalanceURL = `https://geo.ipify.org/service/account-balance?apiKey=${process.env.REACT_APP_ACCESS_TOKEN_IPIFY}`;

  function fetchData(url) {
    axios.get(url).then((res) => setIpifyQueryResult(res));
  }

  const getIpAddress = () => {
    fetchData(ipifyQueryURL);
  };

  const defaultPosition: LatLngExpression = [48.864716, 2.349]; // Paris position

  return (
    <div className="App">
      <button onClick={getIpAddress}>What is my IP</button>
      <div>{ipifyQueryResult.data?.ip}</div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "400px", margin: "auto", width: "60%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
