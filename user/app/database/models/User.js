const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    salt: {type: String},
    phone: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    age: {type: String},
    postIndex: {type: String},
    role: {type: String, default:'user'}
},
{
    toJSON: {
        transform(doc, ret){
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports =  mongoose.model('user', UserSchema);