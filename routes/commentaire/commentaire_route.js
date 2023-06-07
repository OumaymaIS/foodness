
var express = require('express');
var router = express.Router();
var controllerCommentaire=require("../../controller/controllerCommentaire");
router.post("/add",controllerCommentaire.Add);

router.get("/findAll",controllerCommentaire.findAll);
router.put("/update",controllerCommentaire.update);
router.get("/findById/:id",controllerCommentaire.findById);
router.get("/filterByPublic/:public",controllerCommentaire.filterByPublic);
router.delete("/delete/:id",controllerCommentaire.delete);





module.exports = router;
