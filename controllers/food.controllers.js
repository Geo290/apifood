//Importar el archivo del Model
import {foodModel} from "../models/food.models.js"
import message from "../utils/messages.js";

const {messageGeneral} = message;
const foodCtrl = {};

//New register food
foodCtrl.createFood = async(req,res)=>{
    try {
        const data = req.body;
        const resp = await foodModel.create(data);
        messageGeneral(res,201,true,resp, "Registro creado");
    } catch (error) {
        messageGeneral(res,500,false,"",error.message);
    }
};


