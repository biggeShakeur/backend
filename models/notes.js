// Img src
// Alt
// location
// subject

'use strict'

// require mongoose.
const mongoose = require('mongoose');

// extracting the schema property from the mongoose object
const { Schema } = mongoose;

// create a book schema, define how our book objects will be structured.
const noteSchema = new Schema ({
  imgSrc: {type: String, required: true},
  alt: {type: String, required: true},
  location: {type: String, required: true},
  subject: {type: String, required: true}
});

// Define our model
// Give it(?) funtionality and the predefined schema to our data.
// Params: A string and a schema
const noteModel = mongoose.model('Notes', noteSchema);
model.exports = noteModel;
