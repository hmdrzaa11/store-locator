let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let geocoder = require("../utils/geocoder");

let storeSchema = new Schema({
  storeId: {
    type: String,
    required: [true, "storeId is required"],
    trim: true,
    maxlength: [10, "Store ID must be less than 10 char"],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "please add an address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: [Number],
  },
  formattedAddress: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//NodeGeocoder creates the geojson part

storeSchema.pre("save", async function (next) {
  let [location] = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [location.longitude, location.latitude],
  };
  this.formattedAddress = location.formattedAddress;
  this.address = undefined;
  next();
});

module.exports = mongoose.model("Store", storeSchema);
