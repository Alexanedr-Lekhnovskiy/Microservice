const UserService = require('../users-service');
const { UserAuth } = require('./middlewares/auth');

module.exports = (app) => {  
    
    /*
        email: {type: String, unique: true, required: true},
        password: {type: String, required: true},
        salt: {type: String},
        phone: {type: String},
        firstName: {type: String},
        lastName: {type: String},
        age: {type: String},
        postIndex: {type: String},
        role: {type: String, default:'user'}    
    */ 

    const service = new UserService();
    
    app.post('/signup', async (req, res, next) => {
        try {
            const { 
                email, 
                password, 
                phone, 
                firstName, 
                lastName, 
                age,
                postIndex
            } = req.body;
            const { 
                data 
            } = await service.SignUp({ email, password, phone, firstName, lastName, age, postIndex }); 
            return res.json(data);
        } catch (err) {
            next(err);
        }
    });

    app.post('/login', async (req, res, next) => {
        try {
            const { 
                email, 
                password 
            } = req.body;
            const { 
                data
            } = await service.SignIn({ email, password });
            return res.json(data);
        } catch (err) {
            next(err);
        }
    });

    app.get('/profile', UserAuth, async (req, res, next) => {
        try {
            const { 
                _id 
            } = req.user;
            const { 
                data 
            } = await service.GetProfile({ _id });
            return res.json(data);
        } catch (err) {
            next(err);
        }   
    });

    app.post('/change-role', UserAuth, async (req, res, next) => {
        try {
            const { role } = req.body;
            const { _id } = req.user;
            const { data } = await service.ChangeRole(_id, role);
            return res.json(data);
        } catch (err) {
            next(err);
        }
    });
}