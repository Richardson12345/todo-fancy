var express = require('express');
var router = express.Router();
const Controller = require("../controller/controller");

/* GET users listing. */
router.get('/', Controller.getTodo);
router.post('/',Controller.makeTodo);
router.put('/', Controller.toggleTodo);
router.delete('/', Controller.deleteTodo);

module.exports = router;
