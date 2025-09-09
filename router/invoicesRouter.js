const express = require("express");
const invoicesRouter = express.Router();
const invoiceController = require("../controller/invoiceController");
const userDataValidation = require("../middlewares/userDataValidation");

invoicesRouter.post(
    "/",
    userDataValidation(['name', 'last_name', 'emai', 'address', 'city', 'cap', 'country', 'payment_method']),
    invoiceController.store);

invoicesRouter.get("/", invoiceController.index);

invoicesRouter.get("/:id", invoiceController.show);

invoicesRouter.delete("/:id", invoiceController.destroy);

invoicesRouter.patch(
    "/:id",
    userDataValidation(['name', 'last_name', 'emai', 'address', 'city', 'cap', 'country', 'payment_method']),
    invoiceController.update);

module.exports = invoicesRouter;
