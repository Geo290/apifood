const {Schema, model} = require("mongoose");
const userSchema = new Schema({
    username: {
        type: String,
        required: true
        },
    password: {
        type: String,
        required: true
    },},{
        timestamps: true
    })

   const UserModel = model("username", userSchema);
   module.exports = UserModel;