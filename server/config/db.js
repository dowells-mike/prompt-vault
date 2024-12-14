const mongoose = require('mongoose');
//log the .env path
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // to make sure its at the right place

console.log(path.resolve(__dirname, '../.env'));

//log uri value
console.log("MONGO_URI:", process.env.MONGO_URI); // Log the value


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'promptsaver' // This is the db name
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;