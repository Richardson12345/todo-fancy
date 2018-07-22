const todoModel = require("../model/todoModel");
const jwt = require("jsonwebtoken");
const user = require("../model/userModel")
// const todoModel = model.todoModel

class Controller {
    static getTodo(req,res){
    let token = req.headers.token;
    jwt.verify(token, "secret", (err,decoded)=>{
        if(decoded){
            let user = decoded.id;
            todoModel.find({})
            .populate("user")
            .exec((err,data)=>{
                if(err){
                    res
                    .status(500)
                    .json({
                        msg: "internal service error"
                    })
                }else{
                    res
                    .status(200)
                    .json(data)
                }
            })
        }else{
            res
            .status(500)
            .json({
                msg: "insufficient priviledge"
            })
        }
      })
    }

    static makeTodo(req,res){
        let token = req.headers.token;
        jwt.verify(token,"secret",(err,decoded)=>{
          user.find({username: decoded.username},(err,currentUser)=>{
            // console.log('hahaha ', currentUser)
            let id = currentUser[0].id;
            todoModel.create({
                user : id,
                dueDate : req.body.dueDate,  
                todo : req.body.todo,
                description : req.body.description,
                isCompleted : req.body.isCompleted,
            })
            .then((response) => {
              res.json(response);
            })
            .catch((err) => {
              res
                .status(400)
                .send(err);
            });
            
          })
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