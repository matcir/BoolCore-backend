const express = require("express");
const imagesRouter = express.Router();
const imagesController = require("../controller/imagesController");
const userDataValidation = require("../middlewares/userDataValidation");

imagesRouter.get("/", imagesController.index);

imagesRouter.get("/:id", imagesController.show);

imagesRouter.post(
    "/",
    userDataValidation(["image", "id_product"]),
    imagesController.store
);

imagesRouter.patch(
    "/:id",
    userDataValidation(["image"]),
    imagesController.update
);

imagesRouter.delete("/:id", imagesController.destroy);

module.exports = imagesRouter;