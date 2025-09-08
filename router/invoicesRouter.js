const express = require("express");
const invoicesRouter = express.Router();
const invoiceController = require("../controller/invoiceController");
const userDataValidation = require("../middlewares/userDataValidation");

invoicesRouter.post("/", userDataValidation, invoiceController.store);

invoicesRouter.get("/", invoiceController.index);

invoicesRouter.get("/:id", invoiceController.show);

module.exports = invoicesRouter;
