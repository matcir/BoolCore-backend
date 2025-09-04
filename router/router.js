const express = require("express")
const router = express.Router()

const controller = require("./controller/controller")

// ATTENZIONE LE ROTTE SONO PROVVISORIE

router.get("/", controller.index)

router.get("/:id", controller.show)

router.post("/:id/order", controller.store)

module.exports = router