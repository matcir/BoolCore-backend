const express = require("express");
const detailsRouter = express.Router();
const userDataValidation = require("../middlewares/userDataValidation");
const detailsController = require("../controller/detailsController");

detailsRouter.get("/", detailsController.index);

detailsRouter.get("/:id", detailsController.show);

detailsRouter.post("/", detailsController.store);

detailsRouter.delete("/:id", detailsController.destroy);

detailsRouter.patch("/:id", detailsController.update);


module.exports = detailsRouter;