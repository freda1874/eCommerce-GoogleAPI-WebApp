// import React from 'react';
// import GoogleMap from 'react-google-maps-loader';

// const MapComponent = ({ isScriptLoadSucceed, isScriptLoadError, latitude, longitude }) => {
//   if (isScriptLoadError) {
//     return <div>Map cannot be loaded.</div>;
//   }

//   if (isScriptLoadSucceed) {
//     return (
//       <div style={{ height: '400px' }}>
//         <google-map
//           googleMaps={window.google.maps}
//           center={{ lat: latitude, lng: longitude }}
//           zoom={13}
//         />
//       </div>
//     );
//   }

//   return <div>Loading...</div>;
// };

// export default MapComponent;


import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
// import "./App.css";

const MapComponent = ({}) => {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyBxONdCYn7fhUT-0aifzRBWkHZld9NRbDM",
    });
    const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
  
    return (
      <div className="App">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={10}
          >
            <Marker position={{ lat: 18.52043, lng: 73.856743 }} />
          </GoogleMap>
        )}
      </div>
    );
  };

export default MapComponent;
