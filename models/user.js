
// this an exemple to follow 
const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = new Schema({
  Username: String,
  Password: String,
  Email: String,
  Role: String,
});
module.exports = mongoose.model("user", User);
