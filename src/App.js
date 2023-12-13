// import logo from './logo.svg';
import "./App.css";
import ApiCall from "./ApiCall";
import Frame from "./Frame";
import MapIntegrate from "./MapIntegrate";
import { withGoogleMap, GoogleMap, OverlayView } from "google-map-react";
import GoogleMapReact from "google-map-react";
import MapTrial from "./MapTrial";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Favourites from "./Favourites";

// const WeatherMap = () => {
//   const API_KEY = 'XjeyuBDEfKOkp4TAhvZgjuVzbnsxbeLE';
//   const DATA_FIELD = 'precipitationIntensity';
//   const TIMESTAMP = new Date().toISOString();

//   const MapTile = ({ lat, lng, zoom }) => {
//     const calculateTileCoordinates = (lat, lng, zoom) => {
//       const scale = Math.pow(2, zoom);
//       const worldCoordinate = latLngToWorld(lat, lng);
//       return {
//         x: Math.floor(worldCoordinate.x * scale),
//         y: Math.floor(worldCoordinate.y * scale),
//       };
//     };

//     const latLngToWorld = (lat, lng) => {
//       const siny = Math.sin((lat * Math.PI) / 180);
//       return {
//         x: (lng + 180) / 360,
//         y: 0.5 - (0.5 * Math.log((1 + siny) / (1 - siny))) / (2 * Math.PI),
//       };
//     };

//     const { x, y } = calculateTileCoordinates(lat, lng, zoom);

//     return (
//       <img
//         src={`https://api.tomorrow.io/v4/map/tile/7/${x}/${y}/${DATA_FIELD}/${TIMESTAMP}.png?apikey=${API_KEY}`}
//         alt="Weather Map"
//         style={{ width: '256px', height: '256px' }}
//       />
//     );
//   };

//   return (
//     <div style={{ height: '400px', width: '100%' }}>
//       <GoogleMapReact
//         defaultCenter={{ lat: 42.355438, lng: -71.059914 }}
//         defaultZoom={7}
//         bootstrapURLKeys={{ key: API_KEY }}
//       >
//         {(props) => <MapTile {...props} />}
//       </GoogleMapReact>
//     </div>
//   );
// };

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<div><Frame/><ApiCall /></div>}></Route>
          <Route exact path="/favourites" element={<div><Frame/><Favourites /></div>}></Route>
        </Routes>
      </div>
    </Router>

    // <div>
    // <Frame/>
    // <ApiCall />
    // {/* <WeatherMap/> */}
    // {/* <MapTrial/> */}
    // </div>
  );
}

export default App;
