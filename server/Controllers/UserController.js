const expressAsyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const genrateToken = require("../Utils/GenrateToken");
const bcrypt = require('bcrypt');

//  Get All users
const GetAll = expressAsyncHandler(async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
});

// GET BY USER 
// (user  should not perform CRUD in other user  card  and every user has its cards)

const GetByUser = async (re, res) => {
  const { id } = req.params;
  try {

    const getall = await Tasker.find({ userId: id })
      .populate("categoryId")
      .populate("statusId")
      .populate("userId");
    res.json(getall);

  } catch (error) {
    console.log(error.message);

  }
};

// View User Profile by ID
const Profile = expressAsyncHandler(async (req, res) => {
  const { id } = req.params; // Get ID from URL

  const user = await User.findById(id).select("-password"); // find user & hide password

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    message: "User profile fetched successfully",
    user,
  });
});

// Signup Controller
const Signup = expressAsyncHandler(async (req, res) => {
  const { name, email, password, contact } = req.body;

  // 1. Validate input
  if (!name || !email || !password || !contact) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // 2. Check if user already exists
  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  // 3. Optional image upload
  const imageurl = req.file ? req.file.filename : null;

  // 4. Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // 5. Create user
  const createUser = await User.create({
    name,
    email,
    password: hashPassword,
    contact,
    img: imageurl,
  });

  // 6. Generate JWT token
  genrateToken(res, createUser._id);
  res.status(201).json({
    success: true,
    message: "User created successfuly",
    createUser,

  });

});


const Login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (user && (await bcrypt.compare(password, user.password))) {
    genrateToken(res, user._id)
    res.status(200).json({
      success: true,
      message: "Login Successfully",
      user,
    })
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

module.exports = { GetAll, GetByUser, Profile, Signup, Login };
