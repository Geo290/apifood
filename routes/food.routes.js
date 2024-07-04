const express = require('express');
const controller = require("../controllers/food.controllers.js");

const router = express.Router();

//nombre
router.get("/", controller.listDishes);
router.get("/get/by-name", controller.getDishesByName);
router.post("/new", controller.newDish);
router.put("/update/by-name", controller.updateDishesByName);
router.delete("/delete/by-name", controller.deleteDishesByName);

//costo
router.get("/get/by-cost", controller.getDishesByCost);
router.put("/update/by-cost", controller.updateDishesByCost);
router.delete("/delete/by-cost", controller.deleteDishesByCost);

//ingredientes
router.get("/get/by-ingredients", controller.getDishesByIngredients);
router.put("/update/by-ingredients", controller.updateDishesByIngredients);
router.delete("/delete/by-ingredients", controller.deleteDishesByIngredients);

// == == == THIS IS CALLED WHITE LIST == == ==
router.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
// == == == == == == == == == == == == == == ==

module.exports = router;
