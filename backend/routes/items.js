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

itemDBRoutes.get('/searchDB/', searchDB);
itemDBRoutes.get('/getSynonyms/', getSynonyms);
itemDBRoutes.get('/:id', getItem);

module.exports = itemDBRoutes;
