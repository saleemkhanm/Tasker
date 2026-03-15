const express = require("express");
const { Create, GetAll, GetById } = require("../Controllers/CategoryController");
const router = express.Router();


router.post("/", Create);
router.get("/", GetAll);
router.get("/:id", GetById);



module.exports = router; 