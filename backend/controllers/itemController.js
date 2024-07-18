const mongoose = require('mongoose');
const { scrape } = require('./viewController.js');
const { Item } = require('../models/itemModel.js');
//const { searchbylocation } = require('./scrape.js');

const {fork} = require('child_process')

const Math = require("mathjs")

// Below is an example of a getSynonyms
// http://localhost:4000/db/items/getSynonyms?str=screen

// str - Search for this in Synonyms 
//
// returns json array like this:
// ['screen','cover','covert','concealment']
const getSynonyms = async (req, res) =>{
    var { str } = req.query;
    console.log("getSynonyms(req.query %s)", req.query);
    
    try {
        var synonyms = require('synonyms');
 
        var results = [];
        results = synonyms(str,"n");
        if(results === undefined)
            console.log("No synonyms found.")
        else
            console.log(results);

        res.status(200).json(results);
    } catch (error) {
        console.error('Error retrieving synonyms:', error);
        res.status(500).json({ error: 'Failed to fetch synonyms' });
    }

}


function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * 3.14159 / 180.0;
}

function toDegrees(Value){
    /** Converts numeric radians to degrees */
    return Value * 180.0 / 3.14159;
}

// Below is an example of a database query
// str - All items with string 'roller' (not case sensitive) somewhere in the name of the item
// dt - Items within the last 500 minutes
// lat - latitude 43 (Toronto, CA)
// lon - longitude -79 (Toronto, CA)
// rad - 50km radius 
// http://localhost:4000/db/items/searchDB?str=roller&dt=500&lat=43.7136378&lon=-79.3655763&rad=50

// Below is an example of a database query
// str - All items with string 'belt' (not case sensitive) somewhere in the name of the item
// dt - Items within the last 100000 minutes or ~350 days
// lat - latitude 33 (Phoenix)
// lon - longitude -111 (Phoenix)
// rad - 50km 
// http://localhost:4000/db/items/searchDB?str=belt&dt=500000&lat=33&lon=-111&rad=50

// str = string to search for (case insensitve and partial matches valid)
// dt = window delta time in minutes
// lat = latitude
// lon = longitude
// rad = radius in km
const searchDB = async (req, res) => {
    try {
        const { str, dt, lat, lon, rad } = req.query;

        if (!str || isNaN(dt) || isNaN(lat) || isNaN(lon) || isNaN(rad)) {
            return res.status(400).json({ error: "Invalid input parameters" });
        }

        const dateTimeLimit = new Date();
        dateTimeLimit.setMinutes(dateTimeLimit.getMinutes() - parseInt(dt));

        let items = await Item.find({
            name: { $regex: new RegExp(str, 'i') },
            updatedAt: { $gte: dateTimeLimit.toISOString() },
            'path.location': {
                $geoWithin: {
                    $centerSphere: [[parseFloat(lon), parseFloat(lat)], parseFloat(rad) / 6371.0]
                }
            }
        });

        if (items.length < 10) {
            const child = fork('./controllers/scrape.js');
            child.send(req.query); // trigger scraping asynchronously
            // Fetch default items or cached results
            items = await Item.find().limit(10);
        }

        res.json(items);

    } catch (error) {
        console.error('Error retrieving items:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
};


// get all items
const getItems = async (req, res) =>{
    console.log("getItems()");

    const items = await Item.find({}).sort({createAt: -1})

    res.status(200).json(items)
}

// get a single item
// const getItem = async (req, res) => {
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error: "No such item"})
//     }

//     const item = await Item.findById(id)

//     if(!item){
//         return res.status(400).json({error: 'No such item'})
//     }

//     res.status(200).json(item)
// }

// get a single item and check if it's outdated
const getItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such item" });
  }

  const item = await Item.findById(id);

  if (!item) {
      return res.status(400).json({ error: 'No such item' });
  }

  // Check if the item is outdated (older than a specified threshold, e.g., 30 days)
  const currentTime = new Date();
  const outdatedThreshold = new Date(currentTime);
  outdatedThreshold.setDate(outdatedThreshold.getDate() - 30); // Adjust as needed

  if (item.lastUpdated < outdatedThreshold) {
      // The item is considered outdated
      // You can choose to do something specific for outdated items here
      // For now, we'll just flag it as outdated
      item.outdated = true;
  }

  res.status(200).json(item);
}

const getGeoItems = async (req, res) => {
    const { latitude, longitude, radius } = req.query;
  
    try {
      // Convert latitude, longitude, and radius to numbers
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);
      const rad = parseFloat(radius);
  
      // Retrieve items based on the provided location and radius
      const items = await Item.find({
        'path.location.lat': { $lte: lat + rad, $gte: lat - rad },
        'path.location.lon': { $lte: lon + rad, $gte: lon - rad },
      });
  
      res.status(200).json(items);
    } catch (error) {
      console.error('Error retrieving items:', error);
      res.status(500).json({ error: 'Failed to fetch items' });
    }
  };



//this method creates an item when an item is passed to it and adds it into the database, gets used by updatedScraper.js
const createItem = async (itemData) => {
    try {
      const item = await Item.create(itemData);
      console.log('Created item:', item);
      return item;
    } catch (error) {
      console.error('Error creating item:', error.message);
      throw error;
    }
  }

// delete an item
const deleteItem = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such item"})
    }

    const item = await Item.findByIdAndDelete({_id: id})

    if(!item){
        return res.status(400).json({error: 'No such item'})
    }

    res.status(200).json(item)
}


// update an item
const updateItem = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such item"});
    }

    const item = await Item.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!item){
        return res.status(400).json({error: 'No such item'})
    }

    res.status(200).json(item)
}

// creates and adds a test item to mongoDB to test items can be added
const addTestItem = async (req, res) => {
    console.log("Adding a test item to MongoDB");
    //create a test item using the itemModel for the format of an product item
    const testItem = {
        name: "TestItem",
        price: "$100",
        image: "No img",
        link: "No link",
        path: {
            location: {
                lon: -100,
                lat: 30
            },
            radius: 20,
            store: "Target",
            search: "Pants"
        }
    };

    // send it to the method that adds items to the database
    createItem(testItem);

    // return that the item was added and return a status
    return res.status(400).json({ success: 'Test item added' })
}

// Search the database for the given parameters (such as "pants", "shirts")
// Use the users location and radius to find results from the database that are within range
// Check that the items are not outdated (scraped within 2 weeks)
// If there are not enough items in the database matching the search, scrape websites using the same params.
// If websites were scraped return all the results (scraped and from the database), if no websites were scraped
//  then just return the results from the database.
const getDBSearch = async (req, res) =>{
    let { search, lat, long, radius, debug } = req.params;
    var debugFlag = 0;
    // empty list for the items being returned
    let searchItems = [];

    //sets the debug flag for better outputting
    if(!debug || debug == null){
        debugFlag = 0;
    }else{
        debugFlag = debug;
    }
    //make sure that all the required info is given
    if(!search || !radius ){
        if(debugFlag == 1){
            console.log("ERROR: One parameter is incorrect");
        }
        return res.status(404).json({error: 'Incorrect parameters given'});
    }

    //even if the value is null that variables sent could still be considered sent
    // catch this and set the values if they are "null"
    if(lat == null || long == null || lat == "null" || long == "null"){
        //set to tempe AZ lat and long as default
        lat = 33;
        long = -112;
    }

    // turn the numbers into numbers
    lat = Number(lat);
    long = Number(long);
    radius = Number(radius);
    debug = Number(debug);

    //add checks to make sure lat and long are correct coords
    if(lat < -90 || lat > 90){
        if(debugFlag == 1){
            console.log("NOTE: The lat is out of range, fixing");
        }
        return res.status(500).json("Latitude coordinate not in correct range");
    }
    if(long < -180 || long > 180){
         if(debugFlag == 1){
            console.log("NOTE: The long is out of range, fixing");
        }
        return res.status(500).json("Longitude coordinate not in correct range");
    }

    //convert radius(Mi.) to lat and long versions
    // these numbers are used from usgs.gov "How much distance does a degree, minute, and second cover on your maps"
    var raidusLat = radius/69;
    var radiusLong = radius/54.6;

    // get the max ranges for radius
    var maxLat = lat+raidusLat;
    var maxLong = long+radiusLong;
    var minLat = lat-raidusLat;
    var minLong = long-radiusLong;

    // if the radius from the starting coordinates is out of range
    // then set the corresponding min/max coordinate as the min/max value of the range
    if(maxLat > 90){
        maxLat = 90;
    }
    if(maxLong < 180){
        maxLong = 180;
    }
    if(minLat < -90){
        minLat = -90;
    }
    if(minLong < -180){
        minLong = -180;
    }
    // get the date from two weeks ago
    // 86,400,000 = milliseconds in a day * how many days
    const twoWeekAgo = new Date(Date.now()- (86400000*15));
    const now = new Date(Date.now());

    if(debugFlag == 1){
        // DEBUG CODE
        console.log("--------------------");
        console.log("Search: " + search);
        console.log("original Lat: " + lat);
        console.log("original Long: " + long);
        console.log("minLat: " + minLat);
        console.log("maxLat: " + maxLat);
        console.log("minLong: " + minLong);
        console.log("maxLong: " + maxLong);
        console.log("Radius: " + radius);
        console.log("Date two weeks ago: " + twoWeekAgo);
        console.log("Date now: " + now);
        console.log("--------------------");
    }
    
    // add code to get the items within the radius that meet the search parameter
    // get all items within a radius and geo-coords
    if (search == "all") {
        console.log("Getting all items");
        searchItems = await Item.find({
            "path.location.lat":{
                $gte: minLat,
                $lte: maxLat
            },
            "path.location.lon": {
                $gte: minLong,
                $lte: maxLong
            },
            createdAt: {
                $gte: twoWeekAgo,
                $lte: now
            }

        }).catch(function (error){
            console.log("ERROR: Cannot find items: " + error);
            return res.status(404).json("Error finding items");

        });
    } else {
        console.log("Getting specific item");
        // get specific items within radius and lat/log
        searchItems = await Item.find({
            "path.search": search,
            "path.location.lat":{
                $gte: minLat,
                $lte: maxLat
            },
            "path.location.lon": {
                $gte: minLong,
                $lte: maxLong
            },
            createdAt: {
                $gte: twoWeekAgo,
                $lte: now
            }

        }).catch(function (error){
            console.log("ERROR: Cannot find items: " + error);
            return res.status(404).json("Error finding items");

        });
    }


    if(debugFlag == 1){
        console.log("SEARCH RESULTS: \n" + searchItems);
    }

    // if there are less than 25 items then scrape the websites again to get an updated list
    if( searchItems.length < 0){
        //scrape the website
        scrape(search, lat, long, radius, 0, debugFlag);
    }

    // return the found items
    return res.status(200).json(searchItems);
}

exports.createItem = createItem; // unsure why this is needed but a 'circular dependancy' error occurs otherwise
exports.getDBSearch = getDBSearch;

module.exports = {
    createItem,
    getItem,
    getGeoItems,
    getItems,
    deleteItem,
    updateItem,
    addTestItem,
    searchDB,
    getDBSearch,
    getSynonyms
}