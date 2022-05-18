const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const port = process.env.PORT || 80;
require("dotenv").config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  "/",
  fs.readdirSync("./routes").map((file) => require(`./routes/${file}`))
); // importamos todas las rutas

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
