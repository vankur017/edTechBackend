const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  grade: String,
  duration: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Course', courseSchema);