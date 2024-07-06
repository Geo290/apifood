const { Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
},{
    timestamps: true
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

UserSchema.methods.valitePassword = function(password){
    return bcrypt.compare(password, this.password);
};

module.exports = model('User', UserSchema)