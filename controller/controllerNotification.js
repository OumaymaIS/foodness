const Notification = require("../models/notification/notification");
const User=require("../models/user");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.find = async (req, res) => {
  if (!ObjectID.isValid(req.params.iduser)) 
  return res.status(400).send({
    "message": "Invalid id",
  })
  try{
  const user=await User.findById(req.params.iduser);
  allDocs=[
  ];
  if(!user){
    return res.status(400).send({
      "message": "user not exist ",
    })
  }
  multipleNotif=await Notification.find({'isMultiple':true,'usersType':user.Role});
  singleNotif=await Notification.find({'isMultiple':false,'receiverId':user._id});
 allDocs=  allDocs.concat(multipleNotif, singleNotif);
 return  res.send(allDocs);
}catch(err){
  console.log(err);
  res.send(err);

}

}
module.exports.add = async (req, res) => {
 const{ usersType ,
  object,
  content,
  isMultiple,receiverId}=req.body;
  let n;
  if(isMultiple===true) {
      n=new Notification({
        usersType,
        object,
        content,
        isMultiple,
        consultingBy:[],
        receiverId:null,
      });
  }else{
    if (!ObjectID.isValid(receiverId))
  return res.status(400).send({
    "message": "Invalid id",
  })

    n=new Notification({
      usersType:null,
      object,
      content,
      isMultiple,
      consultingBy:[],
      receiverId:receiverId,
    });

  }
  try{
    await n.save();
    res.send(n)
  }catch(err){
    res.send(err);
  }


}
  module.exports.findById = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send({
    "message": "Invalid id",
  })

  try {
    const u= await User.findById(req.params.iduser);
    if(!u) {
      return res.status(404).send({
        "message": "User not found",
      })
    }
    const notification= await  Notification.findById(req.params.id);
    if(!notification){
      return res.status(404).send({
        "message": "notification not found",
      })
    }
    if(notification.isMultiple){
      if(u.Role!==notification.usersType){
       
        return res.status(401).send({
          "message":"user not authorised"
        })
      }else{
        const isUserFound = notification.consultingBy.includes(req.params.iduser);
        if(!isUserFound){
          notification.consultingBy.push(req.params.iduser);
          await notification.save();
        }
        return res.status(200).send(notification)
      }
    }else{
      if(u._id!=notification.receiverId){
        return res.status(401).send({
          "message":"user not authorised"
        })
      }else{
        const isUserFound = notification.consultingBy.includes(req.params.iduser);
        if(!isUserFound){
          notification.consultingBy.push(req.params.iduser);
          await notification.save();
        }
        return res.status(200).send(notification)
      }
    }

  } catch (err) {
    res.status(500).send(err);
  }
};