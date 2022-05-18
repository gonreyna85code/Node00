const router = require("express").Router();
const ewelink = require("ewelink-api");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./config.json"));

const connection = new ewelink({
  email: config.sonoff.user,
  password: config.sonoff.password,
  region: config.sonoff.region,
});

router.get("/daemon/on", async (req, res) => {
  await connection.getCredentials();
  const devices = await connection.getDevices();
  const list = await devices.map((device) => {
    return {
      id: device.deviceid,
      ip: device.ip,
      name: device.name,
      tags: device.tags,
      info: device.params,
    };
  });
  const socket = await connection.openWebSocket(async (data) => {
    //console.log(data);
    //console.log(list);
    switch (data.userAgent) {
      case "app":
        console.log(
          await list.filter((device) => {
            if (device?.id.toString() === data?.deviceid.toString()) {
              return {
                name: device.name,
                action: data.params,
              };
            }
          })
        );

        const res = await list.find((device) => {
          data.deviceid.includes(device.id);
        });
        if (res) {
          console.log(res.name);
        }
        break;
      case "device":
        console.log(data.params);
        break;
      default:
        console.log("algo");
    }
  });
  res.send("Daemon Listening");
});

router.get("/daemon/off", async (req, res) => {
  connection.closeWebSocket();
  res.send("Daemon Stopped");
});

module.exports = router;
