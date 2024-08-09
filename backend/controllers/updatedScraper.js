const websiteController = require('./WebsiteElementsController.js');
//const { search } = require('../routes/view.js');
const { By, Key, Builder, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')

const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--ignore-certificate-errors');
chromeOptions.addArguments('--disable-notifications');
chromeOptions.addArguments('--profile-directory=Default');
chromeOptions.addArguments('--disable-popup-blocking');
var websites = []


const start = async (url, lon, lat, radius, store, input, method) => {

    console.log("start")


    // check if the local store's website url is in the list of scrappable websites

    // get the website document that matches the url

    const website = await websiteController.getWebsitesFromURL(url);
    // if the website was found in the db and can be scrapped
    if (website) {

        // the website is scrappable
        console.log("Scraping website: " + url);
        let addClosed = 0;
        let driver = await new Builder().forBrowser("chrome").setChromeOptions(chromeOptions).build();
        //console.log("startt")
        try {
            await driver.get(url);
            //console.log("At URL");
            let searchBar;
            if (input != undefined) {
                await driver.sleep(3000);
                searchBar = await driver.findElement(By.css(website.searchBarElement));
                //console.log(website.searchBarElement); //prints the search bar element thats being used
                await searchBar.sendKeys(input, Key.RETURN); // puts the keys in the search bar, then hits enter
                //console.log("Searching for " + input);
                //console.log("Searched");
                //here
            } else {
                // Scroll down to the bottom of the page to load all elements on the home page
                await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
            }

            //lets the new page load
            await driver.sleep(5000);

            //if the user makes a search, then the selectors chosen will be the product Elements where if the user hasn't had any input, it makes
            //it so that it will show the home elements of the page
            var selectors = [
                { name: website.productHomeNameElement, price: website.productHomePriceElement, image: website.productHomeImageElement, link: website.productHomeLinkElement }, // home elements
                { name: website.productNameElement, price: website.productPriceElement, image: website.productImageElement, link: website.productLinkElement } // search elements
            ]

            let searchOrHome = 0

            if (input != undefined) {
                searchOrHome = 1 //means that there was a search criteria
                //console.log("SEARCHING") // console.log in page.evaluate is sent to the web browser console
            } else {
                //console.log("HOME") //could just be a user that wants to use the homepage
            }
            await driver.wait(until.stalenessOf(searchBar));
            if (website.closeButton != undefined && addClosed == 0) { //to close any popup that happens
                const closeButton = await driver.findElement(By.css(website.closeButton));
                await closeButton.click(); //closes the add then waits 5 seconds
                await driver.sleep(5000);
                //console.log(website.closeButton);
                //console.log("addclosed " + addClosed)
            }

            //need to change this to the wanted element based on the site in the database
            //const names = await driver.findElements(By.css(website.productNameElement));
            const names = await driver.findElements(By.css(website.productNameElement));
            const productNames = await Promise.all(names.map(pant => pant.getText()));
            //console.log(website.productNameElement);
            const priceElements = await driver.findElements(By.css(website.productPriceElement));
            const productPrices = await Promise.all(priceElements.map(priceElement => priceElement.getText()));
            //gets image url website if src element or data-src
            const imageElements = await driver.findElements(By.css(website.productImageElement));
            const productImages = await Promise.all(imageElements.map(async imageElement => {
                let relativePath = await imageElement.getAttribute('data-src');

                if (!relativePath || relativePath.trim() === '') {
                    relativePath = await imageElement.getAttribute('src');
                }
                const baseUrl = website.websiteUrl;
                //if the url doesn't start with https, adds the website to make the relative path the proper path
                const fullUrl = await relativePath.startsWith('https') ? relativePath : baseUrl + relativePath;
                return fullUrl;
            }));
            const linkElements = await driver.findElements(By.css(website.productLinkElement));
            const productLinks = await Promise.all(linkElements.map(linkElement => linkElement.getAttribute('href')));


            const productInfo = [
                productNames,
                productPrices,
                productImages,
                productLinks
            ];

            //   const namess = productInfo[0];
            // console.log(namess);

            productNames.forEach(productName => {
                //console.log(productName); // Print each product name
            });

            productPrices.forEach(productPrice => {
                //console.log(productPrice);
            });
            console.log("images");
            productImages.forEach(productImage => {
                //console.log(productImage);
            });
            //console.log("links");
            productLinks.forEach(productLink => {
                //console.log(productLink);
            });

            var dbProducts = [];

            //Iterate over the productInfo array
            for (let p = 0; p < productInfo[0].length; p++) {
                const newDBProduct = {
                    name: productInfo[0][p],
                    price: productInfo[1][p],
                    image: productInfo[2][p],
                    link: productInfo[3][p],
                    path: {
                        location: {
                            lon: lon,
                            lat: lat
                        },
                        radius: radius,
                        store: store,
                        search: input
                    },
                    method: method
                };

                dbProducts.push(newDBProduct);
            }


            return dbProducts;


        } catch (error) {
            console.log(`ERROR: '${error.message}'`);
        }
    }

}

module.exports = { start }