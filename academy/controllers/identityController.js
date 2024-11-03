const Task = require('../models/Task'); 

const addTask = async (req, res) => {
    console.log(req.body.text);
    const task = new Task({
        text: req.body.text
    });

    try {
        const savedTask = await task.save();
        res.send(savedTask);
    } catch (err) {
        res.status(400).send(err);
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
};

const completeTask = async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.body.id },
            { $set: { isCompleted: true } },
            { new: true }
        );
        res.send(updatedTask);
    } catch (err) {
        res.status(400).send(err);
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send('Task not found');
        }
        res.status(200).send(`Successfully deleted task with id ${req.params.id}`);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    addTask,
    getTasks,
    completeTask,
    deleteTask
};