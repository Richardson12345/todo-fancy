const todoModel = require("../model/todoModel");
// const todoModel = model.todoModel

class Controller {
    static getTodo(req,res){
        todoModel.find({},(err,todos)=>{
            if(err){
                res.send(500)
            }else{
                res.json(todos).status(200);
            }
        })
    }

    static makeTodo(req,res){
        let date = req.body.dueDate;
        let dueDate = req.body.dueDate;  
        let todo = req.body.todo;
        let description = req.body.description;
        let isCompleted = req.body.isCompleted;
        todoModel.create({
            todo,
            description,
            dueDate,
            isCompleted
        },(err,todo)=>{
            if(err){
                res.json(err).status(400)
            }else{
                res.json(todo).status(200);
            }
        })
    }
    static toggleTodo(req,res){
        let todo = req.body.todo;
        todoModel.findOne({todo},(err,result)=>{
            if(err){
                res.json(err)
            }else{
                let status = result.isCompleted;
                if(status){
                    todoModel.updateOne({todo},{isCompleted : false},(err,changes)=>{
                        if(err){
                            res.json(errr).status(400);
                        }else{
                            res.json(changes).status(200);
                        }
                    })
                }else{
                    todoModel.updateOne({todo},{isCompleted : true}, (err,changes)=>{
                        if(err){
                            res.json(err).status(400);
                        }else{
                            res.json(changes).status(200);
                        }
                    })
                    
                }
            }
        })
    }

    static deleteTodo(req,res){
        let todo = req.body.todo;
        todoModel.deleteOne({todo},(err,changes)=>{
            if(err){
                res.json(err).status(400);
            }else{
                res.json(changes).status(200);
            }
        })
    }
}

module.exports = Controller;