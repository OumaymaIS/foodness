
var express = require('express');
var router = express.Router();
var controllerDon=require("../../controller/controllerDon");
router.post("/Participer",controllerDon.Participer)
router.post("/add",controllerDon.Add);
router.get("/findAll",controllerDon.findAll);
router.put("/update",controllerDon.update);
router.get("/findById/:id",controllerDon.findById);
router.delete("/delete/:id",controllerDon.delete);


module.exports = router;
