// const axios = require('axios');
// let cache = require('./cache.js');
// module.exports = getTripData;

// const mapModel = require('./models/trip.js');

// let url = `https://api.opentripmap.com/0.1/en/places/geoname?name=${location}&country=us&apikey=${process.env.REACT_APP_OPEN_TRIP_API_KEY}`;
// async function getTripData(request, response, next) {
//     try {
//         let results = await axios.get(url);
//     } catch(error) {
//         next(error)
//     }
// }

'use strict';
const axios = require('axios');

const url = `https://api.opentripmap.com/0.1/en/places/geoname?name=phoenix&country=us&apikey=${process.env.REACT_APP_OPEN_TRIP_API_KEY}`;

async function getMap(request, response, next) {
    try {
        let results = await axios.get(url);
        console.log(results);
    } catch(error) {
        next(error)
    }
}
