const express = require("express");
const { Create, GetAll, GetById, Update, Delete, taskbycategory, getByUser } = require("../Controllers/TaskerController");
const router = express.Router();


router.post("/", Create);
router.get("/category/:id", taskbycategory);

router.get("/", GetAll);
router.get("/:id", GetById);
router.get('/getUser/:id',getByUser)
router.put("/:id", Update);
router.delete("/:id", Delete);


module.exports = router; 

