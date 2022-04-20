const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskListSchema = new Schema({
    title: String,
    description: String,
    priority: String,
    state: String,
    userId: String
});

module.exports =  mongoose.model('taskList', TaskListSchema);