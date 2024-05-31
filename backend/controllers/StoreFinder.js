const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
//gets called from viewController
const getPlaces = async (url) =>{

  console.log("in getPlaces");
  //This object defines the configuration for making a GET request to the Google Places API's Text Search 
  //endpoint (https://maps.googleapis.com/maps/api/place/textsearch/json).
  const config = url;   
  //console.log(url);
  //HTTP Request: The code uses axios to make an HTTP GET request to the Google Places API with 
  //the specified configuration (config). The response is stored in the response variable.
  try {
    //gets response of all places info
    const response = await axios.get(url);

      // debug the response from axios
      //console.log(response);

    const places = response.data.results;
    const placeDetails = [];
    const names = [];
    const websites = [];
    //The code extracts the places array from the response data. It then initializes empty arrays 
    //placeDetails and websites to store additional place details and website URLs, respectively.
    for (let i = 0; i < 10; i++) {
      const placeConfig = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/details/json',
        params: {
          place_id: places[i].place_id,
          key: process.env.GOOGLE_API_KEY 
        }
      };

      const response = await axios(placeConfig); //get request for specific place
      placeDetails.push(response.data.result);
      names.push(response.data.result.name);
      //console.log(response.data.result.name);
    }
    //If a place contains a website it will added to an array and returned to viewController.js
    for (let e = 0; e < 10; e++) {
      if (placeDetails[e].website != null) {
        websites.push(placeDetails[e].website); 
        if (websites){
          //console.log(placeDetails[e].website);
        }
      }
    }
    //console.log("websitessss:" + websites);
    //console.log("names:" + names);
    //returns website urls & names
    return [websites, names];
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getPlaces }

