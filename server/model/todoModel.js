const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = mongoose.Schema({
    user: {type : Schema.Types.ObjectId , ref : "user", required: true},
    todo : { type: String, required: true},
    description : { type: String, required: true},
    createdAt : {
        type: Date,
        default: new Date()
    },
    dueDate : { type: Date, required: true},
    isCompleted : {
        type :  Boolean,
        default: false
    }
})

let todoModel = mongoose.model("todoSchema", todoSchema);

module.exports = todoModel;