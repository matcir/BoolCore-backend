const express = require("express");
const productsRouter = express.Router();
const userDataValidation = require("../middlewares/userDataValidation");

const productsController = require("../controller/productsController");

productsRouter.get("/", productsController.index);

productsRouter.get("/:id", productsController.show);

productsRouter.post("/", userDataValidation(['name', 'description', 'price', 'discount']), productsController.store);

module.exports = productsRouter;
