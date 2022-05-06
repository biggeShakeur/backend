'use strict'

require('dotenv').config();
const mongoose = require('mongoose');

// create a connection to the database long enough to pull the info. Then you can disconnect.
mongoose.connect(process.env.DB_URL);
// const Maps = require('./models/trip');
const Notes = require('./models/notes.js');

async function seed() {
  // structure is the same as your Book Schema
  await Notes.create({
    title: 'Hidden Gems',
    description: 'Describe the place you visited.',
    likes: 'What did you like about the place?',
    dislikes: 'What did you dislike about the place?',
    
  });

// continue notes


  console.log('Your notes are functioning properly! Congratulations!!!!!!! LEVEL UP!');

  mongoose.disconnect();

}

seed();