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

router.post("/alta_ticket", async (req, res) => {
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
      datetime,
    } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const integrity = bcrypt.hashSync(email + password + name + datetime, 10);
    const [userCreated, created] = await db.Tickets.findOrCreate({
      where: {
        email: email.toLowerCase(),
      },
      defaults: {
        email: email.toLowerCase(),
        password: hash,
        name: name,
        surname: surname,
        phone: phone,
        areaId: area
          ? (
              await db.Areas.findOne({ where: { area: area.toLowerCase() } })
            )?.id
          : null,
        functionId: funcion
          ? (
              await db.Functions.findOne({
                where: { function: funcion.toLowerCase() },
              })
            )?.id
          : null,
        fecha_nacimiento: fecha_nacimiento,
        datetime: datetime,
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

router.get("/get_tickets", async (req, res) => {
  try {
    const users = await db.Tickets.findAll();

    if (users.length > 0) {
      res.status(201).json(users);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;