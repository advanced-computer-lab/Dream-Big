const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const flightSchema = new Schema({
  From: {
    type: String,
    required: true,
  },
  To: {
    type: String,
    required: true    
  },
  FlightDate: {
    type: Date,
    required: true,
  },
  Cabin: {
    type: String,
    required: true
  },
  SeatsAvailable: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;