const expressAsyncHandler = require("express-async-handler");
const Status = require("../Models/StatusModel");

const Create = expressAsyncHandler( async (req, res) => {
    const { name, icon, } = req.body;

    if (!name && !icon) {
      res.status(404)
      throw new Error("Invalid Input Data");
      
    }
    // Save user to MongoDB
    const newStatus = await Status.create({
      name,
      icon,
      
    });
   

    res.status(201).json({
      message: "Status is Created Successfully",
      user: newStatus   
    });
   });

const GetAll =  expressAsyncHandler (async (req, res) => {
  
    // Fetch all Status
    const allget = await Status.find();
    res.status(200).json(allget); 
  });


const GetById = expressAsyncHandler( async (req, res) => {
  
    const { id } = req.params; // get id from URL params

    // Fetch Status by ID
    const status = await Status.findById(id);

    if (!status) {
      return res.status(404).json({ message: "Status not found" });
    }

    res.status(200).json(status); 
  });




module.exports = { Create, GetAll, GetById}