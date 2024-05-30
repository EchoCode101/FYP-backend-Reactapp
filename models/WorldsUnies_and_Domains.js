const mongoose = require("mongoose");
const { Schema } = mongoose;
const worldUniesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  domains: {
    type: Array,
    required: true,
  },
  web_pages: {
    type: Array,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  alpha_two_code: {
    type: String,
    required: true,
  },
  state_province: {
    type: String,

  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("WorldUnies", worldUniesSchema);
