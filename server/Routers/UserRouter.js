const express = require("express");
const { GetAll,Profile, Signup, Login, GetByUser } = require("../Controllers/UserController");
const upload = require("../Middlewares/UploadImgMiddleware");
const router = express.Router();

// Get All Users
router.get("/", GetAll);

// Register new user
// router.post("/signup", Signup);
router.post("/signup", upload.single("img"), Signup);

router.get("/user/:id", GetByUser);

// Login user
router.post("/login", Login);

// view profile (Admin/General)
router.get("/:id", Profile);

module.exports = router;

