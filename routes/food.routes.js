const express = require('express');
const router = require("../controllers/food.controllers.js");

const route = express();

route.get("/food",controllers.mostrarTodo)
.post("/food", controllers.ingresafood)
.put("/food/:id",controladorVinos.editarVino)
.delete("/food/:id",controladorVinos.eliminarVino)

module.exports = router
