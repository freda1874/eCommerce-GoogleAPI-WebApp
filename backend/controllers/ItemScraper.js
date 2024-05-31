const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const getItems = async (lon, lat, radius, storeName) =>{
    //This object defines the configuration for making a GET request to the Google Places API's Text Search 
    //endpoint (https://maps.googleapis.com/maps/api/place/textsearch/json).
    const config = {
      method: 'get',
      url: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
      params: {
        query: storeName, // Search query
        location: lon + ',' + lat, // Replace with the latitude and longitude of the center point
        radius: radius, // Search radius in meters
        key: process.env.GOOGLE_API_KEY 
      }
    };
  
    //HTTP Request: The code uses axios to make an HTTP GET request to the Google Places API with 
    //the specified configuration (config). The response is stored in the response variable.
    try {
      //req
      const response = await axios(config);
      //res
      const places = response.data.results;
      const placeDetails = [];
      const websites = [];
      //The code extracts the places array from the response data. It then initializes empty arrays 
      //placeDetails and websites to store additional place details and website URLs, respectively.
      for (let i = 0; i < places.length; i++) {
        const placeConfig = {
          method: 'get',
          url: 'https://maps.googleapis.com/maps/api/place/details/json',
          params: {
            place_id: places[i].place_id,
            fields: 'name,website',
            key: process.env.GOOGLE_API_KEY 
          }
        };
  
        const response = await axios(placeConfig);
        placeDetails.push(response.data.result);
        console.log(response.data.result); //prints out the result
      }
      //If a place contains a website it will added to an array and returned to viewController.js
      for (let i = 0; i < places.length; i++) {
        if (placeDetails[i].website != null) {
          websites.push(placeDetails[i].website);
          if (websites){
            return websites
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  module.exports = { getItems }