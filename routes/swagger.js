const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NEW PROJECT",
      version: "1.0.0",
      description: "NEW PROJECT DESCRIPTION",
    },
    servers: [
      {
        url: `localhost:${port}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};
const specs = swaggerJsdoc(options);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;
