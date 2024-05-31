const mongoose = require('mongoose');

const Schema = mongoose.Schema
// Model for any item that will be shown when a user wants to see a list of items 
const itemSchema = new Schema({
    name:
    {
        type: String,
        required: true
    },
    price:
    {
        type: String,
        required: true
    },
    image:
    {
        type: String,
        required: false
    },
    link:
    {
        type: String,
        required: true
    },
    path: {
            location:
            {
                lon:{
                    type: Number,
                    required: false
                },
                lat:{
                    type: Number,
                    required: false
                }
            },
            radius:
            {
                type: Number,
                required: false
            },
            store:
            {
                type: String,
                required: false
            },
            search:
            {
                type: String,
                required: false
            }
    },
    method:
    {
        type: String,
        required: false
    },
    created_at: Date,
    updated_at: Date,
    json: Object    
}, { timestamps: true})

const Item = mongoose.model('Item', itemSchema)

/**
 * @brief Represents a JSON schema with creation and update timestamps.
 *
 * This schema defines an object with the following properties:
 * - `created_at`: A `Date` representing the creation timestamp.
 * - `updated_at`: A `Date` representing the last update timestamp.
 * - `json`: An `Object` containing the actual JSON data.
 *
 * @class
 */
var JSONSchema = new Schema({
    created_at: Date,
    updated_at: Date,
    json: Object
});

const ScrapeSerpAPI = mongoose.model('ScrapeSerpAPI', JSONSchema);

module.exports = {
    Item,
    ScrapeSerpAPI
}
