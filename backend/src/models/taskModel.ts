import mongoose, { Schema, Document } from "mongoose";
export interface ITask extends Document {
    title: string;
    body: string;
    date: string;
    time: string;
    place: string;
    status: boolean;
}

const taskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    place: { type: String, required: true },
    status: { type: Boolean, required: true },
});

export const taskModel = mongoose.model<ITask>("tasks", taskSchema);