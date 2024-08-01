const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
//gets called from viewController
const getPlaces = async (url) => {

  console.log("in getPlaces");
  const config = url;
  try {
    const response = await axios.get(url);

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
        if (websites) {
          //console.log(placeDetails[e].website);
        }
      }
    }
    return [websites, names];
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getPlaces }

