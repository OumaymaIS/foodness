
var express = require('express');
var router = express.Router();
var controllerNotification=require("../../controller/controllerNotification");

router.get("/findById/:id/:iduser",controllerNotification.findById);
router.post("/add",controllerNotification.add);
router.get("/getNotifForUser/:iduser",controllerNotification.find)




module.exports = router;
