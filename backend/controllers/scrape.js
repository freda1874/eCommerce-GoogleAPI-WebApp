/**
 * This module is a collection of webscraping functions used as 'helpers'.  
 * 
 * Web scraping is a technique used to extract content and data from websites. 
 * It involves the process of automatically mining data or collecting information from the World Wide Web. 
 * This is typically done using software that makes HTTP requests to a website’s server, downloads the page’s HTML, 
 * and parses it to extract the desired data. The extracted data can then be saved in a local file for manipulation and 
 * analysis as needed. Web scraping is used in various applications, such as price comparison services, market research, 
 * and data collection for business intelligence. It’s a field with active developments that intersects with areas like text processing, 
 * semantic understanding, artificial intelligence, and human-computer interaction.
 * 
 * The Google Places API is a service provided by Google that allows developers to access detailed information about various locations, 
 * including establishments, geographic locations, and prominent points of interest. It offers a range of functionalities through HTTP 
 * requests, returning structured data such as location names, addresses, ratings, reviews, and even photos. 
 * 
 * Developers can use the Places API to implement features like location search, place details retrieval, and obtaining photographs of 
 * places. The API supports various types of searches, including proximity-based searches and text string searches, enabling applications 
 * to provide users with relevant and comprehensive place information. 
 * 
 * With the Places API, applications can enhance user experience by helping users discover new places, compare business information, 
 * and interact with maps in a more informative way. It’s a powerful tool for businesses and developers looking to integrate location-based 
 * services into their software or services.
 * 
 * SerpApi is a real-time API that allows users to access Google search results programmatically. It handles the complexities of scraping, 
 * such as dealing with proxies, solving captchas, and parsing the rich structured data that comes from search results. This makes it an 
 * efficient tool for developers who need to retrieve and utilize search data without the hassle of managing these technical challenges 
 * themselves. SerpApi can be particularly useful for SEO analysis, market research, and any application that requires access to up-to-date 
 * search engine results.
 * 
 * Note: Although some of the code in this module is not used and prototype in nature it is important to leave it for the core development
 * team as a reference and the path that was taken.
 */
const axios = require('axios');
const { config, getJson } = require('serpapi');
const logger = require('./logging.js');
const dotenv = require('dotenv');
dotenv.config();

var https = require('follow-redirects').https;

const { ScrapeSerpAPI } = require('../models/itemModel.js');
const mongoose = require('mongoose');

const itemController = require('./itemController.js');

const ZENROWS_apikey = process.env.ZENROWS_API_KEY;
const SERPAPI_apikey = process.env.SERPAPI_KEY;
const SCALESERP_apikey = process.env.SCALESERP_KEY;
const GOOGLE_apikey = process.env.GOOGLE_API_KEY;

const { isString } = require('mathjs');

/**
 * @function scrapeTest
 * @brief Test scraping functions
 *
 * This function tests internal web scraping schemes using Axios
 *
 */
function scrapeTest() {

    console.log("scrapeTest()");
    //logger.loggerPost("scrapeTest()");

    // scrape testing for Toronto, CA
    //searchbylocation('black pants', "46.6532", "-79.3832", 5000);
    //searchbylocation_SERPAPI('shoes', "46.6532", "-79.3832", 10000);

    console.log("scrapeTest() Done");
    //logger.loggerPost("scrapeTest() Done");

    return;

    // ************************************************
    // ************************************************
    // Used for testing individual functions
    //url = 'https://example.com';
    //scrapeURL(url);

    //url = 'https://httpbin.io/anything';
    //scrapeURLzen(url);

    //searchSERP("Pants");
    //searchSERPlocal("Pants", "Phoenix, Arizona, United States");
    //searchSERPshopping('Pants', 'Phoenix, Arizona, United States');
    //console.log(a[0].title);
    //console.log(a);

    //getScrapeData();

    //loadScrapeData("33.611", "-112.0639759");

    //var s = String('>$123.234242342 - 5000 ABS   ');
    //console.log(scrubPrice(s));
    //return;

    //scrapeImage("hats Heritage Hats");
}

function getResults(params) {
    getJson(params, async (results) => {
        console.log(results);
        //console.log(results.local_results.length);
        //console.log(results.local_results[0]);
        //console.log(results.local_results[0].images[0]);

        // local_results: [
        //     {
        //       position: 1,
        //       title: '4 Wheelies - Roller Skating Center',
        //       gps_coordinates: gps_coordinates: { latitude: 45.3525259, longitude: -75.7817205 },
        //       type: 'Sports complex',
        //       address: '1101 Baxter Rd, Ottawa, CA K2C 3Z3',
        //       city: 'Ottawa',
        //       timezone: 'America/Toronto',
        //       phone: '+16136654444',
        //       website: 'https://4wheelies.com',
        //       link: 'https://www.tripadvisor.com/Attraction_Review-g155004-d26660862-Reviews-4Wheelies_Roller_Skating_Center-Ottawa_Ontario.html?m=63959',
        //       thumbnail: 'http://media-cdn.tripadvisor.com/media/photo-s/2a/7c/23/9a/unleash-the-good-times.jpg',
        //       images: [Array],
        //       rating: 2.5,
        //       reviews: 2,
        //       profiles: [Object],
        //       source: [Array],
        //       review_details: [Array],
        //       types: [Array],
        //       hours: 'Open · Closes at 12:00 AM',
        //       operating_hours: [Object]
        //     },
        //gps_coordinates: { latitude: 45.3525259, longitude: -75.7817205 },

        try {

            if (!results.local_results) {
                console.log("No SERPAPI results");
                return;
            }
            if (results.local_results.length > 10)
                results.local_results.length = 10;

            for (var i = 0; i < results.local_results.length; i++) {

                var item = results.local_results[i];

                //console.log("searchbylocation_SERPAPI() item.title = %s",item.title);
                var image_results = await scrapeImage(item.title);
                console.log("searchbylocation_SERPAPI() scrapeImage()RESULTS *****************************************");
                console.log(image_results);

                var img = '';
                //if(item.thumbnail)
                //    img = item.thumbnail;

                //if(item.images)
                //    img = item.images[0];

                if (image_results.length)
                    img = image_results[0].url;

                if (img != '') {

                    console.log(img);

                    try {

                        var scrapedItems = {
                            scraped: [
                                { title: item.title, price: 0.00, url: img, source: item.link },  // todo: default price to 0 for now
                            ],
                            geometry: { location: { lat: item.gps_coordinates.latitude, lon: item.gps_coordinates.longitude } },
                            radius: 5000,
                            name: item.title,
                            item: item.title,
                            method: "SERPAPI"
                        };

                        saveItems(scrapedItems);


                    } catch (error) {
                        console.error(error);
                    }

                } else {
                    console.log("searchbylocation_SERPAPI() skip - no image!");
                }
            }

        } catch (error) {
            console.error(error);
        }
        console.log("searchbylocation_SERPAPI() Successful, done!!!\n");
    });
}
/**
 * @function searchbylocation_SERPAPI
 * @async
 * @brief Performs a location-based search using the SERPAPI API and saves the results.
 * 
 * This asynchronous function takes an item name, latitude, longitude, and radius as input
 * parameters and performs a location-based search using the SERPAPI API. It constructs
 * a request to the API, retrieves the results, and saves relevant information, including
 * images obtained through a separate scraping process.
 * 
 * @param {string} item - The name of the item to search for.
 * @param {number} latitude - The latitude of the search location.
 * @param {number} longitude - The longitude of the search location.
 * @param {number} radius - The search radius in meters.
 * 
 * @throws {Error} Throws an error if there is an issue with the API request or data parsing.
 * 
 * @note This function relies on the presence of a global variable SERPAPI_apikey, representing
 * the API key for accessing the SERPAPI API. Ensure that this variable is defined before
 * calling this function.
 * 
 * @see saveItems
 * 
 * @example
 * // Example usage:
 * const item = 'pants';
 * const latitude = 37.7749;
 * const longitude = -122.4194;
 * const radius = 5000;
 * searchbylocation_SERPAPI(item, latitude, longitude, radius);
 */
function searchbylocation_SERPAPI(item, latitude, longitude, radius) {
    console.log("searchbylocation_SERPAPI()\n");

    logger.loggerPost(`searchbylocation_SERPAPI(${item},${latitude},${longitude},${radius})`);

    if (process.env.SERPAPI_KEY.length > 10) {

        const params = {
            api_key: SERPAPI_apikey,
            engine: "duckduckgo_maps",
            q: item,
            //bbox:"30.341552964181687,-97.87405344947078,30.16321730812698,-97.50702877159034",
            lat: latitude,
            lon: longitude,
            //strict_bbox: "1"
        }

        getResults(params);

    } else {
        console.log("searchbylocation_2() - NO SERPAPI KEY");
    }

}

/**
 * @function scrubPrice
 * @brief Extracts and cleans a numerical price from a given string.
 * 
 * This function takes a string containing numerical characters, potential separators
 * (such as commas or periods), and optional leading characters, and extracts a numeric
 * price from it. The extracted price is then formatted as a floating-point number with
 * two decimal places. The function is designed to handle common formatting variations
 * in price representations, such as spaces or dashes.
 * 
 * @param {string} s - The input string containing the price information.
 * @return {number} The extracted and formatted numerical price. Returns NaN if no valid
 *                 numerical price can be extracted.
 * 
 * @note The function attempts to handle various formatting conventions, but it may not
 * cover all possible scenarios. It is recommended to validate the input string format
 * before using this function.
 * 
 * @warning The function uses parseFloat("NaN") to initialize the price variable as NaN.
 *           This ensures that if an exception occurs during the parsing process, the
 *           return value will be NaN. However, be cautious when using parseFloat("NaN")
 *           in environments where the behavior of parseFloat with a string argument may
 *           vary.
 * 
 * @example
 * // Example usage:
 * const inputString = '$ 1,234.56 USD';
 * const cleanedPrice = scrubPrice(inputString);
 * console.log(cleanedPrice); // Output: 1234.56
 */
function scrubPrice(s) {

    console.log("scrubPrice() %s \n", s);

    var price = parseFloat("NaN");

    try {
        var nstr = '';

        // Iterate through the characters in the input string
        for (var i = 0; i < s.length; i++) {
            if (!isNaN(parseInt(s[i])) || (s[i] === ',' || s[i] === '.')) {
                // Add numerical characters and separators to the new string
                nstr = nstr + s[i];
            }

            if (s[i] === ' ' || s[i] === '-') {
                // Stop processing if a space or dash is encountered
                break;
            }
        }

        // Convert the new string to a floating-point number with two decimal places
        price = parseFloat(nstr).toFixed(2);
    } catch (error) {
        console.error(error);
    }

    return price;
}

/**
 * @function searchbylocation
 * @brief Performs a location-based search using the Google Places API and saves the results.
 * 
 * This asynchronous function takes an item name, latitude, longitude, and radius as input
 * parameters and performs a location-based search using the Google Places API. It constructs
 * a request to the API, retrieves the results, and saves relevant information, including
 * images obtained through a separate scraping process.
 * 
 * @param {string} item - The name of the item to search for.
 * @param {number} latitude - The latitude of the search location.
 * @param {number} longitude - The longitude of the search location.
 * @param {number} radius - The search radius in meters.
 * 
 * @throws {Error} Throws an error if there is an issue with the API request or data parsing.
 * 
 * @note This function relies on the presence of a global variable GOOGLE_apikey, representing
 * the API key for accessing the Google Places API. Ensure that this variable is defined before
 * calling this function.
 * 
 * @warning The function performs a Google image search for each returned location and saves
 * the results. Ensure that the scraping process (e.g., the `scrapeImage` and `saveItems` functions)
 * is properly implemented and handles potential errors.
 * 
 * @see scrapeImage
 * @see saveItems
 * @see saveScrapedData
 * 
 * @example
 * // Example usage:
 * const item = 'pants';
 * const latitude = 37.7749;
 * const longitude = -122.4194;
 * const radius = 5000;
 * searchbylocation(item, latitude, longitude, radius);
 */
function searchbylocation(item, latitude, longitude, radius) {
    console.log("searchbylocation()\n");

    try {
        logger.loggerPost(`searchbylocation(${item},${latitude},${longitude},${radius})`);

        // check the 'item' to ensure it is character or spaces
        const regex = new RegExp("^[a-zA-Z ]{0,255}$");
        console.log(regex);
        console.log(regex.test(item));

        if (regex.test(item) == false) {
            console.log("searchbylocation() - requested item %s is invalid!", item);
            throw new Error("ERROR!!! searchbylocation() - requested item is invalid!");
        }

        // Construct the API request path used to request data from Google Places API
        // for locations (stores) where the 'item' can be found
        // parameters:
        //  item 
        //  lat
        //  lon
        //  radius in km
        //  Google API Key
        const pth = new String('/maps/api/place/textsearch/json?query=' + encodeURIComponent(item) + '&location=' + latitude + ',' + longitude + '&radius=' + radius + '&type=store&key=' + GOOGLE_apikey);
        console.log("searchbylocation() pth->%s\n", pth);

        // Make an HTTPS request to the Google Places API
        const request = https.request({
            host: 'maps.googleapis.com',
            path: encodeURI(pth),
            method: 'GET'
        }, (response) => {
            // Handle API response data
            let data = '';
            response.on('data', (chunk) => {
                data = data + chunk.toString();
            });

            // Process the API response
            response.on('end', async (done) => {
                const body = JSON.parse(data);

                if (body.status != "OK") {
                    console.log("searchbylocation() *** Bad status ***");
                    console.log(body);
                    logger.loggerPost(`searchbylocation() BAD BODY: ${body}`);

                }

                if (body['results'].length > 0 && body.status == 'OK') {
                    // Process each result and perform image scraping

                    //console.log("searchbylocation() body['results']=%s\n", body['results']);

                    var maxResults = body['results'].length;
                    //console.log("searchbylocation() pre.maxResults=%d\n", maxResults);

                    if (maxResults > 50)
                        maxResults = 50;

                    //console.log("searchbylocation() post.maxResults=%d\n", maxResults);

                    for (var i = 0; i < maxResults; i++) {
                        //console.log("searchbylocation() body['results'][%d]=%s\n", i, body['results'][i]);

                        body.results[i].geometry.location.lon = body.results[i].geometry.location.lng; // lng rather than lon from Google API
                        body.results[i].radius = radius;
                        body.results[i].item = item;

                        body.results[i].scraped = await scrapeImage(item + ' ' + body.results[i].name);

                        console.log("searchbylocation() body.results[%d] => %s\n", i, body.results[i]);

                        await saveItems(body.results[i]);

                        //logger.loggerPost(`searchbylocation() saveItems: ${body.results[i]}`);
                    }

                } else {
                    console.log("searchbylocation() -> nothing found!");
                }

                // Save the scraped data
                //saveScrapedData(body);
                //logger.loggerPost(`searchbylocation() saveScrapedData: ${body}`);

                console.log("searchbylocation() Successful, done!!!\n");
            });
        })

        // Handle HTTPS request errors
        request.on('error', (error) => {
            console.log('searchbylocation() An error', error);
        });

        // Send the HTTPS request
        request.end();

        console.log("searchbylocation() *** HTTP REQUEST POSTED *** ");

    } catch (error) {
        console.error(error);
    }
}

/**
 * @file scrape.js
 * @brief Handles incoming messages to perform web scraping tasks.
 *
 * This script listens for messages from a parent process, connects to a database,
 * and performs web scraping using Google Places and SERPAPI based on the received parameters.
 */

/**
 * Event listener for 'message' events.
 * @param {Object} rq - The message object received from the parent process.
 * @param {string} rq.str - The search string for the scraping query.
 * @param {number} rq.lat - The latitude for location-based scraping.
 * @param {number} rq.lon - The longitude for location-based scraping.
 * @param {number} rq.rad - The radius for location-based scraping.
 *
 * The function logs the received message, destructures it to extract parameters,
 * connects to the MongoDB database using the MONGO_URI environment variable,
 * and performs scraping tasks using the provided parameters.
 */
process.on('message', rq => {
    console.log('scrape.js: received message of ', rq);
    var { str, lat, lon, rad } = rq;

    // Connect to the database
    console.log("connecting to database");
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            // Perform the scraping with Google Places
            searchbylocation(str, lat, lon, rad);

            // Perform the scraping with SERPAPI
            searchbylocation_SERPAPI(str, lat, lon, rad);

            // TODO: Decide if results should be returned after being saved in the database
            var result = "SCRAPING DONE";

            // Send status back to the parent process
            process.send("searchbylocation() - DONE");
        })
        .catch((error) => {
            console.log(error);
        });
});

/**
 * @function saveItems
 * @brief Saves scraped items to the database.
 * 
 * This asynchronous function takes an object containing scraped items, typically obtained
 * from an image search, and iterates through each item. For each item, it extracts relevant
 * information such as name, price, image URL, source link, and location details. It then
 * constructs a new database product object and saves it to the database using the
 * itemController.createItem function. The function operates asynchronously and logs any
 * errors that may occur during the process.
 * 
 * @param {Object} items - An object containing information about scraped items, including
 *                        an array of scraped images, location details, search radius, store
 *                        name, and search item.
 * 
 * @throws {Error} Throws an error if there is an issue with creating or saving the database
 *                product using itemController.createItem.
 * 
 * @see itemController.createItem
 * 
 * @example
 * // Example usage:
 * const scrapedItems = {
 *   scraped: [
 *     { title: 'Product 1', price: 19.99, url: 'https://example.com/image1.jpg', source: 'https://example.com/product1', ... },
 *     { title: 'Product 2', price: 29.99, url: 'https://example.com/image2.jpg', source: 'https://example.com/product2', ... },
 *     // ...
 *   ],
 *   geometry: { location: { lat: 37.7749, lon: -122.4194 } },
 *   radius: 5000,
 *   name: 'Store Name',
 *   item: 'searched item'
 * };
 * await saveItems(scrapedItems);
 * 
 * Example entry: 
    {
    url: 'https://i.ebayimg.com/images/g/3dQAAOSwOwdkb6wH/s-l1200.webp',
    source: 'https://www.ebay.com/itm/266271615512',
    title: 'Diamondbacks Lids New Era X Mlb Off White Pinstripe Fitted Hat Size 8 | eBay',
    price: '42.07'
    }
    Created item: {
    name: 'Diamondbacks Lids New Era X Mlb Off White Pinstripe Fitted Hat Size 8 | eBay',
    price: '42.07',
    image: 'https://i.ebayimg.com/images/g/3dQAAOSwOwdkb6wH/s-l1200.webp',
    link: 'https://www.ebay.com/itm/266271615512',
    path: { location: { lon: -111.9020506, lat: 33.4336115 }, store: 'Lids' },
    method: 'google',
    _id: new ObjectId("65b586a58776309e7e12e3e7"),
    createdAt: 2024-01-27T22:41:41.379Z,
    updatedAt: 2024-01-27T22:41:41.379Z,
    __v: 0
    }
 * 
 * 
 */
function saveItems(items) {
    console.log("saveItems() *** saveItems *** ");

    try {

        console.log("saveItems() items.scraped.length=%d\n", items.scraped.length);

        // Iterate through all the scraped items
        for (var i = 0; i < items.scraped.length; i++) {
            console.log(items.scraped[i]);

            try {
                var scrapeMethod = "Google API Places";

                if (items.method) {
                    scrapeMethod = items.method;
                }

                // Create a new database product object
                const newDBProduct = {
                    name: items.scraped[i].title,
                    price: items.scraped[i].price,
                    image: items.scraped[i].url,
                    link: items.scraped[i].source,
                    path: {
                        location: {
                            lat: items.geometry.location.lat,
                            lon: items.geometry.location.lon
                        },
                        radius: items.radius,
                        store: items.name,
                        search: items.item
                    },
                    method: scrapeMethod
                };

                if (isNaN(items.scraped[i].price)) {

                    // 20240131 - Nadia recommended skipping price is it wasn't easily scrapable
                    // thus defaulted to 0.00.
                    newDBProduct.price = 0.00;
                    logger.loggerPost(`saveItems() -> price=NAN; default -> price=0.00`);
                }

                // Save the new database product to the database
                itemController.createItem(newDBProduct);

                var s = JSON.stringify(newDBProduct);
                logger.loggerPost(`saveItems() -> ${s}`);

                // Log the created product (optional)
                console.log(newDBProduct);

            } catch (error) {
                console.error(error);
            }
        }

    } catch (error) {
        console.error(error);
    }

}

/**
 * @function scrapeImage
 * @brief Scrapes images related to a given query and retrieves additional information.
 * 
 * This asynchronous function uses the 'images-scraper' library to perform an image
 * search on the internet based on the provided query (q). It retrieves a specified
 * number of images (default is 10), and for each image, it extracts additional information,
 * such as the source URL and title. Additionally, it attempts to scrape the price of the
 * item from the source page using the getPrice function.
 * 
 * @param {string} q - The query for image scraping, typically in the format 'item brand'.
 * @return {Array} An array of objects representing the scraped images, each containing
 *                 properties like 'url', 'source', 'title', and 'price'.
 * 
 * @throws {Error} Throws an error if there is an issue with the image scraping process
 *                or the getPrice function.
 * 
 * @see getPrice
 * 
 * @example
 * // Example usage:
 * const query = 'pants old navy';
 * const scrapedImages = await scrapeImage(query);
 * console.log(scrapedImages);
 */
async function scrapeImage(q) {
    // Log the query for debugging purposes
    console.log("scrapeImage(%s)\n", q);
    logger.loggerPost('scrapeImage(${q})');

    var Scraper = require('images-scraper');

    try {

        // Create a Scraper instance
        const google = new Scraper({
            puppeteer: {
                headless: true,
            },
        });

        // Set the maximum number of results to retrieve
        var maxResults = 3;

        // Perform image scraping using the 'images-scraper' library
        const results = await google.scrape(q, maxResults);
        //const results = await google.scrape("banana", 10);
        //return;
        console.log(results);

        if (results) {
            console.log('scrapeImage() results ******************');
            console.log(results);
            // var s = JSON.stringify(results);
            // logger.loggerPost('scrapeImage() results -> ${s}');

            // // Process and enhance the scraped results, including extracting prices
            // for (var i = 0; i < results.length; i++) {
            //     results[i].price = await getPrice(results[i].source);
            // }

        } else {
            console.log("scrapeImage() - Unable to scrape an image!");
        }

        // Return the enhanced results
        return results;

    } catch (error) {
        console.error(error);
    }
}
const cheerio = require("cheerio");
/**
 * @function getPrice
 * @async
 * @brief Retrieves and extracts the price from a given URL using web scraping.
 * 
 * This asynchronous function takes a URL as input and performs web scraping to
 * extract the price information from the HTML content of the specified page. It
 * uses the axios library to make an HTTP GET request to the URL and cheerio for
 * HTML parsing. The function searches for specific patterns in the HTML content
 * indicating the presence of a price, and then uses the scrubPrice function to
 * clean and format the extracted price. The function logs the URL for debugging
 * purposes and returns the extracted price as a floating-point number.
 * 
 * @param {string} url - The URL of the page from which to extract the price.
 * @return {number} The extracted and formatted numerical price. Returns NaN if no
 *                 valid numerical price can be extracted.
 * 
 * @throws {Error} Throws an error if there is an issue with making the HTTP request,
 *                parsing the HTML content, or extracting the price.
 * 
 * @see scrubPrice
 * 
 * @example
 * // Example usage:
 * const productURL = 'https://example.com/product-page';
 * const extractedPrice = await getPrice(productURL);
 * console.log(extractedPrice); // Output: 19.99
 */
async function getPrice(url) {
    console.log("getPrice(%s)\n", url);

    // 20240203: todo: Do not search for prices at this time. Improve latency and get content per Nadia
  

    try {
        // Make an HTTP GET request to the specified URL
        console.log(`getPrice(${url}) axios.get(${url})\n`);

        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Log the URL and HTML content for debugging
        console.log(`getPrice() url -> ${url}`);
        console.log($.html());

        let price = NaN;
        const htmlContent = $.html();

        for (let i = 0; i < htmlContent.length; i++) {
            if (htmlContent[i] === '>' && htmlContent[i + 1] === '$') {
                const priceStr = htmlContent.substring(i + 2, i + 8);
                price = scrubPrice(priceStr);
                if (price > 4.99) {
                    break;
                }
            }
        }
        console.log(`getPrice() price -> ${price}`);
        return price;
    } catch (error) {
        console.error(error);
        return NaN; // Return NaN or a default value in case of error
    }
}
// *************
// var Scraper = require('images-scraper');

// const google = new Scraper({
//   puppeteer: {
//     headless: true,
//   },
// });

// (async () => {
//   const results = await google.scrape('pants old navy', 10);
//   console.log('results', results);

// })();


/*
async function getUser() {
    try {
      const response = await axios.get('https://oldnavy.gap.com/browse/product.do?pid=549102022#pdp-page-content');
      //console.log(response);

        const cheerio = require("cheerio");
        const pretty = require("pretty");
      
      const $ = cheerio.load(response.data);

      //console.log(pretty($.html()));


      //const { Parser } = require('simple-text-parser');
      // const parser = new Parser();

        const s = String($.html());

        //console.log(s.length);

        for(var i=0; i<s.length; i++){
            if(s[i]=='>' && s[i+1]=='$'){
                console.log(s[i+2] + s[i+3] + s[i+4] + s[i+5] + s[i+6] + s[i+7]);
            }
        }


    } catch (error) {
      console.error(error);
    }
  }

  getUser();

*/


/*

    const axios = require('axios');

    // set up the request parameters
    const params = {
        api_key: SCALESERP_apikey,
        q: item,
        location: 'lat:' + latitude + ',lon:' + longitude,
        google_domain: 'google.com',
        gl: 'us',
        hl: 'en',
        device: 'desktop',
        num: '10',
        output: 'json'
    }

    // make the http GET request to Scale SERP
    axios.get('https://api.scaleserp.com/search', { params })
    .then(response => {

        // print the JSON response from Scale SERP
        console.log(JSON.stringify(response.data, 0, 2));

    }).catch(error => {
        // catch and print the error
        console.log(error);
    })

*/

//}

// *********************************************************

function loadScrapeData(latitude, longitude) {

    // test data
    var results = require('./results10.json');

    const scrape_results = {
        created_at: results['search_metadata'].created_at,
        updated_at: results['search_metadata'].processed_at,
        json: results
    }

    saveScrapedData(scrape_results);

    var local_results = results['inline_shopping'];
    //console.log(inline_shopping[0]);

    var p;

    for (let i = 0; i < local_results.length; i++) {

        //console.log(local_results[i]);

        try {
            p = local_results[i]['price_parsed'].value;
        } catch (error) {
            p = 0;
        }

      let  newDBProduct = {
            name: local_results[i].title,
            price: p,

            image: local_results[i].image,
            link: local_results[i].link,

            path: {
                location: {
                    lat: latitude,
                    lon: longitude
                },
                radius: 1000,
                store: local_results[i].merchant,
                search: results['search_parameters'].q
            },
            method: results['search_parameters'].engine
        };

        console.log(newDBProduct);

        itemController.createItem(newDBProduct);

        //dbProducts.push(newDBProduct);
    }

}

// *********************************************************

function getScrapeData(latitude, longitude) {

    const axios = require('axios');

    // set up the request parameters
    const params = {
        api_key: SCALESERP_apikey,
        q: 'pants',
        //location: 'lat:33.611, lon:-112.0639759',
        location: 'lat:33.611, lon:-112.0639759',
        google_domain: 'google.com',
        gl: 'us',
        hl: 'en',
        device: 'desktop',
        num: '10',
        output: 'json'
    }

    // make the http GET request to Scale SERP
    axios.get('https://api.scaleserp.com/search', { params })
        .then(response => {

            // print the JSON response from Scale SERP
            console.log(JSON.stringify(response.data, 0, 2));

        }).catch(error => {
            // catch and print the error
            console.log(error);
        })
}

// ************************************

const goScrape = async (req, res) => {

    console.log("*** goScrape ***");

    try {

        console.log(req.query);

        var { query, lat, lon, radius } = req.query;

        // example url:
        // http://localhost:4000/view/goScrape?query=pants&lat=33.611&lon=-112.0639759&radius=1000

        searchbylocation(query, lat, lon, radius)

    } catch (error) {
        console.error(error);
    }

    return;
}

/**
* This function is same as goScrape but able to be called by other backend running programs
* This function is called by itemController.getDBSearch, which will search for items related to the
* Search parameters, then if not enough items are found, or the scrape flag is set, call this function to
* scrape the web
**/
// function goScrapeByFunctionCall(query, lat, lon, radius){

//     console.log("*** goScrapeByFunctionCall() ***");

//     try{

//         console.log(req.query);

//         searchbylocation(query, lat, lon, radius)

//     } catch (error) {
//         console.error(error);
//     }

//     return;
// }

// let url = "https://serpapi.com/search.json?device=desktop&engine=google_local&gl=us&google_domain=google.com&hl=en&location=Phoenix%2C+AZ%2C+Arizona%2C+United+States&ludocid=1678087246074259484&q=shirts"

// let settings = { method: "Get" };

// fetch(url, settings)
//     .then(res => res.json())
//     .then((json) => {

//     console.log(json);

//     var local_results = json['local_results'];

//     console.log(local_results);

//         // do something with JSON
//     });
// return;

//     // test data
//     var results = require('./results3.json');
//     var local_results = results['local_results'];
//     console.log(local_results[0]);

//     return;

//     console.log("*** goScrape ***");
//     console.log(req.query);

//     var { query, lat, lon, radius } = req.query;

//     // example url:
//     // http://localhost:4000/view/goScrape?query=pants&lat=33.611&lon=-112.0639759&radius=1000

//     console.log("*** goScrape serpAPI ***");
//     // perform serpAPI request
//     getJson({
//         api_key: SERPAPI_apikey,
//         engine: "google_local",
//         q: query,
//         location: "Phoenix, AZ, Arizona, United States",
//         google_domain: "google.com",
//         gl: "us",
//         hl: "en"
//         //tbs: "local_avail:1", // this is not supported anymore?
//         }, (results) => {
//                 console.log(results);

//                 const serpAPI_results2 = {
//                     created_at: results['search_metadata'].created_at,
//                     updated_at: results['search_metadata'].processed_at,
//                     json: results
//                 }
//                 saveScrapedData(serpAPI_results2);

//                 var local_results = results['local_results'];
//                 //console.log(local_results[0]);

//                 //var dbProducts = [];    

//                 // Iterate over the search results
//                 for (let i = 0; i < local_results.length; i++) {

//                     console.log(local_results[i]);

//                     const newDBProduct = {
//                         name: local_results[i].description,
//                         //price: local_results[i].price,
//                         price: 100.00,
//                         image: local_results[i].thumbnail,

//                         //link: local_results[i].link,
//                         link: local_results[i].thumbnail, // placeholder

//                         path: {
//                             location: {
//                                 lat: local_results[i].gps_coordinates.latitude,
//                                 lon: local_results[i].gps_coordinates.longitude
//                             },
//                             radius: radius,
//                             store: local_results[i].title,
//                             search: query
//                         },
//                         method: 'serpAPI.google_local'
//                     };

//                     itemController.createItem(newDBProduct);

//                     //dbProducts.push(newDBProduct);
//                 }

//                 //console.log('***********dbProducts**************');
//                 //console.log(dbProducts);

//             }
//     );

//     return;
// }

// const axios = require('axios');

// // set up the request parameters
// const params = {
// api_key: "",
//   search_type: "places",
//   q: "pants",
//   location: "location=lat:33.611,lon:-112.0639759,zoom:15",
//   gl: "us",
//   hl: "en",
//   device: "desktop"
// }

// // make the http GET request to Scale SERP
// axios.get('https://api.scaleserp.com/search', { params })
// .then(response => {

//     // print the JSON response from Scale SERP
//     console.log(JSON.stringify(response.data, 0, 2));

//   }).catch(error => {
// // catch and print the error
// console.log(error);
// })

// test data
//var results = require('./results3.json');
//var local_results = results['local_results'];
//console.log(local_results[0]);

//query = 'pants';
//lat = '33.611';
//lon = '-112.0639759';
//radius = '1000';


//location=lat:33.611,lon:-112.0639759,zoom:15


// // convert 

// const options = {
//     provider: 'google',

//     // Optional depending on the providers
//     fetch: customFetchImplementation,
//     apiKey: GOOGLE_API_KEY, // for Mapquest, OpenCage, Google Premier
//     formatter: null // 'gpx', 'string', ...
//   };

//   const geocoder = NodeGeocoder(options);

// const rex = await geocoder.reverse({ lat: 45.767, lon: 4.833 });
// console.log(rex);

// const uule = createUule('Phoenix, ARizona, United States'); // Canonical name of the location



// console.log(uule);
// return;


//searchSERPshopping('Pants', 'Phoenix, Arizona, United States');

//var config = require('./test.json');
//console.log(config.firstName + ' ' + config.lastName);

//var results = require('./results3.json');

//console.log(results);
//console.log(results['search_metadata'].created_at);
//console.log(results['search_metadata'].processed_at);

//const serpAPI_results = {
//    created_at: results['search_metadata'].created_at,
//    updated_at: results['search_metadata'].processed_at,
//    json: results
//}

//console.log(results['inline_shopping_results'][0]);
//console.log(results['local_results'][0]);

//return;


// ***************************************************
//var local_results = results['local_results'];


//     saveScrapedData(serpAPI_results);

//     getJson({
//         api_key: SERPAPI_apikey,
//         engine: "google_shopping",
//         q: "pants",
//         location: "Phoenix, AZ, Arizona, United States",
//         google_domain: "google.com",
//         gl: "us",
//         hl: "en",
//         tbs: "local_avail:1",
//       }, (results) => {
//         console.log(results);

//         const serpAPI_results2 = {
//             created_at: results['search_metadata'].created_at,
//             updated_at: results['search_metadata'].processed_at,
//             json: results
//         }

//         saveScrapedData(serpAPI_results2);

//     var inline_shopping_results = results['inline_shopping_results'];
//     //console.log(inline_shopping_results);

//     var dbProducts = [];    

//     // Iterate over the search results
//     for (let i = 0; i < inline_shopping_results.length; i++) {

//         console.log(inline_shopping_results[i]);

//         const newDBProduct = {
//             name: inline_shopping_results[i].title,
//             price: inline_shopping_results[i].price,
//             image: inline_shopping_results[i].thumbnail,
//             link: inline_shopping_results[i].link,
//             path: {
//                 location: {
//                     lat: lat,
//                     lon: lon
//                 },
//                 radius: radius,
//                 store: inline_shopping_results[i].source,
//                 search: query
//             },
//             method: 'google_shopping'
//         };

//         await itemController.createItem(newDBProduct);

//         console.log('***********newDBProduct***************');
//         dbProducts.push(newDBProduct);
//         console.log('**************************');

//     }

//     console.log('***********dbProducts**************');
//     console.log(dbProducts);

// //    });

//     return;
// }

/**
 * @brief Saves scraped data using the ScrapeSerpAPI.
 *
 * This function asynchronously saves the provided scraped data.
 *
 * @param scrapedData The data to be saved.
 * @return A promise that resolves to the saved data.
 */
const saveScrapedData = async (scrapedData) => {
    console.log("Saving scraped data");
    try {
        const data = await ScrapeSerpAPI.create(scrapedData);
        console.log('Saving scraped data:', data);
        return data;
    } catch (error) {
        console.log("Error: " + error);
    }
}

/**
 * @brief This function scrapes the specified URL.
 *
 * This function logs "scrapeURL" and the URL to the console. It then sends a GET request to the specified URL using Axios. 
 * If the request is successful, it logs the response data to the console. If there is an error, it logs the error to the console.
 *
 * @param url The URL to scrape.
 *
 * @return None.
 */
const scrapeURL = async (url) => {

    console.log("scrapeURL");
    console.log(url);

    // Send a GET request to the URL using Axios
    // https://github.com/axios/axios
    axios.get(url)
        .then(response => {
            // Log the response data to the console
            console.log(response.data);
        })
        .catch(error => {
            // Handle and log any errors that occur during the request
            console.log(error);
        });

}

/**
 * @brief This function scrapes the specified URL.
 *
 * This function logs "scrapeURLzen" and the URL to the console. It then sends a GET request to the specified URL using Axios. 
 * If the request is successful, it logs the response data to the console. If there is an error, it logs the error to the console.
 *
 * @param url The URL to scrape.
 *
 * @return None.
 */
const scrapeURLzen = async (url) => {

    axios({
        url: 'https://api.zenrows.com/v1/',
        method: 'GET',
        params: {
            'url': url,
            'apikey': ZENROWS_apikey,
        },
    })
        .then(response => console.log(response.data))
        .catch(error => console.log(error));
}

/**
 * @function searchSERP
 *
 * @brief Asynchronously search the SERP (Search Engine Results Page) for a given item.
 *
 * This function makes an asynchronous request to a SERP API to retrieve search results
 * for the specified item using the provided parameters.
 *
 * @param {string} item - The item to search for on the SERP.
 *
 * @returns {Promise<void>} - A Promise that resolves when the search results are obtained.
 *
 * @throws {Error} - Throws an error if there is an issue with the search or API request.
 *
 * @example
 * const itemToSearch = "smartphone";
 * searchSERP(itemToSearch)
 *   .then((searchResults) => {
 *     // Handle the search results here
 *   })
 *   .catch((error) => {
 *     console.error(`Error searching for "${itemToSearch}": ${error.message}`);
 *   });
 */
function searchSERP(item) {

    getJson({
        api_key: SERPAPI_apikey,
        engine: "google_shopping",
        google_domain: "google.com",
        q: item
    }, (json) => {
        console.log(json);
    });
}

/**
 * @function searchSERPlocal
 *
 * @brief Asynchronously search the local SERP (Search Engine Results Page) for a given item in a specific city.
 *
 * This function makes an asynchronous request to a local SERP API to retrieve search results
 * for the specified item in the specified city using the provided parameters.
 *
 * @param {string} item - The item to search for on the local SERP.
 * @param {string} city - The city in which to perform the local search.
 *
 * @returns {Promise<void>} - A Promise that resolves when the local search results are obtained.
 *
 * @throws {Error} - Throws an error if there is an issue with the search or API request.
 *
 * @example
 * const itemToSearch = "restaurant";
 * const searchCity = "New York";
 * searchSERPlocal(itemToSearch, searchCity)
 *   .then((localResults) => {
 *     // Handle the local search results here
 *   })
 *   .catch((error) => {
 *     console.error(`Error searching for "${itemToSearch}" in "${searchCity}": ${error.message}`);
 *   });
 */
function searchSERPlocal(item, city) {

    getJson({
        engine: "google_local",
        q: item,
        location: city,
        api_key: SERPAPI_apikey
    }, (json) => {
        console.log(json["local_results"]);
    });

}

/**
 * @function searchSERPshopping
 *
 * @brief Asynchronously search the Shopping SERP (Search Engine Results Page) for a specific item in a given city.
 *
 * This function makes an asynchronous request to a Shopping SERP API to retrieve search results
 * for the specified item in the specified city using the provided parameters.
 *
 * @param {string} item - The item to search for on the Shopping SERP.
 * @param {string} city - The city in which to perform the Shopping search.
 *
 * @returns {Promise<void>} - A Promise that resolves when the Shopping search results are obtained.
 *
 * @throws {Error} - Throws an error if there is an issue with the search or API request.
 *
 * @example
 * const itemToSearch = "laptop";
 * const searchCity = "San Francisco";
 * searchSERPshopping(itemToSearch, searchCity)
 *   .then((shoppingResults) => {
 *     // Handle the Shopping search results here
 *   })
 *   .catch((error) => {
 *     console.error(`Error searching for "${itemToSearch}" in "${searchCity}": ${error.message}`);
 *   });
 */
function searchSERPshopping(item, city) {
    console.log("***searchSERPshopping***");
    console.log(item);
    console.log(city);

    getJson({
        api_key: SERPAPI_apikey,
        engine: "google",
        q: "pants",
        location: "Phoenix, AZ, Arizona, United States",
        google_domain: "google.com",
        gl: "us",
        hl: "en",
        tbm: "lcl",
        num: "5"
    }, (json) => {
        console.log(json);
    });


    // leaving this code as an example of the datastructures that are processed.
    // Strictly, as a reference.

    //var jsonObj;

    // // Make a request to the Shopping SERP API using the provided parameters
    // // https://serpapi.com/nearby-results
    // getJson({
    //     api_key: SERPAPI_apikey,
    //     engine: "google_shopping",
    //     q: item,
    //     tbs: "local_avail:1",
    //     location: city,
    //     hl: "en",
    //     gl: "us"
    // }, (json) => {
    //     // Log the retrieved nearby shopping results to the console
    //     //console.log(json["nearby_shopping_results"][0].items[0]);
    //     //console.log(json);
    //     console.log(json["nearby_shopping_results"]);

    //     //jsonObj = json["nearby_shopping_results"];
    //     //console.log(jsonObj);
    // });

    //return(jsonObj);

    // var jsonObj = [{
    //     title: 'REI',
    //     link: 'https://www.google.com/search?sca_esv=575083004&hl=en&gl=us&q=REI&ludocid=14189887071945013637&ibp=gwp;0,7&lsig=AB86z5XUTLElR6fxi7BFgci1iwfs&sa=X&ved=0ahUKEwiovKSZ5IOCAxWgE1kFHeI8DvYQgYkFCNobKAA',
    //     serpapi_link: 'https://serpapi.com/search.json?engine=google&gl=us&hl=en&ibp=gwp%3B0%2C7&lsig=AB86z5XUTLElR6fxi7BFgci1iwfs&ludocid=14189887071945013637&q=REI&sa=X&sca_esv=575083004&ved=0ahUKEwiovKSZ5IOCAxWgE1kFHeI8DvYQgYkFCNobKAA',
    //     address: '12634 N Paradise Village Pkwy W, Phoenix',
    //     distance: '16.7 miles',
    //     hours: 'Today: 10:00 AM - 9:00 PM',
    //     phone: '(602) 996-5400',
    //     delivery_options: [ 'Curbside pickup', 'In‑store pickup' ],
    //     directions: 'https://maps.google.com/maps?uule=w+CAIQICIdUGhvZW5peCxBcml6b25hLFVuaXRlZCBTdGF0ZXM&hl=en&gl=us&daddr=12634+N+Paradise+Village+Pkwy+W,+Phoenix,+AZ+85032,+United+States',
    //     items: [ {
    //         title: "Ae Dreamy Drape Stretch Super High-Waisted Cargo Baggy Wide-Leg Pant Women's Black 000 Regular",
    //         link: 'https://www.google.com/shopping/product/6897385237758039487?hl&prds=oid:14362320084568367121,pid:14311549185432444062&sts=2&lsf=seller:15899,store:983771447637265875,s:h',
    //         thumbnail: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRkFm2cotcwBg1C0Xi7gaWWsW6hD6h40qDMw5lqGnTo3gQP6lzzSf7pdZQvHYlFxSLggIyn63VSKRVcRmvvbshnby1S_CifT03mqFRWgWTb6FvXc4_TzMFO&usqp=CAE',
    //         price: '$29.99',
    //         extracted_price: 29.99,
    //         stock_information: 'In Stock'
    //     } ]
    // }];

    // var dbProducts = [];    

    // // Iterate over the search results
    // for (let p = 0; p < jsonObj.length; p++) {

    //     for (let i = 0; i < jsonObj[p].items.length; i++) {
    //         //console.log(jsonObj[p].items[i].title);

    //         const newDBProduct = {
    //             name: jsonObj[p].items[i].title,
    //             price: jsonObj[p].items[i].price,
    //             image: jsonObj[p].items[i].thumbnail,
    //             link: jsonObj[p].items[i].link,
    //             path: {
    //                 location: {
    //                     lat: '33.611',
    //                     lon: '-112.0639759'
    //                 },
    //                 radius: '1000',
    //                 store: jsonObj[p].title,
    //                 search: item
    //             },
    //             method: 'google_shopping'
    //         };

    //         dbProducts.push(newDBProduct);
    //     };
    // };

    // return dbProducts;
};

// Export the 'scrape' functions as the default export of this module
module.exports = {
    scrapeTest,
    searchbylocation,
    goScrape,
    getPrice
}
