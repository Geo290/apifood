const express = require('express');
const controller = require("../controllers/food.controllers.js");

const router = express.Router();

router.get("/food", controller.listDishes)
    .get("/food/:name", controller.getDish)
    .post("/food", controller.newDish)
    .put("/food/:name", controller.updateDish)
    .delete("/food/:name", controller.deleteDish);

module.exports = router;
