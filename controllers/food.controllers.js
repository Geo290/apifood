//Importar el archivo del Model
const { foodModel } = require("../models/food.models.js");
const { messageGeneral } = require("../utils/messages.js");

const foodCtrl = {};

//New register food
foodCtrl.newDish = async (req, res) => {
    try {
        const data = req.body;
        const resp = await foodModel.create(data);
        messageGeneral(res, 201, true, resp, "Registro creado");

    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
}

//Consult all records
foodCtrl.listDishes = async (req, res) => {
    try {
        const resp = await foodModel.find();
        messageGeneral(res, 201, true, resp, "Información obtenida");

    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
}

//Consult by product name
foodCtrl.getDishesByName = async (req, res) => {
    try {
        const { name } = req.query;
        const resp = await foodModel.findOne({ name });

        if (!resp) {
            return messageGeneral(res, 404, false, "", "Registro no encontrado");
        }

        messageGeneral(res, 200, true, resp, "Registro encontrado");

    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
}

//Consult by ingredient of the dish
foodCtrl.getDishesByIngredients = async (req, res) => {
    try {
        const { ingredients } = req.query;

        if (!ingredients) {
            return messageGeneral(res, 404, false, "", "Por favor, proporciona un ingrediente");
        }

        const ingredientsArray = ingredients.split(',').map(ingredients => ingredients.trim());
        const resp = await foodModel.find({ ingredients: {$in: ingredientsArray} });

        if(!resp || resp.length === 0) {
            return messageGeneral(res, 404, false, "", "Registro no encontrado");
        }

        messageGeneral(res, 200, true, resp, "Registro encontrado");

    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
}

//Check for product cost
foodCtrl.getDishesByCost = async (req, res) => {
    try {
        const { cost } = req.query;
        const resp = await foodModel.findOne({ cost });

        if (!resp) {
            return messageGeneral(res, 404, false, "", "Registro no encontrado"); 
        }

        messageGeneral(res, 200, true, resp, "Registro encontrado");

    } catch (error) {
         messageGeneral(res, 500, false, "", error.message);
    }
}

//Update 
foodCtrl.updateDishesByName = async (req, res) => {
    try {
        const { name } = req.query;
        const resp = await foodModel.findOne({ name });

        if (!resp) {
            return messageGeneral(res, 404, false, "", "Registro no encontrada");
        }

        await resp.updateOne(req.body);
        messageGeneral(res, 200, true, "", "Registro actualizado");

    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
}

//Update for cost
foodCtrl.updateDishesByCost = async (req, res) => {
    try {
        const { cost } = req.query;
        const resp = await foodModel.findOne({ cost });

        if (!resp) {
            return messageGeneral(res, 404, false, "", "Registro no encontrada");
        }

        await resp.updateOne(req.body);
        messageGeneral(res, 200, true, "", "Registro actualizado");

    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
}

// Update dish by ingredients
foodCtrl.updateDishesByIngredients = async (req, res) => {
    try {
        const { ingredients } = req.query;
        const { updateField } = req.body; // Assuming you receive fields to update

        if (!ingredients || !updateField) {
            return messageGeneral(res, 400, false, "", "Por favor, proporciona ingredientes y campos a actualizar");
        }

        const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());

        const updateResult = await foodModel.updateMany(
            { ingredients: { $in: ingredientsArray } },
            { $set: updateField }
        );

        if (updateResult.nModified === 0) {
            return messageGeneral(res, 404, false, "", "Ningún platillo encontrado para actualizar");
        }

        messageGeneral(res, 200, true, updateResult, "Platillos actualizados exitosamente");

    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
}


//Delete
foodCtrl.deleteDishesByName = async (req, res) => {
    try {
        const { name } = req.query;
        const resp = await foodModel.findOne({ name });

        if (!resp) {
            return messageGeneral(res, 404, false, "", "Registro no encontrado");
        }

        await resp.deleteOne();
        messageGeneral(res, 200, true, "", "Registro eliminado");

    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
}



//Delete for cost
foodCtrl.deleteDishesByCost = async (req, res) => {
    try {
        const { cost } = req.query;
        const resp = await foodModel.findOne({ cost });

        if (!resp) {
            return messageGeneral(res, 404, false, "", "Registro no encontrado");
        }

        await resp.deleteOne();
        messageGeneral(res, 200, true, "", "Registro eliminado");

    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
}

// Delete dish by ingredients
foodCtrl.deleteDishesByIngredients = async (req, res) => {
    try {
        const { ingredients } = req.query;

        if (!ingredients) {
            return messageGeneral(res, 400, false, "", "Por favor, proporciona ingredientes para eliminar");
        }

        const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());

        const deleteResult = await foodModel.deleteMany({ ingredients: { $in: ingredientsArray } });

        if (deleteResult.deletedCount === 0) {
            return messageGeneral(res, 404, false, "", "Ningún platillo encontrado para eliminar");
        }

        messageGeneral(res, 200, true, deleteResult, "Platillos eliminados exitosamente");

    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
}



module.exports = foodCtrl;