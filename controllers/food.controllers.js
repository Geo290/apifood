//Importar el archivo del Model
import {foodModel} from "../models/food.models.js"
import message from "../utils/messages.js";

const {messageGeneral} = message;
const foodCtrl = {};

//New register food
foodCtrl.ingresafood = async(req,res)=>{
    try {
        const data = req.body;
        const resp = await foodModel.create(data);
        messageGeneral(res,201,true,resp, "Registro creado");
    } catch (error) {
        messageGeneral(res,500,false,"",error.message);
    }
};


//Consult all records
foodCtrl.mostrarTodo = async(req,res)=>{
    try {
        const resp = await foodModel.find().populate({
            path: "folio"})
            messageGeneral(res,)
    } catch (error) {
        messageGeneral(res,500,false,"",error.message);
    }
}

//Update 
foodCtrl.editarVino = async(req,res)=>{
    try {
        const { id } = req.params;
        const resp = await foodModel.findById(id);
        if(!resp){
            return messageGeneral(res,404,false,"","Registro no encontrada");
        }
        await resp.updateOne(req.body);
        messageGeneral(res,200,true,"","Registro actualizada");
    } catch (error) {
        messageGeneral(res,500,false,"",error.message);
    }
}

//Delete
foodCtrl.eliminarVino = async(req,res) =>{
    try {
        const { id } = req.params;
        const resp = await foodModel.findById(id);
        if(!resp){
            return messageGeneral(res,404,false,"","Registro no encontrado");
        }
        await resp.deleteOne();
        messageGeneral(res,200,true,"","Registro eliminado");
    } catch (error) {
        messageGeneral(res,500,false,"",error.message);
    }
};

//Consult by product name
foodCtrl.listByName = async(req,res) => {
    try {
        const { name } = req.params;
        const resp = await foodModel.findOne({ name });
        if(!resp){
            return messageGeneral(res,404,false,"","Registro no encontrado");
        }
        messageGeneral(res,200,true,resp,"Registro encontrado")
    } catch (error) {
        messageGeneral(res,500,false,"",error.message);
    }
}
