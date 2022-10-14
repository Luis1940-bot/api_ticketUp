const router = require("express").Router();

//middlewares
const users = require("./users");
const areas = require("./areas");
const functions = require("./functions");
const categorias = require("./categorias");
const criticidad = require("./criticidad");
const ticket = require("./ticket");
const problems = require("./problems");

//Routes and middlewares
router.use("/", users);
router.use("/", areas);
router.use("/", functions);
router.use("/", categorias);
router.use("/", criticidad);
router.use("/", ticket);
router.use("/", problems);

module.exports = router;
