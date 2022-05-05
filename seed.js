'use strict'

require('dotenv').config();
const mongoose = require('mongoose');

// create a connection to the database long enough to pull the info. Then you can disconnect.
mongoose.connect(process.env.DB_URL);
const Maps = require('./models/trip');

async function seed() {
  // structure is the same as your Book Schema
  await Maps.create({
    name: 'Oakland City Hall',
    osm: 'relation/4682064',
    xid: 'R4682064',
    kind: 'architecture,other_buildings_and_structures,historic_architecture,interesting_places',
    wikidata: 'Q932794',
    dist: 'asldjfasl',
    point: {
      description: 'This was a horrid place',
      lon: -122.272705,
      lat: 37.80513
    },
    notes: {
      title: 'Hidden Gems',
      description: 'Describe the place you visited.',
      likes: 'What did you like about the place?',
      dislikes: 'What did you dislike about the place?',
    }
  });

  console.log('Your map is functioning properly! Congratulations!!!!!!! LEVEL UP!');

  mongoose.disconnect();

}

seed();