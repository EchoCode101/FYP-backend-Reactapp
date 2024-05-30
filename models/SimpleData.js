const mongoose = require("mongoose");
const { Schema } = mongoose;
const simpleDataSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
  logo_src: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("SimpleData", simpleDataSchema);
