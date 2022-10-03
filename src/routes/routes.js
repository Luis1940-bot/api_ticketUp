const router = require("express").Router();

//middlewares
const users = require("./users");
const areas = require("./areas");
const functions = require("./functions");
const categorias = require("./categorias");

//Routes and middlewares
router.use("/", users);
router.use("/", areas);
router.use("/", functions);
router.use("/", categorias);

module.exports = router;
