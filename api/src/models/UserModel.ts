import mongoose, { Schema, model } from "mongoose";

export interface IUser extends Document {
    name: string,
    lastNames: String,
    email: String,
    password: String,
    rol: 'admin' | 'user';

}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        require: true
    },
    lastNames: {
        type: String,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    rol: {
        type: String,
        enum: ['admin', 'user'],
        require: true
    }
})

export default mongoose.model<IUser>('Users', UserSchema)