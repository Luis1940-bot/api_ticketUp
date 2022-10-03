const router = require("express").Router();

//middlewares
const users = require("./users");
const areas = require("./areas");
const functions = require("./functions");

//Routes and middlewares
router.use("/", users);
router.use("/", areas);
router.use("/", funcions);

module.exports = router;
