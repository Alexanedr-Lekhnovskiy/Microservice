const { UserModel } = require('./models');
const { APIError, STATUS_CODES } = require('../app-errors')

class UsersRepository {

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

    async CreateUser({ email, password, salt, phone, firstName, lastName, age, postIndex }){
        try {
            const user = new UserModel({ email, password, salt, phone, firstName, lastName, age, postIndex });
            const userResult = await user.save();
            return userResult;
        } catch (error) { 
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create User');
        }
    }
    
    async FindUser({ email }){
        try {
            const user = await UserModel.findOne({ email: email });
            return user;
        } catch (error) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find User');
        }
    }

    async FindUserById(id){
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (error) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find User');
        }
    }

    async ChangeRole(id, role) {
        try {
            const user = await this.FindUserById(id);
            user.role = role;
            await user.save();
            return user;
        } catch (error) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find User');
        }
    }
}

module.exports = UsersRepository;