
const expressAsyncHandler = require("express-async-handler");
const Tasker = require("../Models/TaskerModel");

/* ================= CREATE TASK ================= */
const Create = expressAsyncHandler(async (req, res) => {

  const {
    title,
    description,
    dueDate,
    dueTime,
    progress,
    userId,
    categoryId,
    statusId
  } = req.body;

  // Validation
  if (!title || !description || !dueDate || !dueTime || !categoryId || !userId) {
    res.status(400);
    throw new Error('Invalid input data');
  }

  // Create task
  const newTasker = await Tasker.create({
    title,
    description,
    dueDate,
    dueTime,
    progress,
    categoryId,
    userId,
    statusId
  });

  res.status(201).json({
    message: "Tasker is Created Successfully",
    tasker: newTasker
  });
});

/* ================= GET ALL TASKS ================= */

  const GetAll = expressAsyncHandler(async (req, res) => {
  const user = await Tasker.find();
  res.status(200).json(user);

});

/* ================= GET TASK BY ID ================= */
const GetById = expressAsyncHandler(async (req, res) => {

  const { id } = req.params;

  const tasker = await Tasker.findById(id);

  if (!tasker) {
    return res.status(404).json({ message: "Tasker not found" });
  }

  res.status(200).json(tasker);
});

/* ================= TASK BY CATEGORY (FIXED) ================= */


  //Filter by BOTH categoryId AND userId

const taskbycategory = async (req, res) => {
  try {
    const { id } = req.params;      // categoryId
    const { userId } = req.query;   // logged-in userId

    const tasks = await Tasker.find({
      categoryId: id,
      userId: userId        
    })
      .populate("categoryId")
      .populate("statusId")
      .populate("userId");

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json(error.message);
  }
};

/* ================= UPDATE TASK ================= */
const Update = expressAsyncHandler(async (req, res) => {

  const { id } = req.params;
  const updateData = req.body;

  const updated = await Tasker.findByIdAndUpdate(id, updateData, { new: true });

  if (!updated) {
    return res.status(404).json({ message: "Tasker Not Found" });
  }

  res.status(200).json({
    message: "Tasker updated successfully",
    user: updated
  });
});

/* ================= DELETE TASK ================= */
const Delete = expressAsyncHandler(async (req, res) => {

  const { id } = req.params;

  const deleted = await Tasker.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({ message: "Tasker Not Found" });
  }

  res.status(200).json({
    message: "Tasker deleted successfully",
    user: deleted
  });
});
const getByUser=async (req,res) => {
 try {
  const {id}=req.params;
  const readAllTask=await Tasker.find({userId:id}).populate('categoryId').populate('statusId').populate('userId')
res.status(200).json({
  message:"task find by user",
  data:readAllTask
})
 } catch (err) {
  res.status(400).json({error:err.message})
 } 
}



module.exports = {
  Create,
  GetAll,
  GetById,
  Update,
  Delete,
  taskbycategory,
  getByUser
  
};
