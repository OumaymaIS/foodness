const Commentaire = require("../models/commentaire/commentaire");
const ObjectID = require("mongoose").Types.ObjectId;
const fs=require("fs");
const path = require('path');
const Notification  =require("../models/notification/notification");

/*  refUser:  Schema.Types.ObjectId, ref: 'user',
  refDon:  Schema.Types.ObjectId, ref: 'Don',
  content: String,
  isPublic: boolean,*/
 async function getInapproprie(){
    const filePath = path.join(__dirname, 'inapproprie.json');
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading JSON file:', err);
          reject(err);
          return;
        }
  
        try {
          // Parse the JSON data into an array
          const jsonArray = JSON.parse(data);
  
          // Resolve the promise with the parsed array
          resolve(jsonArray);
        } catch (err) {
          console.error('Error parsing JSON:', err);
          reject(err);
        }
      });
    });
  }
async function mot_inapproprie(ch){
  const inapproprie=await getInapproprie();
  
  const array_of_ch=ch.split(" ");

  for(let i=0; i<array_of_ch.length;i++){
    const word = array_of_ch[i].toLowerCase().trim(); // Convert to lowercase and remove leading/trailing spaces

      if (word !== "") {
        if (inapproprie.includes(word)) {
          return true;
        }
      }
  }
  
  return false;

}
module.exports.Add = async (req, res) => {
  const {
    refUser,
    refDon,
    content,
  } = req.body;
  if (!ObjectID.isValid(refUser)){
   return  res.status(400).send({
      "error": "Invalid Id user"
    });
  }
  else if (!ObjectID.isValid(refDon)){
   return  res.status(400).send({
      "error": "Invalid Id Don"
    });
  }else{

  const isPublic= ! (await mot_inapproprie(content));
  const c=new Commentaire({
    refUser,
    refDon,
    content,
    isPublic
  })
  try{
    
    const r=await c.save();
    if(!isPublic){
      N=new Notification({
        usersType:"admin",
        object:" bad words is detetected ",
        content : `comment contains bad words is detetected : ${r._id}`,
        isMultiple:true,
        consultingBy:[],
        receiverId:null
      })
      await N.save();


    }
   return  res.status(200).send(c);
  }catch(e){
   return  res.status(500).send(e);

  }
}


}

module.exports.findAll = async (req, res) => {
  try {
    const docs = await Commentaire.find({}).exec();
    res.status(200).send(docs);
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports.findById = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send({
    "message": "Invalid id",
  })

  try {
   const docs= await  Commentaire.findById(req.params.id);
      if (docs) res.send(docs);
    
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.delete = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send({
    "message": "Invalid id",
  })

  try {
   const docs= await  Commentaire.findByIdAndDelete(req.params.id);
      if (docs) res.send(docs);

    
  } catch (err) {
    res.status(500).send(err);
  }   
};
module.exports.filterByPublic = async (req, res) => {
  try {
    const isPublic = req.params.public === 'true'; // Convert the string to a boolean value

    const docs = await Commentaire.find({"isPublic":isPublic}).exec();
    res.status(200).send(docs);
  } catch (err) {
    res.status(500).send(err);
  }
}
module.exports.update = async (req, res) => {
  
  if (!ObjectID.isValid(req.body.id))
  return res.status(400).send({
    "message": "Invalid id",
  })
  let updatedData = {};
  

  if(req.body.content){
    updatedData.content=req.body.content;
    const verif=await mot_inapproprie(req.body.content);
    if(verif){
      return res.status(200).send({
        "message:":"mot_inapproprie detected"
      })
    }
  }


  if(req.body.isPublic){
    updatedData.isPublic=req.body.isPublic;
  }
  
  try{
    const updated=await Commentaire.findByIdAndUpdate(req.body.id,updatedData,{
      new:true,
    });
          res.status(200).send(updated);
    
  } catch (err) {
    res.status(500).send(err);
  }
};

