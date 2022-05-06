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
  title: {type: String, required: false},
  description: {type: String, required: false},
  likes: {type: String, required: false},
  dislikes: {type: String, required: false}
});

// Define our model
// Give it(?) funtionality and the predefined schema to our data.
// Params: A string and a schema
const noteModel = mongoose.model('Notes', noteSchema);
module.exports = noteModel;
