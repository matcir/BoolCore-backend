const express = require("express");
const productsRouter = express.Router();

const productsController = require("../controller/productsController");

// ATTENZIONE LE ROTTE SONO PROVVISORIE

productsRouter.get("/", productsController.index);

productsRouter.get("/:id", productsController.show);

module.exports = productsRouter;
