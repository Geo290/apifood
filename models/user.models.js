import mongoose from "mongosee";
const {Schema, model} = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
        },
    password: {
        type: String,
        required: true
    },},{
        timestamps: true
    })
    
    export default model("username", userSchema);