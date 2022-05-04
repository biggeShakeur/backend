'use strict'

// require mongoose.
const mongoose = require('mongoose');

// extracting the schema property from the mongoose object
const { Schema } = mongoose;

// create a book schema, define how our book objects will be structured.
const mapSchema = new Schema ({
  name: {type: String, required: false},
  xid: {type: String, required:false},
  osm: {type: String, required: false},
  wikidata: {type: String, required: false},
  kinds: {type: String, required: false},
  dist: {type: Number, required: false},
  lon: {type: Number}, 
  lat: {type: Number}
});

// Define our model
// Give it(?) funtionality and the predefined schema to our data.
// Params: A string and a schema
const mapModel = mongoose.model('Map', mapSchema);


module.exports = mapModel