const mongoose = require("mongoose");
const MONGO_URL = "mongodb://localhost:27017/all_universities";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to MongoDB");
}
module.exports = main;
