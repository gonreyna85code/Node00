const router = require("express").Router();
const ewelink = require("ewelink-api");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./config.json"));

const connection = new ewelink({
  email: config.sonoff.user,
  password: config.sonoff.password,
  region: config.sonoff.region,
});

router.get("/", async (req, res) => {
  const devices = await connection.getDevices();
  const list = devices.map((device) => {
    return {
      id: device.deviceid,
      ip: device.ip,
      name: device.name,
      tags: device.tags,
      info: device.params,            
    };
  });
  module.exports.list = list;
  res.send(list);
});

module.exports = router;