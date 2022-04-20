const { TaskListModel } = require("./models");
const { APIError } = require('../app-errors')

class TaskRepository {

    /*    
        title: String,
        description: String,
        priority: String,
        state: String,
        userId: String
    */

    async CreateTaskItem({ title, description, priority, state, userId }){
        try {
            const task = new TaskListModel({ title, description, priority, state, userId });
            const taskResult = await task.save();
            return taskResult;
        } catch (error) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create TaskItem');
        }
    }

    async TaskList({ userId }){
        try {
            return await TaskListModel.find({ userId: userId });
        } catch (error) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Get User TaskList');
        }
    }
   
    async FindById(id){
        try{
            return await TaskListModel.findById(id);
        } catch(error) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find TaskItem');
        }
    }

    async FindByState(state){
        try {
            const taskList = await TaskListModel.find({ state: state});
            return taskList;  
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find State');
        }
    }

    async DeleteItemById(taskItemId) {
        try {
            const taskItem = await TaskListModel.deleteOne({ _id: taskItemId});
            return taskItem;  
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find State');
        }
    }
}

module.exports = TaskRepository;