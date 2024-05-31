//const { goScrapeByFunctionCall } = require('./scrape.js');
var itemController = require('./itemController.js');

/**
* The method handling which search or scrape calls are made
* This will allow new scrape methods to be easily added as well as centralize all search and scrape calls
*
* SearchMethod = 0, just search based on the parameters in the MongoDB
* SearchMethod = 1, search MongoDB and force a scrape
* SearchMethod = 2, do not search the MongoDB just scrape based on the search parameters
*
* To add a new search or scrape method, add a case to the switch with the correct function call
* and add the case to the documentation above
**/
// const searchRequest = async (req, res) =>{
//     let { search, lat, long, radius, searchMethod, debug } = req.params;
//     if(debug == 1){
//         console.log("searchRequest:\nsearchMehtod=" + searchMethod);
//     }
//     //cast to int to switch
//     searchMethod = parseInt(searchMethod);
//     let response = "";
//     switch(searchMethod){
//         case 0:
//             if(debug == 1){
//                 console.log("Search MongoDB only selected");
//             }
//             try{
//                 response = await itemController.getDBSearch(search, lat, long, radius, 0, debug);
//             }catch (error){
//                 console.log("Error in searchRequest case 0: " + error);
//                 response = res.status(500).json("Cannot Run Search");
//             }

//             break;
//         case 1:
//             if(debug == 1){
//                 console.log("Search MongoDB and force scrape only selected");
//             }
//             try{
//                 response = await getDBSearch(search, lat, long, radius, 1, debug);
//             }catch (error){
//                 console.log("Error in searchRequest case 1: " + error);
//                 response = res.status(500).json("Cannot Run Search and Scrape");
//             }
//             break;
//         case 2:
//             if(debug == 1){
//                 console.log("Scrape only selected");
//             }
//             try{
//                 scrape(search, lat, long, radius, 0, debug);
//                 response = res.status(200).json("Running Scrape case 2");
//             }catch(error){
//                 console.log("Error in searchRequest case 2: " + error);
//                 response = res.status(500).json("Cannot Run Scrape");
//             }
//             break;
//         default:
//             console.log("No case selected!");
//             response = res.status(200).json("Nothing Search option Selected");
//             break;
//     }

//     return response;
// }

/**
* Function to scrape the web while defining what scraping algorithm to use
* Any function that wants to scrape the web will call this function with a parameter of which scrape method to use
* This will keep all scrapping methods in one location and allow them to be edited without redoing entire lines
*   of code in other files
*
* Case 0: goScrape
**/
// function scrape(search, lat, long, radius, scrapeMethod, debug){
//     if(debug == 1){
//         console.log("scrape:\nsearchMehtod=" + scrapeMethod);
//     }
//     switch (scrapeMethod){
//         case 0:
//             goScrape.searchbylocation(search, lat, long, radius);
//             break;
//         default:
//             console.log("No case selected!");
//             break;
//     }

// }
//exports all of these methods to view.js
module.exports =  {
    //searchRequest
}
