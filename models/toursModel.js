const mongoose  = require("mongoose");


const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must be provided'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A price must be provided'],
  },
  difficulty: {
    type: String,
    // required: [true, 'A tour must be provided'],
    // unique: true,
  },
});


const Tour = mongoose.model('Tour',tourSchema);


module.exports = Tour