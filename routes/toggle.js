const router = require("express").Router();
const ewelink = require("ewelink-api");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./config.json"));

const connection = new ewelink({
  email: config.sonoff.user,
  password: config.sonoff.password,
  region: config.sonoff.region,
});

router.post("/toggle", async (req, res) => {
  const id = req.body.id;
  if (req.body.channel) {
    const status = await connection.toggleDevice(id, req.body.channel);
    res.send(status);
  } else {
    const status = await connection.toggleDevice(id);
    res.send(status);
  }
});

module.exports = router;
