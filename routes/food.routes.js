const express = require('express');
const controller = require("../controllers/food.controllers.js");
const verifyToken = require('../controllers/verifyToken.js')

const router = express.Router();

router.get("/",verifyToken, controller.listDishes);
router.get("/get",verifyToken, controller.getDish);
router.post("/new",verifyToken, controller.newDish);
router.put("/update",verifyToken, controller.updateDish);
router.delete("/delete",verifyToken, controller.deleteDish);

// == == == THIS IS CALLED WHITE LIST == == ==
router.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
// == == == == == == == == == == == == == == ==

module.exports = router;
