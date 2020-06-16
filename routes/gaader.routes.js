const express = require("express");
const router = express.Router();

const Gaader = require("../models/gaader.model");


router.post('/admin', async (req, res) => {
  console.log("POST", req.body);
  
  const gaade = new Gaader(req.body);
  
  try {
    const nygaade = await gaade.save();
    res.status(400).json({message: "ny" , nygaade: nygaade})
  } catch (error) {
    
  }
  
  })

router.get("/gaader", async (req, res) => {
  try {
    const gaader = await Gaader.find();
    res.json(gaader);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getGaader, (req, res) => {
  res.json(res.leGaader);
});

router.post("/admin/", async (req, res) => {

  const gaader = new Gaader({
    gaade: req.body.gaade,
    svar: req.body.svar
  });
  try {
    const newGaader = await gaader.save();
    res.status(201).json(newGaader);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/admin/:id", getGaader, async (req, res) => {
  try {
    await res.leGaader.remove();
    res.json({message: "Deleted gaader"})
    
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})





router.patch("/admin/:id",getGaader , async (req, res)  => {
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

async function getGaader(req, res, next) {
  let leGaader;
  try {
    leGaader = await Gaader.findById(req.params.id);
    if (leGaader == null) {
      return res.status(404).json({ message: " kan ikke fin Gaader" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.leGaader = leGaader;
  next();
}

module.exports = router;
