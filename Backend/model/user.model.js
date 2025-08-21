import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    // username: String,
    // password: String, 
    // email: String,
    // role: String,
    email: {type: string, required: true, unique: true},
    username: {type:string, required: true},
    password: {type:string, required: true},
    role: {type: string},
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = model('User', userSchema);
export default User;
