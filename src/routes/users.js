const { Router } = require("express");
const express = require("express");
const db = require("../db.js");
const router = Router();
const bcrypt = require("bcrypt");
router.use(express.json());
const cors = require("cors");
router.use(cors());
router.use(
  express.urlencoded({
    extended: true,
  })
);

router.post("/alta_users", async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      surname,
      phone,
      area,
      funcion,
      fecha_nacimiento,
    } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const integrity = bcrypt.hashSync(email + password + name, 10);
    const [userCreated, created] = await db.Users.findOrCreate({
      where: {
        email: email,
      },
      defaults: {
        email: email,
        password: hash,
        name: name,
        surname: surname,
        phone: phone,
        idarea: area
          ? (
              await db.Area.findOne({ where: { area: area } })
            )?.id
          : null,
        idfuncion: funcion
          ? (
              await db.Function.findOne({ where: { function: funcion } })
            )?.id
          : null,
        fecha_nacimiento: fecha_nacimiento,
        integrity: integrity,
      },
    });
    if (created) {
      res.status(200).send("User created");
    } else {
      res.status(422).send("Existing User ");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/get_users", async (req, res) => {
  try {
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
