const express = require('express');

const {
  searchRequest
} = require('../controllers/viewController.js');


const itemViewRouter = express.Router()

//itemViewRouter.get('/search/:search/:lat/:long/:radius/:searchMethod/:debug', searchRequest)

module.exports = itemViewRouter


