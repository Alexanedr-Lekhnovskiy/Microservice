const { UserRepository } = require("./database");
const { FormateData } = require('./utils');
const { GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('./api/middlewares/auth');
const { APIError } = require('./app-errors')

class UserService {

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

    constructor() {
        this.repository = new UserRepository();
    }

    async SignIn(userInputs) {
        const { 
            email, 
            password 
        } = userInputs;
        try {
            const user = await this.repository.FindUser({ email });
            if(user) {
                const validPassword = await ValidatePassword(password, user.password, user.salt);
                if(validPassword){
                    const token = GenerateSignature({ email: user.email, _id: user._id});
                    return FormateData({id: user._id, token });
                } 
            }
            return FormateData({message: 'Not Authorized'});
        } catch (error) {
            throw new APIError('Data Not found', error);
        }
    }

    async SignUp(userInputs) {
        const { 
            email, 
            password, 
            phone, 
            firstName, 
            lastName, 
            age, 
            postIndex
        } = userInputs;
        try {
            let salt = await GenerateSalt();
            let userPassword = await GeneratePassword(password, salt);
            const user = await this.repository.CreateUser({ email, password: userPassword, phone, salt, firstName, lastName, age, postIndex });
            const token = GenerateSignature({ email: email, _id: user._id});
            return FormateData({id: user._id, token });
        } catch (error) {
            throw new APIError('Data Not found', error)
        }
    }

    async GetProfile(id) {
        try {
            const user = await this.repository.FindUserById(id);
            return FormateData(user);
        } catch (error) {
            throw new APIError('Data Not found', error);
        }
    }

    async ChangeRole(id, role) {
        try {
            const user = await this.repository.ChangeRole(id, role);
            return FormateData(user);
        } catch (error) {
            throw new APIError('Data Not found', error);
        }
    }
}

module.exports = UserService;