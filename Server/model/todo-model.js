import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['To Do', 'Doing', 'Done'],
        default: 'To Do'
    }
});

const Todo = mongoose.model('Todo', taskSchema);

export default Todo;
