const express = require("express");
const categoriesRouter = express.Router();
const categoriesController = require("../controller/categoriesController");
const userDataValidation = require("../middlewares/userDataValidation");

categoriesRouter.get("/", categoriesController.index);

categoriesRouter.get("/:id", categoriesController.show);

categoriesRouter.post(
    "/",
    userDataValidation(["name"]),
    categoriesController.store);

categoriesRouter.patch(
    "/:id",
    userDataValidation(["name"]),
    categoriesController.update);

categoriesRouter.delete("/:id", categoriesController.destroy);

module.exports = categoriesRouter;