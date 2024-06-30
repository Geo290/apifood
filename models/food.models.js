const {Schema, model} = require("mongoose");

const foodSchema = new Schema({
    name:
    {
        type:String,
        require:true
    },
    ingredients:
    {
        type:[String],
        require:true
    },
    cost:
    {
        type:Number,
        require:true
    },
    description:
    {
        type:String,
        require:true
    }
    
},{
    timestamps: true
});

const foodModel  = model('dishes', foodSchema);

module.exports = {foodModel};