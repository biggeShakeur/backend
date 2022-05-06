const axios = require('axios');
const { model } = require('mongoose');
let cache = require('./cache.js');




requestTripData = async (location,response) => {


     //Get location of city
     const openTripLocation = await axios.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${location}&country=us&apikey=${process.env.REACT_APP_OPEN_TRIP_API_KEY}`);//.then(res => res.json())
 

    //Get places
    const bboxAPI = await axios.get(`https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=${openTripLocation.data.lon}&lat=${openTripLocation.data.lat}&apikey=${process.env.REACT_APP_OPEN_TRIP_API_KEY}`);//.then(res => res.json())
  

    // Get images and OSM (Open Street Map)
    const xid = bboxAPI.data.features[0].properties.xid;
    console.log(xid);
    // const x = `http://api.opentripmap.com/0.1/en/places/${xid}?apikey=${process.env.REACT_APP_OPEN_TRIP_API_KEY}`;

    // console.dir("xid:" + xid);
        const xidAPI = await axios.get(`http://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${process.env.REACT_APP_OPEN_TRIP_API_KEY}`);

    //
        
    //Send a response
    return xidAPI.data;
  
  
}
module.exports = requestTripData;
