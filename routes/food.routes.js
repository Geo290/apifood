const express = require('express');
const controller = require("../controllers/food.controllers.js");

const router = express.Router();

router.get("/", controller.listDishes);
router.get("/get", controller.getDish);
router.post("/new", controller.newDish);
router.put("/update", controller.updateDish);
router.delete("/delete", controller.deleteDish);

// == == == THIS IS CALLED WHITE LIST == == ==
router.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
// == == == == == == == == == == == == == == ==

module.exports = router;
