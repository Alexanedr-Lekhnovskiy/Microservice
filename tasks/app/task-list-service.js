const { TaskRepository } = require("./database");
const { FormateData } = require("./utils");
const { APIError } = require('./app-errors');

class TaskListService {

    constructor(){
        this.repository = new TaskRepository();
    }

    async CreateTaskItem(itemInputs){
        try{
            const itemResult = await this.repository.CreateTaskItem(itemInputs);
            return FormateData(itemResult);
        } catch (error){
            throw new APIError('Data Not found');
        }
    }
    
    async GetTaskList(userId){
        try {
            const taskList = await this.repository.TaskList(userId);
            return FormateData({ taskList });
        } catch (error) {
            throw new APIError('Data Not found');
        }
    }

    async GetTaskItemById(id){
        try {
            const taskItem = await this.repository.FindById(id);
            return FormateData(taskItem);
        } catch (err) {
            throw new APIError('Data Not found');
        }
    }

    async GetTaskListStateList(state){
        try {
            const list = await this.repository.FindByState(state);
            return FormateData(list);
        } catch (error) {
            throw new APIError('Data Not found');
        }
    }

    async DeleteTaskItemById(taskItemId) {
        try {
            const taskItem = await this.repository.DeleteItemById(taskItemId);
            return FormateData(taskItem);
        } catch (error) {
            throw new APIError('Data Not found');
        }
    }
}

module.exports = TaskListService;