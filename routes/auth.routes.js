const express = require("express");
const router = express.Router();

const Bruger = require("../models/bruger.model");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const bruger = await Bruger.findOne({ email: email });
if (!bruger){
  return res.status(401).json({message: "email findes ikke i systemet"})
}
bruger.comparePassword(password, function(err, isMatch){
  console.log("bruger2", bruger)

  if (err) {
    throw err;
  }
  if(isMatch) {
    req.session.userId = bruger._id;

    res.status(200).json({message: bruger.brugernavn + "er nu logget ind"})
  }else{
    res.status(401).json({message: "Udbikke logget ind"})
  }
})


});

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400);
    }
    res.clearCookie(process.env.SESSION_NAME).status(200).json({message: 'du er logget ud'});

  });
});

router.get('/loggedin', async (req, res ) => {
  if (req.session.userId){
    return res.status(200).json({message: 'logind'})
  }else {
return res.status(401).json({message: 'login eksisterer ikke eller er udløbet'})
  }
})

module.exports = router;
