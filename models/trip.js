'use strict'

// require mongoose.
const mongoose = require('mongoose');

// extracting the schema property from the mongoose object
const { Schema } = mongoose;

// create a book schema, define how our book objects will be structured.
const mapSchema = new Schema ({
  xid: {type: String, required: true},
  name: {type: String, required: true},
  kind: {type: String, required: true},
  osm: {type: String, required: false},
  wikidata: {type: String, required: false},
  dist: {type: String, required: false},
  point:{
      description: {type: String, required: true},
      lon: {type: Number}, 
      lat: {type: Number}
  }
});

// Define our model
// Give it(?) funtionality and the predefined schema to our data.
// Params: A string and a schema
const mapModel = mongoose.model('Map', mapSchema);


module.exports = mapModel