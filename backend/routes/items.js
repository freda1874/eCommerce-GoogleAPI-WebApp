const express = require('express');
const {
  createItem,
  getItem,
  getItems,
  deleteItem,
  updateItem,
  addTestItem,
  getDBSearch,
  searchDB,
  getSynonyms
} = require('../controllers/itemController.js');

const itemDBRoutes = express.Router();

// Below is an example of a database query
// str - All items with string 'roller' (not case sensitive) somewhere in the name of the item
// dt - Items within the last 500 minutes
// lat - latitude 43 (Toronto, CA)
// lon - longitude -79 (Toronto, CA)
// rad - 50km radius 
// http://localhost:4000/db/items/searchDB?str=roller&dt=500&lat=43.7136378&lon=-79.3655763&rad=50
itemDBRoutes.get('/searchDB/', searchDB);

// Below is an example of a getSynonyms
// http://localhost:4000/db/items/getSynonyms?str=screen
// str - Search for this in Synonyms 
//
// returns json array like this:
// ['screen','cover','covert','concealment']
itemDBRoutes.get('/getSynonyms/', getSynonyms);

// ADD a test item to the mongoDB database
//itemDBRoutes.get('/addTestItem/', addTestItem)

// GET all items
//itemDBRoutes.get('/', getItems)

// GET a single item
itemDBRoutes.get('/:id', getItem)

// DELETE a item
//itemDBRoutes.delete('/:id', deleteItem)

// UPDATE a item
//itemDBRoutes.patch('/:id', updateItem)

module.exports = itemDBRoutes
