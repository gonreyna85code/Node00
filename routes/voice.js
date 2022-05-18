const router = require("express").Router();
const fs = require("fs");
var GoogleHomePlayer = require('google-home-player');

const config = JSON.parse(fs.readFileSync("./config.json"));
var googleHome = new GoogleHomePlayer(config.google.device00.ip, 'es-ar');

router.post("/voice", async (req, res) => {
  const message = req.body.message;  
    await googleHome.say(message, 'es-ar', false);
  res.sendStatus(200);
});

module.exports = router;
