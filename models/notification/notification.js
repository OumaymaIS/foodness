const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Notification = new Schema({
  usersType : String,
  object:String,
  content:String,
  isMultiple:{
    type:Boolean,
    default:true,
  },
  consultingBy:{
    type:[
     { type: Schema.Types.ObjectId, 
      ref: 'user'}
    ]
  },
  receiverId :{
    type: Schema.Types.ObjectId, 
      ref: 'user'
  }

});
module.exports = mongoose.model("Notification", Notification);
