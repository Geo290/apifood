//Importar el archivo del Model
const { foodModel } = require("../models/food.models.js");
const { message } = require("../utils/messages.js");

const foodCtrl = {};
const { messageGeneral } = message;

//New register food
foodCtrl.newDish = async (req, res) => {
    try {
        const data = req.body;
        const resp = await foodModel.create(data);
        messageGeneral(res, 201, true, resp, "Registro creado");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};


//Consult all records
foodCtrl.listDishes = async (req, res) => {
    try {
        const resp = await foodModel.find().populate({
            path: "name"
        });
        messageGeneral(res,);
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
}

//Update 
foodCtrl.updateDish = async (req, res) => {
    try {
        const { name } = req.params;
        const resp = await foodModel.findById(name);
        if (!resp) {
            return messageGeneral(res, 404, false, "", "Registro no encontrada");
        }
        await resp.updateOne(req.body);
        messageGeneral(res, 200, true, "", "Registro actualizada");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
}

//Delete
foodCtrl.deleteDish = async (req, res) => {
    try {
        const { name } = req.params;
        const resp = await foodModel.findById(name);
        if (!resp) {
            return messageGeneral(res, 404, false, "", "Registro no encontrado");
        }
        await resp.deleteOne();
        messageGeneral(res, 200, true, "", "Registro eliminado");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};

//Consult by product name
foodCtrl.getDish = async (req, res) => {
    try {
        const { name } = req.params;
        const resp = await foodModel.findOne({ name });
        if (!resp) {
            return messageGeneral(res, 404, false, "", "Registro no encontrado");
        }
        messageGeneral(res, 200, true, resp, "Registro encontrado")
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
}

module.exports = foodCtrl;