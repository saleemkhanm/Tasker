const expressAsyncHandler = require("express-async-handler");
const Category = require("../Models/CategoryModel");

// Create Category
const Create = expressAsyncHandler(async (req, res) => {
  const { name, color } = req.body;

  // Validate input
  if (!name || !color) {
    res.status(400);
    throw new Error("Invalid input data");
  }

  // Save to MongoDB
  const category = await Category.create({ name, color });

  // Response
  res.status(201).json({
    message: "Category created successfully",
    category,
  });
});

//  Get All Categories
const GetAll = expressAsyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

// Get Category by ID
const GetById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  res.status(200).json(category);
});

module.exports = { Create, GetAll, GetById };
