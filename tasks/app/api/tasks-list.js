const TaskListService = require('../task-list-service');
const { UserAuth } = require('./middlewares/auth');

module.exports = (app) => {
    
    /*
        title: String,
        description: String,
        priority: String,
        state: String,
        userId: String   
    */

    const service = new TaskListService();

    app.post('/tasks-list/create', UserAuth, async (req, res, next) => {
        try {
            const { 
                title, 
                description,  
                priority,
                state 
            } = req.body;
            const {  userId } = req.user._id;
            const { data } = await service.CreateTaskItem({ title, description, priority, state, userId });
            return res.json(data);
        } catch (error) {
            next (error);    
        }
    });

    app.get('/tasks-list-state/:type', UserAuth, async (req, res, next) => {
        try {
            const state = req.params.type;
            const { data } = await service.GetTaskListStateList(state);
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    });

    app.delete('/tasks-list-delete/:id', UserAuth, async (req, res, next) => {
        try {
            const taskItemId = req.params.id;
            const { data } = await service.DeleteTaskItemById(taskItemId);
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    });

    app.get('/:id', UserAuth, async (req, res, next) => { 
        try {
            const taskItemId = req.params.id;
            const { data } = await service.GetTaskItemById(taskItemId);
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    });

     
    app.get('/', UserAuth, async (req, res, next) => {
        try {
            const { data } = await service.GetTaskList(req.user._id); 
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    });
}