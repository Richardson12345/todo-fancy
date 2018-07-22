const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const todoSchema = mongoose.Schema({
    todo : String,
    description : String,
    dueDate : Date,
    isCompleted : Boolean
})

let todoModel = mongoose.model("todoSchema", todoSchema);

// todoModel.create({
//     todo: "become 10k mmr",
//     description : "the legend of dots",
//     dueDate : new Date(),
//     isCompleted : false
// },(err,data)=>{
//     if(err){
//         console.err(err)
//     }else{
//         console.log(data)
//     }
// })

module.exports = {
    todoModel
}