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

router.post("/alta_problem", async (req, res) => {
  try {
    const { datetime, problema, idticket } = req.body;

    const integrity = bcrypt.hashSync(datetime + idticket, 10);
    const created = await db.Problems.create({
      problema: problema,
      datetime: datetime,
      integrity: integrity,
      ticketId: idticket,
    });
    if (created) {
      res.status(200).send("Problem created");
    } else {
      res.status(422).send("Existing Problem ");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/get_problems", async (req, res) => {
  try {
    const problems = await db.Problems.findAll();

    if (problems.length > 0) {
      res.status(201).json(problems);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;