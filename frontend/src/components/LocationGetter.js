import { useState } from 'react';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyBxONdCYn7fhUT-0aifzRBWkHZld9NRbDM");
Geocode.setLanguage("en");
Geocode.setRegion("ca");

//function that gets the users location and returns their latitude, longitude, addy
const LocationGetter = () => {

    // Set default Toronto coordinates if unable to get location.
    let latitude = 43.6479;
    let longitude = -79.3808;
    let addy = "Toronto Canada";

    console.log("Location Getter - Requesting Location");
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
        console.log("Location Getter - Geolocation gotten Location");
      // Get the current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          console.log(latitude);
          console.log(longitude);
          Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
            (response) => {
              let city, state, country;
              for (let i = 0; i < response.results[0].address_components.length; i++) {
                for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                  switch (response.results[0].address_components[i].types[j]) {
                    case "locality":
                      city = response.results[0].address_components[i].long_name;

                      break;
                    case "administrative_area_level_1":
                      state = response.results[0].address_components[i].long_name;

                      break;
                    case "country":

                      country = response.results[0].address_components[i].long_name;

                      break;
                    default: //comes through here like 40 times because there is a big response
                      //console.log('1');
                      break;
                  }

                }
              }
                  console.log('Location Getter - City:', city);
                  console.log('Location Getter - State:', state);
                  console.log('Location Getter - Country:', country);
                  addy = "Location Getter - " + city + ", " + state + " " + country;
            },
            (error) => {
                console.log("Location Getter - Error setting");
              console.error(error);
            }
          );
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
        console.log('Location Getter - Geolocation is not supported by this browser.');
    }
    return { latitude, longitude, addy };
};

export default LocationGetter;
