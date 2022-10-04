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
      fecha,
      hora,
      estado,
      fechaProgreso,
      fechaCompletado,
      fechaRevisado,
      fechaAceptado,
      ubicacion,
      progreso,
      criticidad,
      categoria,
      area,
      user,
    } = req.body;

    const integrity = bcrypt.hashSync(fecha + hora, 10);
    const created = await db.Tickets.Create({
      fecha: fecha,
      hora: hora,
      estado: estado,
      fechaProgreso: fechaProgreso,
      fechaCompletado: fechaCompletado,
      fechaRevisado: fechaRevisado,
      fechaAceptado: fechaAceptado,
      ubicacion: ubicacion,
      progreso: progreso,
      criticId: criticidad
        ? (
            await db.Critics.findOne({
              where: { criticidad: criticidad.toLowerCase() },
            })
          )?.id
        : null,
      categoriaId: categoria
        ? (
            await db.Categorias.findOne({
              where: { categoria: categoria.toLowerCase() },
            })
          )?.id
        : null,
      areaId: area
        ? (
            await db.Areas.findOne({
              where: { area: area.toLowerCase() },
            })
          )?.id
        : null,
      userId: user,
      integrity: integrity,
    });
    if (created) {
      res.status(200).send("Ticket created");
    } else {
      res.status(422).send("Ticket Not created");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/get_tickets", async (req, res) => {
  try {
    const ticket = await db.Tickets.findAll();

    if (ticket.length > 0) {
      res.status(201).json(ticket);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
