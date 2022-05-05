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

// This function will 'get' data from the api database. 
async function getTrip(request, response, next) {
  const { location } = request.query;
      console.log(location);   
      verifyUser(request, async (err, user) => {
    if (err) {
      response.send((err.message,'Invalid token'));
    } else {
         
      trip(location).then(summaries => response.send(summaries)).catch((error) => {
        console.error(error.message);
        response.status(200).send('getTrip function is functioning.')
      });


    }
  })
}
///LOCAL TEST FUNCTION : Use http://localhost:3001/all?location=miami in Thunderclient
app.get('/all', getAll);
// This function will 'get' data from the api database. 
async function getAll(request, response, next) {
  const { location } = request.query;
      console.log(location);

      trip(location).then(summaries => response.send(summaries)).catch((error) => {
        console.error(error.message);
        response.status(200).send('getTrip function is functioning.')
      });
}



// Post!
app.post('/trip', postTrip);
async function postTrip(request, response, next) {
  console.log(request.body);
  try {
    let createdTrip = await trip.create(request.body);
    response.status(200).send(createdTrip);
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

// Update put
app.put('/trip/:id', putTrip);
async function putTrip(request, response, next) {
  try {
    let id = request.params.id;
    let updatedTrip = await trip.findByIdAndUpdate(id, request.body, { new: true, overwrite: true });
    response.status(200).send(updatedTrip);
  } catch (error) {
    next(error);
  }
}

//Weather request
app.get('/weather', async (request, response, next) => {
  let searchQuery = request.query.queryWeather;
  console.log(searchQuery);
  let url = (`https://api.weatherbit.io/v2.0/forecast/daily?city=${queryWeather}&key=${process.env.WEATHER_API_KEY}`);
  try {
    let weatherResponse = await axios.get(url);
    console.log(weatherResponse);
    let forecastArr = weatherResponse.data.data.map(day => new
      Forecast(day))
    response.send(forecastArr)
    console.log(forecastArr);
  } catch (error) {
    next(error)
    console.log('Could not find city :(');
  }
})

function Forecast(day) {
  this.date = day.datetime
  this.description = day.weather.description
  console.log(day);
}

//at the bottom of all of our routes

app.get('*', (request, response) => {
  response.send('Check your URL. The one you entered is incorrect.');
})

// Errors
// Handle any errors.

// LISTEN: Start the server
// Listen is an Express method that takes in a Port value and a callback function
app.listen(PORT, () => console.log(`Listening on ${PORT}`))