const router = require("express").Router();
const fs = require("fs");

router.get("/config", (req, res) => {
  const config = JSON.parse(fs.readFileSync("./config.json"));
  res.json(config);
});

router.post("/config", async (req, res) => {
  try {
    const config = req.body;
    fs.writeFileSync("./config.json", JSON.stringify(config));
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
