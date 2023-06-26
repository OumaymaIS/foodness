const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var typeofdon = new Schema({
nom:String,
});
module.exports = mongoose.model("Typeofdon", typeofdon);
