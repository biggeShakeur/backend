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
const trip = require('./models/trip.js');
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
app.post('/trip', postTrip);
app.put('/trip/:id', putTrip);
app.delete('/trip/:id', deleteTrip);


app.get('*', (request, response) => {
  response.send('Check your URL. The one you entered is incorrect.');
})

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



// This function will 'get' Trip data from the api database. 
async function getTrip(request, response, next) {
  // verifyUser(request, async (err, user) => {
  //   if (err) {
  //     response.sent('Invalid token');
  //   } else {
    const location = request.query.name;
    const country = request.query.country;
    const url = `https://api.opentripmap.com/0.1/en/places/geoname?name=${location}&country=${country}&apikey=${process.env.REACT_APP_OPEN_TRIP_API_KEY}`
    const tripData = await axios.get(url)
    const tripAdvisor = new Trip(tripData.data);
    
    const actualTripAdvisor = await getRadiusUrl(tripAdvisor);//return
    response.status(200).send(actualTripAdvisor);
     
    }
 

    async function getRadiusUrl(filteredTrip) {// filteredTrip has lat/lon/
    const lon = filteredTrip.lon;//-84.38798
    const lat = filteredTrip.lat;//33.749
    const radius = `100, &lang='en'`;

    let radiusUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&apikey=${process.env.REACT_APP_OPEN_TRIP_API_KEY}`

    const dataOne = await axios.get(radiusUrl);
    let mappedData = dataOne.data.features.map(aData => {return new TripSummary(aData,lat, lon)});
      return mappedData;//returns a new object with ALL SCHEMA data
    }

    




    class TripSummary {
      constructor (getInfo,lat, lon){
        this.name = getInfo.properties.name;
        this.xid = getInfo.properties.xid
        this.osm = getInfo.properties.osm;
        this.wikidata = getInfo.properties.wikidata;
        this.kinds = getInfo.properties.kinds;
        this.dist = getInfo.properties.dist;
        this.lat = lat;
        this.lon = lon;
      }

      
    }

// Post!
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
async function putTrip(request, response, next) {
  try {
    let id = request.params.id;
    let updatedTrip = await trip.findByIdAndUpdate(id, request.body, { new: true, overwrite: true });
    response.status(200).send(updatedTrip);
  } catch (error) {
    next(error);
  }
}




// Constructors
class Trip {
  constructor (location) {
    this.name = location.name;
    this.country = location.country;
    this.lat = location.lat;
    this.lon = location.lon;
  }
}


function Forecast(day) {
  this.date = day.datetime
  this.description = day.weather.description
  console.log(day);
}

//at the bottom of all of our routes


// Errors
// Handle any errors.

// LISTEN: Start the server
// Listen is an Express method that takes in a Port value and a callback function
app.listen(PORT, () => console.log(`Listening on ${PORT}`))