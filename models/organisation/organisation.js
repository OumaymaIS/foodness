const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var organisation = new Schema({
nom:String,
adresse:String,
type:String,
isAssocation:Boolean,
isResto:Boolean,
});
module.exports = mongoose.model("Organisation", organisation);
