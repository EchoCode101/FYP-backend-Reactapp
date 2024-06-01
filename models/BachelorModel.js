const mongoose = require("mongoose");

const bachelorSchema = new mongoose.Schema({
  title: String,
  higher_education_degree: [String],
});

const BachelorModel = mongoose.model("Bachelor", bachelorSchema);

module.exports = BachelorModel;
