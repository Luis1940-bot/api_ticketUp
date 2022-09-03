const router = require("express").Router();

//middlewares
const users = require("./users");

//Routes and middlewares
router.use("/", users);

module.exports = router;
