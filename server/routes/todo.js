var express = require('express');
var router = express.Router();
const todoController = require("../controller/todoController");
const todooMiddleware = require("../middleware/jsonWebToken")

/* GET users listing. */
router.get('/',  todooMiddleware.verifyToken ,todoController.getTodo);
router.post('/', todoController.makeTodo);
router.put('/',todooMiddleware.verifyToken ,todoController.toggleTodo);
router.delete('/:id',todooMiddleware.verifyToken, todoController.deleteTodo);

module.exports = router;
