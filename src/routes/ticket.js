const { Router } = require("express");
const express = require("express");
const db = require("../db.js");
const router = Router();
const bcrypt = require("bcrypt");
const manejoFechas = require("../controllers/manejoFecha");
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
      //estado,
      fechaProgreso,
      //fechaCompletado,
      //fechaRevisado,
      //fechaAceptado,
      ubicacion,
      //progreso,
      criticidad,
      categoria,
      area,
      user,
      tiempos,
      problema,
    } = req.body;

    const integrity = bcrypt.hashSync(
      manejoFechas.fecha_yyyy_mm_dd_hh(fecha) +
        hora +
        user +
        manejoFechas.fecha_yyyy_mm_dd_hh(fechaProgreso),
      10
    );

    const created = await db.Tickets.create({
      fecha: fecha,
      hora: hora,
      //estado: estado,
      fechaProgreso: fechaProgreso,
      //fechaCompletado: fechaCompletado,
      //fechaRevisado: fechaRevisado,
      //fechaAceptado: fechaAceptado,
      ubicacion: ubicacion,
      //progreso: progreso,
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
      resolutionId: tiempos
        ? (
            await db.Resolutions.findOne({
              where: { tiempos: tiempos.toLowerCase() },
            })
          )?.id
        : null,
      userId: user,
      problema: problema,
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
    const ticket = await db.Tickets.findAll({
      include: [
        {
          model: db.Critics,
          attributes: ["criticidad"],
          //required: true,
        },
        {
          model: db.Categorias,
          attributes: ["categoria"],
          //required: true,
        },
        {
          model: db.Areas,
          attributes: ["area"],
          //required: true,
        },
        {
          model: db.Users,
          attributes: ["name", "surname", "email"],
          //required: true,
        },
        {
          model: db.Resolutions,
          attributes: ["tiempos"],
          //required: true,
        },
      ],
      raw: true,
    });

    if (ticket.length > 0) {
      const integrity = bcrypt.hashSync(
        manejoFechas.fecha_yyyy_mm_dd_hh(ticket.fecha) +
          ticket.hora +
          ticket.user +
          manejoFechas.fecha_yyyy_mm_dd_hh(ticket.fechaProgreso),
        10
      );
      console.log(integrity);
      console.log(ticket.integrity);
      if (integrity != ticket.integrity) {
        return res.status(401).json({
          error: "Not integrity",
        });
      }
      res.status(201).json(ticket);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
