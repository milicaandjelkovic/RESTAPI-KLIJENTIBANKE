const express = require("express");
const Model = require("../model/model");
const router = express.Router();

/**
 * GET    /post     - get all
 * GET    /post/:id - get by id
 * POST   /post     - insert
 * PUT    /post     - update
 * DELETE /post     - delete
 */

router
  .get("/model", async (req, res) => {
    try {
      const data = await Model.find();
      res.json(data);
    } catch (error) {
      res.status(500).json({ poruka: error.message });
    }
  })
  .get("/model/:id", async (req, res) => {
    try {
      const data = await Model.find({ id_klijenta: req.params.id });
      if (data.length != 0) {
        res.status(200).json(data);
      } else {
        res
          .status(400)
          .json({ poruka: `Klijent sa ID ${req.params.id} nije pronađen.` });
      }
    } catch (error) {
      res.status(500).json({ poruka: error.message });
    }
  })
  .post("/model", async (req, res) => {
    const data = new Model(req.body);
    try {
      data.save();
      res.status(200).json({
        poruka: `Klijent sa ID ${req.body.id_klijenta} je uspešno unet!`,
      });
    } catch (error) {
      res.status(400).json({ poruka: error.message });
    }
  })
  .put("/model/:id", async (req, res) => {
    try {
      const result = await Model.updateOne(
        { id_klijenta: req.params.id },
        req.body
      );
      res.status(200).json(
        result.matchedCount != 0
          ? {
              poruka: `Klijent sa ID ${req.params.id} je uspešno ažuriran.`,
            }
          : { poruka: `Klijent sa ID ${req.params.id} nije pronađen.` }
      );
    } catch (error) {
      res.status(400).json({ poruka: error.message });
    }
  })
  .delete("/model/:id", async (req, res) => {
    try {
      const result = await Model.deleteOne({ id_klijenta: req.params.id });
      res.status(200).json(
        result.deletedCount != 0
          ? {
              poruka: `Klijent sa ID ${req.params.id} je uspešno obrisan.`,
            }
          : { poruka: `Klijent sa ID ${req.params.id} nije pronađen.` }
      );
    } catch (error) {
      res.status(400).json({ poruka: error.message });
    }
  });

module.exports = router;
