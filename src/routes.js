const Task = require("./models/task");
const express = require('express');
const router = express.Router();

router.use(express.json());

// Create a new task
router.post('/tasks', async (req, res) => {
    try {
        const { description, status } = req.body;
        const newTask = new Task({ description, status });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: "Error while creating task", error: error.message });
    }
});

// Get all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error while retrieving tasks", error: error.message });
    }
});

// Get completed tasks
router.get('/tasks/completed', async (req, res) => {
    try {
        const completedTasks = await Task.find({ status: true });
        res.status(200).json(completedTasks);
    } catch (error) {
        res.status(500).json({ message: "Error while retrieving completed tasks", error: error.message });
    }
});

// Complete a task
router.put('/tasks/:id/complete', async (req, res) => {
    try {
        const taskId = parseInt(req.params.id, 10);
        const updatedTask = await Task.findOneAndUpdate(
            { id: taskId },
            { status: true },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({
            message: "Error while updating the task",
            error: error.message
        });
    }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = parseInt(req.params.id, 10);
        const deletedTask = await Task.findOneAndDelete({ id: taskId });
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error while deleting the task", error: error.message });
    }
});

module.exports = router;