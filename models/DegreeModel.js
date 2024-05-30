const mongoose = require("mongoose");

const degreeSchema = new mongoose.Schema({
  title: String,
  higher_education_degree: [String],
});

const DegreeModel = mongoose.model("Degree", degreeSchema);

module.exports = DegreeModel;
