var https = require('follow-redirects').https;
const dotenv = require('dotenv');
dotenv.config();

const GOOGLE_apikey = process.env.GOOGLE_API_KEY;

/**
 * @brief This function tests some of the internal 'places' functions
 *
 * @param None.
 *
 * @return Nothing.
 */
function placesTest() {
	//placeSearch('33.611', '-112.0639759', 'clothing_store', '1000');
	//placeSearch('33.611', '-112.0639759', 'department_store', '1000');
	//placeSearch('33.611', '-112.0639759', 'pants', '10000');
	//getCoordinates('85029');
	//placeDetails('ChIJo63O5OVtK4cRY7EoA3RoC-k');
	//getPlaceDetails('ChIJt-dtqOxtK4cRJ_F-fDxO_lY');

	//getStores('33.611', '-112.0639759');

	//getPlace("lululemon", '33.611', '-112.0639759', 10000 );
	
	//getPlace("lululemon", '33.611', '-112.0639759', 10000 );
	getPlace("pants", '33.611', '-112.0639759', 10000 );

	//getPlace("temu", '33.611', '-112.0639759', 10000 );
	
}

// **************************************************************************


// text search for places with item...



function getPlace(name, latitude, longitude, radius) {
	console.log(" *** getPlace *** ")

	// pth = new String('/maps/api/place/nearbysearch/json?keyword=pants&location=33.611,-112.0639759&radius=40000&type=store&key=' + GOOGLE_apikey);
	
	// const request = https.request({
	// 	host: 'maps.googleapis.com',
	// 	path: encodeURI(pth), 
	// 	method: 'GET'}, 

	// 	).end();
	
	const pth = new String('/maps/api/place/textsearch/json?query=' + name + '&location=' + latitude + ',' + longitude + 'radius=' + radius + 'type=store&key=' + GOOGLE_apikey);
	//const pth = new String('/maps/api/place/textsearch/json?query=' + name + '&key=' + GOOGLE_apikey);
	//console.log(pth);
	//console.log(encodeURI(pth));

	const request = https.request({
		host: 'maps.googleapis.com',
		path: encodeURI(pth), 
		method: 'GET'}, 
		(response) => { 
		
			let data = ''; 
			response.on('data', (chunk) => { 
			data = data + chunk.toString(); 
			}); 
	
			response.on('end', () => { 
				const body = JSON.parse(data); 
				//console.log(body); 

				console.log(body['results'][0]);
				//console.log(body['results'][1]);
				//console.log(body['results'][2]);


				// if(body['results'].length){
				// 	console.log(body['results'][0]);
				// } else {
				// 	console.log("nothing");
				// }

			}); 
	}) 
	
	request.on('error', (error) => { 
		console.log('An error', error); 
	}); 
  
	request.end()  

	// do image search of each item in results 'name'

}

// ****************************************************************

/**
 * @brief Get stores near a location.
 * 
 * @param latitude The latitude of the location.
 * @param longitude The longitude of the location.
 */
function getStores(latitude, longitude) {
	
	var radius = '5000';
	var placeType = 'clothing ';

	//path: '/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radius + '&type=' + placeType + '&key=' + GOOGLE_apikey,

	// https.request({
	// 	host: 'maps.googleapis.com',
	// 	path: '/maps/api/place/details/json?place_id=' + place_id + '&key=' + GOOGLE_apikey,
    //     method: 'GET'},
    //     PlaceDetailsResponse).end();

	//https://maps.googleapis.com/maps/api/place/textsearch/output?parameters

	console.log('***getStores***');

	//console.log(GOOGLE_apikey);

	// pth = new String('/maps/api/place/textsearch/json?query=clothing stores in phoenix&key=' + GOOGLE_apikey);
	
	// https.request({
	// 	host: 'maps.googleapis.com',
	// 	path: encodeURI(pth), 
	// 	method: 'GET'}, 
	// 	getStoresResponse).end();

// 	console.log("*******************************************************************************");

// 	pth = new String('/maps/api/place/nearbysearch/json?keyword=pants&location=33.611,-112.0639759&radius=40000&type=store&key=' + GOOGLE_apikey);
	
// 	https.request({
// 		host: 'maps.googleapis.com',
// 		path: encodeURI(pth), 
// 		method: 'GET'}, 
// 		getStoresResponse).end();
// }


const axios = require('axios')
//const username = 'myusername';
//const url = `https://api.github.com/users/${username}/repos`;

const url = 'https://www.allsaints.com';

axios.get(url)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

}

	// https.request({
	// 	host: 'maps.googleapis.com',
	// 	path: '/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radius + '&type=' + placeType + '&key=' + GOOGLE_apikey,
	// 	//path: '/maps/api/place/testsearch/json?query=clothing stores in Phoenix, AZ&key=' + GOOGLE_apikey,
	// 	method: 'GET'},
	// 	getStoresResponse).end();

/**
 * @brief This function handles the response from a GET request to the Google Maps Places API.
 *
 * This function parses the response data to retrieve information about nearby places. 
 * If the request is successful, it logs the name, place ID, rating, and vicinity of each place to the console. If there is an error, it logs the error to the console.
 *
 * This function then calls getPlaceDetails to get the details of each store
 * 
 * @param response The response object from the GET request.
 *
 * @return Nothing.
 */
function getStoresResponse(response) {
	var p;
	var data = "";
	var sdata = "";
	var PD = new placeDetails();

	response.on('data', function(chunk) {
		data += chunk;
	});

	response.on('end', function() {

        sdata = JSON.parse(data);

		if (sdata.status === 'OK') {
			console.log('Status: ' + sdata.status);
			console.log('Results: ' + sdata.results.length);

			console.log(sdata.results);


			 for (p = 0; p < sdata.results.length; p++) {
			 	PD.places.push(sdata.results[p]);
			 }
			 for (r = 0; r < sdata.results.length; r++) {
			 	console.log('---RESULTS*-----------------------------------');
			 	console.log(PD.places[r]);
			 	console.log('---PARSED-------------------------------------');
			 	console.log(PD.places[r].name);
			 	console.log('Place ID (for Place Detail search on Google):' + PD.places[r].place_id);
			 	//console.log('Rating: ' + PD.places[r].rating);
			 	//console.log('Vicinity: ' + PD.places[r].vicinity);

			 	getPlaceDetails( PD.places[r].place_id);

			 }
		} else {
			console.log(sdata.status);
		}
	});
}

/**
 * @brief This function initializes an empty array of places.
 *
 * This function creates a new object with an empty array of places.
 *
 * @param None.
 *
 * @return Nothing.
 */
var placeDetails = function() {
	this.places = [];
}

/**
 * @brief This function retrieves the details of a specified place using the unique Google 'place_id' GUID.
 *
 * This function logs the `placeDetails` object to the console and sends a GET request to the Google Maps Places API to retrieve the details of the specified place. 
 * The API key is passed as a parameter in the URL. If the request is successful, it calls the `PlaceResponse` function. 
 *
 * @param place_id The ID of the place for which to retrieve details.
 *
 * @return Nothing.
 * 
 *  Returned JSON Dataset:
 * 
	// {
	// html_attributions: [],
	// result: {
	// 	address_components: [
	// 	[Object], [Object],
	// 	[Object], [Object],
	// 	[Object], [Object],
	// 	[Object], [Object]
	// 	],
	// 	adr_address: '<span class="street-address">11111 N 7th St</span>, <span class="locality">Phoenix</span>, <span class="region">AZ</span> <span class="postal-code">85020</span>, <span class="country-name">USA</span>',
	// 	business_status: 'OPERATIONAL',
	// 	editorial_summary: {
	// 	language: 'en',
	// 	overview: 'Sprawling all-suite resort offering a water park, a spa & an 18-hole golf course, plus dining.'
	// 	},
	// 	formatted_address: '11111 N 7th St, Phoenix, AZ 85020, USA',
	// 	formatted_phone_number: '(602) 866-7500',
	// 	geometry: { location: [Object], viewport: [Object] },
	// 	icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
	// 	icon_background_color: '#909CE1',
	// 	icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet',
	// 	international_phone_number: '+1 602-866-7500',
	// 	name: 'Hilton Phoenix Tapatio Cliffs Resort',
	// 	photos: [
	// 	[Object], [Object],
	// 	[Object], [Object],
	// 	[Object], [Object],
	// 	[Object], [Object],
	// 	[Object], [Object]
	// 	],
	// 	place_id: 'ChIJt-dtqOxtK4cRJ_F-fDxO_lY',
	// 	plus_code: {
	// 	compound_code: 'HWWP+28 Phoenix, AZ, USA',
	// 	global_code: '8559HWWP+28'
	// 	},
	// 	rating: 4.1,
	// 	reference: 'ChIJt-dtqOxtK4cRJ_F-fDxO_lY',
	// 	reviews: [ [Object], [Object], [Object], [Object], [Object] ],
	// 	types: [ 'lodging', 'point_of_interest', 'establishment' ],
	// 	url: 'https://maps.google.com/?cid=6268533753040007463',
	// 	user_ratings_total: 5128,
	// 	utc_offset: -420,
	// 	vicinity: '11111 North 7th Street, Phoenix',
	// 	website: 'https://www.hilton.com/en/hotels/phxtcpr-hilton-phoenix-tapatio-cliffs-resort/?SEO_id=GMB-AMER-HH-PHXTCPR&y_source=1_MTIyMDc3NS03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D',
	// 	wheelchair_accessible_entrance: true
	// },
	// status: 'OK'
	// }
 * 
 * 
 */
function getPlaceDetails(place_id) {

	https.request({
		host: 'maps.googleapis.com',
		path: '/maps/api/place/details/json?place_id=' + place_id + '&key=' + GOOGLE_apikey,
        method: 'GET'},
        PlaceDetailsResponse).end();
}

/**
 * @brief This function retrieves the coordinates of the specified zip code.
 *
 * This function sends a GET request to the Google Maps Geocoding API to retrieve the latitude and longitude of the specified zip code. 
 * The API key is passed as a parameter in the URL. If the request is successful, it calls the CoordinateResponse function. 
 *
 * @param zipcode The zip code for which to retrieve coordinates.
 *
 * @return Nothing.
 */
function getCoordinates(zipcode) {
	https.request({
		host: 'maps.googleapis.com',
		path: '/maps/api/geocode/json?address=' + zipcode + '&key=' + GOOGLE_apikey,
		method: 'GET'},
		CoordinateResponse).end();
}

/**
 * @brief This function handles the response from a GET request to the Google Maps Geocoding API.
 *
 * This function parses the response data to retrieve the latitude and longitude of the specified location. 
 * It then calls the `placeSearch` function to search for nearby places of a specified type within a specified radius.
 *
 * @param response The response object from the GET request.
 *
 * @return Nothing.
 */
function CoordinateResponse(response) {
	
    var data = "";
	var sdata = "";
	var latitude = "";
	var longitude = "";
    var placeType = "";
    var radius = 5000;

	response.on('data', function(chunk) {
		data += chunk;
	});
	response.on('end', function() {
		sdata = JSON.parse(data);
		latitude = sdata.results[0].geometry.viewport.northeast.lat;
		longitude = sdata.results[0].geometry.viewport.northeast.lng;
		placeSearch(latitude, longitude, placeType, radius);
	});
}

/**
 * @brief This function searches for nearby places of a specified type.
 *
 * This function sends a GET request to the Google Maps Places API to retrieve a list of nearby places of the specified type based on the specified latitude, longitude, and radius. 
 * The API key is passed as a parameter in the URL. If the request is successful, it calls the PlaceResponse function. 
 *
 * @param latitude The latitude of the location to search.
 * @param longitude The longitude of the location to search.
 * @param placeType The type of place to search for.
 * @param radius The radius (in meters) within which to search for places.
 *
 * @return Nothing.
 */
function placeSearch(latitude, longitude, placeType, radius) {
	https.request({
		host: 'maps.googleapis.com',
		path: '/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radius + '&type=' + placeType + '&key=' + GOOGLE_apikey,
		method: 'GET'},
		PlaceResponse).end();
}

/**
 * @brief Callback function for Place Details API response.
 * 
 * This is a callback function for the Place Details API response. The function takes an HTTP response 
 * object as input. The function first initializes some variables and then listens for data events on 
 * the response object. When a data event is emitted, the function appends the received chunk to a 
 * string variable data. When the end event is emitted, the function parses the data string into a JSON 
 * object sdata. If the status of the JSON object is ‘OK’, the function logs the status and website of 
 * the result. Otherwise, it logs only the status.
 * 
 * @param response HTTP response object.
 */
function PlaceDetailsResponse(response) {
	var p;
	var data = "";
	var sdata = "";
	var PD = new placeDetails();

	response.on('data', function(chunk) {
		data += chunk;
	});

	response.on('end', function() {

        sdata = JSON.parse(data);
        
        if (sdata.status === 'OK') {
			//console.log('---PlaceDetailsResponse*-----------------------------------');

			//PD.places.push(sdata.results[p]);
			//console.log(sdata.result);

			console.log('+++PlaceDetailsResponse-------------------------------------');

			//console.log('Status: ' + sdata.status);
			console.log(sdata.result.website);

			console.log('***PlaceDetailsResponse-------------------------------------');

		} else {
			console.log(sdata.status);
		}
	});
}

/**
 * @brief This function handles the response from a GET request to the Google Maps Places API.
 *
 * This function parses the response data to retrieve information about nearby places. 
 * If the request is successful, it logs the name, place ID, rating, and vicinity of each place to the console. If there is an error, it logs the error to the console.
 *
 * @param response The response object from the GET request.
 *
 * @return Nothing.
 */
function PlaceResponse(response) {
	var p;
	var data = "";
	var sdata = "";
	var PD = new placeDetails();

	response.on('data', function(chunk) {
		data += chunk;
	});

	response.on('end', function() {

        sdata = JSON.parse(data);

        if (sdata.status === 'OK') {
			console.log('Status: ' + sdata.status);
			console.log('Results: ' + sdata.results.length);
			for (p = 0; p < sdata.results.length; p++) {
				PD.places.push(sdata.results[p]);
			}
			for (r = 0; r < sdata.results.length; r++) {
				console.log('---RESULTS*-----------------------------------');
				console.log(PD.places[r]);
				console.log('---PARSED-------------------------------------');
				console.log(PD.places[r].name);
				console.log('Place ID (for Place Detail search on Google):' + PD.places[r].place_id);
				console.log('Rating: ' + PD.places[r].rating);
				console.log('Vicinity: ' + PD.places[r].vicinity);
			}
		} else {
			console.log(sdata.status);
		}
	});
}

// Export the 'places' function(s) as the default export of this module
module.exports = { 
	placesTest
}
