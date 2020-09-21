const NodeGeocoder = require("node-geocoder");
const options = {
  provider: process.env.GEOCODER_PROVIDER,
  apiKey: process.env.MAPQUEST_KEY,
  formatter: null,
};

let geocoder = NodeGeocoder(options);
module.exports = geocoder;
