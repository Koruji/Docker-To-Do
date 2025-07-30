const Task = require("../models/task");
const express = require('express');
const router = express.Router();

router.use(express.json());

const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Create a new task
router.post('/tasks', asyncHandler(async (req, res) => {
    const { description, state } = req.body;
    const newTask = new Task({ description, state });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
}));

// Get all tasks
router.get('/tasks', asyncHandler(async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
}));

// Get completed tasks
router.get('/tasks/completed', asyncHandler(async (req, res) => {
    const completedTasks = await Task.find({ state : true });
    res.status(200).json(completedTasks);
}));

// Get a specific task by ID
router.get('/tasks/:id', asyncHandler(async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = await Task.findOne({ id: taskId });
    if (!task) {
        return res.status(404).json({status: 404,  message: "Task not found" }); 
    }
    if(isNaN(taskId)) {
        return res.status(400).json({status: 400,  message: "Invalid task ID" });
    }
    res.status(200).json(task);     
})); 

// Complete a task
router.put('/tasks/:id/complete', asyncHandler(async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = await Task.findOne({ id: taskId });

    if (!task) {
        return res.status(404).json({ status: 404, message: "Task not found" });
    }

    const updatedTask = await Task.findOneAndUpdate(
        { id: taskId },
        { state: !task.state },
        { new: true }
    );

    res.status(200).json(updatedTask);
}));

// Delete a task
router.delete('/tasks/:id', asyncHandler(async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const deletedTask = await Task.findOneAndDelete({ id: taskId });
    if (!deletedTask) {
        return res.status(404).json({ status: 404, message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
}));

module.exports = router;