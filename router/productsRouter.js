const express = require("express");
const productsRouter = express.Router();

const productsController = require("../controller/productsController");
const invoiceController = require("../controller/invoiceController");

// ATTENZIONE LE ROTTE SONO PROVVISORIE

productsRouter.get("/", productsController.index);

productsRouter.get("/:id", productsController.show);

invoicesRouter.post("/", invoiceController.store);

module.exports = productsRouter;
