const { Router } = require("express");
const express = require("express");
const db = require("../db.js");
const router = Router();
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
      idarea,
      idfuncion,
      fecha_nacimineto,
    } = req.body;
    const [userCreated, created] = await db.Users.findOrCreate({
      where: {
        email: email,
      },
    });
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
