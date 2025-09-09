const express = require("express");
const productsRouter = express.Router();
const userDataValidation = require("../middlewares/userDataValidation");
const productsController = require("../controller/productsController");

productsRouter.get("/", productsController.index);

productsRouter.get("/:slug", productsController.show);

productsRouter.delete("/:id", productsController.destroy);

productsRouter.patch(
    "/:id",
    userDataValidation(["name", "description", "price", "discount", "category_id"]),
    productsController.update);

productsRouter.post(
    "/",
    userDataValidation(['name', 'description', 'price', 'discount']),
    productsController.store);

module.exports = productsRouter;
