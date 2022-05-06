'use strict';
// Proof of Life
console.log('301 Final Project Server')

// REQUIRES
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

// BRING IN SCHEMA to interact with the model.
// const Maps = require('./models/trip')
const trip = require('./modules/trip.js');
const Notes = require('./models/notes.js');
const { response, request } = require('express');

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// implement express
const app = express();

//AUTH0
const verifyUser = require('./auth.js');

// middleware
app.use(cors());

// If we want to receive JSON data from a request, we need this:
app.use(express.json());
const PORT = process.env.PORT || 3002

// ROUTES
app.get('/', (request, response) => {
  response.send('This is the response from your server 3001')
})

// These are our 'endpoints'
app.get('/trip', getTrip); //Get latitude/longitude
app.put('/trip/:id', putTrip);
app.post('/trip', postTrip);

app.get('/notes', getNotes);
app.post('/notes', postNotes);
app.put('/notes/:id', putNotes);
app.delete('/notes/:id', deleteNotes);



// Request
async function getTrip(request, response, next) {
  const { location } = request.query;
      console.log(location);   
      verifyUser(request, async (err, user) => {
        console.log(verifyUser);
    if (err) {
      response.send((err.message,'Invalid token'));
    } else {
         
      trip(location).then(summaries => response.send(summaries)).catch((error) => {
        console.error(error.message);
        response.status(200).send('getTrip function is NOT functioning.')
      });


    }
  })
}

async function getNotes(request, response, next) {
  try{
    let results = await Notes.find();
    response.status(200).send(results);
  } catch (err){
    next(err);
  }
}

// Create
async function postTrip(request, response, next) {
  console.log(request.body);
  try {
    let createdTrip = await Notes.create(request.body);
    response.status(200).send(createdTrip);
  } catch (error) {
    next(error);
  }
}


async function postNotes(request, response, next) {
  try{
    let createNote = await Notes.create(request.body);
    response.status(200).send(createNote);
  } catch (err){
    next(err);
    }
}

// Update 
async function putTrip(request, response, next) {
  try {
    let id = request.params.id;
    let updatedTrip = await trip.findByIdAndUpdate(id, request.body, { new: true, overwrite: true });
    response.status(200).send(updatedTrip);
  } catch (error) {
    next(error);
  }
}



async function putNotes(request, response, next) {
  try {
    let id = request.params.id;
    let updatedNotes = await Notes.findByIdAndUpdate(id, request.body, 
      { new: true, overwrite: true });
    response.status(200).send(updatedNotes);
  } catch (error) {
    next(error);
  }
}


// Delete
app.delete('/trip/:id', deleteTrip);
async function deleteTrip(request, response, next) {
  try {
    let id = request.params.id;
    console.log(request.params.id);
    await trip.findByIdAndDelete(id);
    response.status(200).send('trip was deleted');
  } catch (error) {
    next(error);
  }
}



async function deleteNotes(request, response, next) {
  try {
    let id = request.params.id;
    console.log(id);
    await Notes.findByIdAndDelete(id);
    response.status(200).send('Notes were deleted');
  } catch (err) {
    next(err);
  }
}




//at the bottom of all of our routes

app.get('*', (request, response) => {
  response.send('Check your URL. The one you entered is incorrect.');
})

// Errors
// Handle any errors.

// LISTEN: Start the server
// Listen is an Express method that takes in a Port value and a callback function
app.listen(PORT, () => console.log(`Listening on ${PORT}`));