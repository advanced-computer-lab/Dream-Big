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
  FlightDepDate: {
    type: Date,
    required: true,
  },
  FlightArrDate: {
    type: Date,
    required: true,
  },
  FlightDepTime: {
    type: String,
    required: true,
  },
  FlightArrTime: {
    type: String,
    required: true,
  },
  FlightNumber: {
    type: String,
    required: true,
    unique: true
  },
  Airport: {
    type: String,
    required: true
  },
  Terminal: {
    type: Number,
    required: true
  },
  FirstSeats: {
    availableSeatsNum: {
      type: Number
    },
    allSeats: {
      type: Array
    },
    required: false
  },
  BusinessSeats: {
    availableSeatsNum: {
      type: Number
    },
    allSeats: {
      type: Array
    },
    required: false
  },
  EconomySeats: {
    availableSeatsNum: {
      type: Number
    },
    allSeats: {
      type: Array
    },
    required: false
  },
  BaggageAllowance: {
    type: Number,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  SeatsChosen: [{
    type: String
  }],
  CabinChosen: [{
    type: String
  }]
}, { timestamps: true });

flightSchema.pre('save', function(next) {
  // Check whether its multiple of 8 ao 5ali el input 3ady bas zawed nulls
  let firstSeats = [];
  let fAvailableSeatsNum = this.get('FirstSeats').availableSeatsNum;
  for(let i = 1; i <= Math.ceil(this.get('FirstSeats').availableSeatsNum / 8); i++){
    let row = [];
    for(let j = 1 ; j <= 8; j++){
      if(fAvailableSeatsNum > 0){
        if(j % 3 == 0){
          row.push(null);
        }
        else{
          row.push({id: j, number: j});
        }
        fAvailableSeatsNum--;
      }
      else{
        if(j % 3 == 0){
          row.push(null);
        }
        else{
          row.push({id: j, number: j, isReserved: true});
        }
      }
    }
    firstSeats.push(row);
  }
  this.set('FirstSeats', {availableSeatsNum: this.get('FirstSeats').availableSeatsNum, allSeats: firstSeats})

  let businessSeats = [];
  let bAvailableSeatsNum = this.get('BusinessSeats').availableSeatsNum;
  for(let i = 1; i <= Math.ceil(this.get('BusinessSeats').availableSeatsNum / 8); i++){
    let row = [];
    for(let j = 1 ; j <= 8; j++){
      if(bAvailableSeatsNum > 0){
        if(j % 3 == 0){
          row.push(null);
        }
        else{
          row.push({id: j, number: j});
        }
        bAvailableSeatsNum--;
      }
      else{
        if(j % 3 == 0){
          row.push(null);
        }
        else{
          row.push({id: j, number: j, isReserved: true});
        }
      }
    }
    businessSeats.push(row);
  }
  this.set('BusinessSeats', {availableSeatsNum: this.get('BusinessSeats').availableSeatsNum, allSeats: businessSeats})

  let economySeats = [];
  let eAvailableSeatsNum = this.get('EconomySeats').availableSeatsNum;
  for(let i = 1; i <= Math.ceil(this.get('EconomySeats').availableSeatsNum / 8); i++){
    let row = [];
    for(let j = 1 ; j <= 8; j++){
      if(eAvailableSeatsNum > 0){
        if(j % 3 == 0){
          row.push(null);
        }
        else{
          row.push({id: j, number: j});
        }
        eAvailableSeatsNum--;
      }
      else{
        if(j % 3 == 0){
          row.push(null);
        }
        else{
          row.push({id: j, number: j, isReserved: true});
        }
      }
    }
    economySeats.push(row);
  }
  this.set('EconomySeats', {availableSeatsNum: this.get('EconomySeats').availableSeatsNum, allSeats: economySeats})

  next();
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;