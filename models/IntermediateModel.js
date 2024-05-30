const mongoose = require("mongoose");

const intermediateSchema = new mongoose.Schema({
  title: String,
  higher_education_degree: [String],
});

const IntermediateModel = mongoose.model("Intermediate", intermediateSchema);

module.exports = IntermediateModel;
