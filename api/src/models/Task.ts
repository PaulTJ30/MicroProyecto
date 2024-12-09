import mongoose, { Schema, model } from "mongoose";
import { title } from "process";

export interface ITask extends Document {
    title: string
    description: string
    dueDate: Date
    status: string;
    userID: Schema.Types.ObjectId;
}

const TaskSchema: Schema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    dueDate: {
        type: Date
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        require: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    }
})

export default mongoose.model<ITask>('Tasks', TaskSchema)