// package 불러오기
const mongoose = require("mongoose");
const config = require("config");
// mongoDB URI 불러오기
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;