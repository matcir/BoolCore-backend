const express = require("express");
const invoicesRouter = express.Router();

const invoiceController = require("../controller/invoiceController");

invoicesRouter.post("/", invoiceController.store);

invoicesRouter.get("/", invoiceController.index);

invoicesRouter.get("/:id", invoiceController.show);

module.exports = invoicesRouter;
