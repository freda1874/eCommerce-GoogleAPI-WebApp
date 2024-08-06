import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import LocationGetter from "./LocationGetter";
import MapComponent from "./Map";
//function to get the users location & prints it
//may have to change api key
Geocode.setApiKey("AIzaSyADrC9Ik2sZi9ZMha8CvN9aN2kHfzKUsV4");
Geocode.setLanguage("en");
Geocode.setRegion("ca");




const LocationEnabler = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    addy: "",
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { latitude, longitude, addy } = await LocationGetter();
        setLocation({ latitude, longitude, addy });
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };

    fetchLocation();
  }, []);

  const { latitude, longitude, addy } = location;
  const map_src = `https://www.google.com/maps/embed/v1/view?center=${latitude},${longitude}&zoom=12&key=AIzaSyBxONdCYn7fhUT-0aifzRBWkHZld9NRbDM`;


  return (
    <div className="location_enabler">
      <h3>Your Location:</h3>
      {latitude && longitude ? ( //if it has both of them it will show the user their longitude & latitude
        <p>
          Your Location:
          <br />
          Latitude: {latitude}, Longitude: {longitude}
          <br />
          Searching from: {addy}
        </p>
      ) : (
        //if it doesn't it will just tell the user that it's loading
        <p>Please Enabale Geolocation permissions in your browser.</p>
      )}
      <MapComponent longitude={longitude} latitude={latitude} />
      <iframe
        title="Google Maps Location View"
        width="200"
        height="200"
        frameBorder="0"
        style={{ borderRadius: "10px", border: "1px black solid" }}
        // style="border:0"
        src={map_src}
        allowFullScreen
      ></iframe>
    </div>
  );
};

// Memo-ize the Component to only have it re-render when its state has chaned
// this will save hundreds of unneccessary API calls
export default React.memo(LocationEnabler);
