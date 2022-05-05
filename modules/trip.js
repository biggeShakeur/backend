const axios = require('axios');
const { model } = require('mongoose');
let cache = require('./cache.js');




requestTripData = async (location,response) => {
     console.log(location); 

     //Get location of city
     const openTripLocation = await axios.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${location}&country=us&apikey=${process.env.REACT_APP_OPEN_TRIP_API_KEY}`);//.then(res => res.json())
    console.dir(openTripLocation.data);  

    //Get places
    const bboxAPI = await axios.get(`https://api.opentripmap.com/0.1/en/places/radius?radius=100&lon=${openTripLocation.data.lon}&lat=${openTripLocation.data.lat}&apikey=${process.env.REACT_APP_OPEN_TRIP_API_KEY}`);//.then(res => res.json())
    console.dir(bboxAPI); 

    // Get images and OSM (Open Street Map)
    const xid = bboxAPI.data.features[0].properties.xid;

    const x= `http://api.opentripmap.com/0.1/en/places/${xid}?apikey=${process.env.REACT_APP_OPEN_TRIP_API_KEY}`;

    console.log(x);
    // console.dir("xid:" + xid);
        const xidAPI = await axios.get(`http://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${process.env.REACT_APP_OPEN_TRIP_API_KEY}`);
        const poopyButt = Object.values(xidAPI);
        
    console.log(xidAPI.data)

    //Send a response
    return poopyButt.data;
  
  
}
module.exports = requestTripData;
// async function getTripData(location) {
    
//     let url = `https://api.opentripmap.com/0.1/en/places/geoname?name=${location}&country=us&apikey=${process.env.REACT_APP_OPEN_TRIP_API_KEY}`;

//     try {
//         if(cache[key] && (Date.now() - cache[key].timestamp < 100000)) {
//             console.log('Cache is here!!')
//         } else  {
//             console.log('cache is NOT here! Requesting data from API')
//             cache[key] = {}; 
//             cache[key].timestamp = Date.now();
//             cache[key].data = await axios.get(url).then(response => parseTrip(response.data))
//         }; 
//         return cache[key].data;
//     } catch(error) {
//         next(error)
//     }
// }

// function parseTrip (TripData) {
//     try {
//         const tripSummaries = TripData.data.map(item => {
//             return new Trip (item)
//         });
//         return Promise.resolve(tripSummaries);
//     } catch (e){
//         return Promise.reject (e);
//     }
// }

// class Trip {
//     constructor(item) {
//         this.lon = item.lon
//         this.lat = item.lat
//     }
// }
// 'use strict';
// const axios = require('axios');
// const map_url = `https://api.opentripmap.com/0.1/en/places/geoname?name=phoenix&country=us&apikey=${process.env.REACT_APP_OPEN_TRIP_API_KEY}`;


// async function getMap(request, response, next) {
//     try {
//         response = await axios.get(map_url);
//         let data = app.use(express.json());
//         console.log(data);
//     } catch(error) {
//         next(error)
//     }
// }
