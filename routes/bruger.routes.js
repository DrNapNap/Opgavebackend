const express = require("express");
const router = express.Router();

const Bruger = require("../models/bruger.model");

router.get("/Bruger", async (req, res) => {
  try {
    const bruger = await Bruger.find();
    res.json(bruger);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getBruger, (req, res) => {
  res.json(res.leBruger);
});

router.post("/", async (req, res) => {

  const bru = new Bruger({
    brugernavn: req.body.brugernavn,
    email: req.body.email,
    password: req.body.password
  });
  try {
    const newGbru = await bru.save();
    res.status(201).json(newGbru);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getBruger, async (req, res) => {
  try {
    await res.leBruger.remove();
    res.json({message: "Deleted bruger"})
  } catch (err) {
    
  }
})




router.patch("/:id",getBruger , async (req, res)  => {
  if(req.body.gaade != null){
    res.leGaader.gaade = req.body.gaade;
  }
  if (req.body.svar != null) {
    res.leGaader.svar = req.body.svar;
  }
  try {
    const updatedGaader = await res.leGaader.save();
    res.json(updatedGaader);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

async function getBruger(req, res, next) {
  let leBruger;
  try {
    leBruger = await Bruger.findById(req.params.id);
    if (leBruger == null) {
      return res.status(404).json({ message: " kan ikke fin bruger" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.leBruger = leBruger;
  next();
}

module.exports = router;
