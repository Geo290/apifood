const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models.js');
const { messageGeneral } = require('../utils/messages');

const userCtrl = {};

userCtrl.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return messageGeneral(res, 400, false, "", "El nombre de usuario ya existe");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });
        const token = jwt.sign({ _id: newUser._id }, secretKey); // Usa secretKey directamente aquí

        messageGeneral(res, 201, true, { ...newUser._doc, password: null, token }, "El usuario se creó correctamente!!!");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};

userCtrl.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            return messageGeneral(res, 400, false, "", "El nombre de usuario no existe");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return messageGeneral(res, 400, false, "", "La contraseña es incorrecta!!!");
        }

        const token = jwt.sign({ _id: user._id }, secretKey); // Usa secretKey directamente aquí

        return messageGeneral(res, 200, true, { ...user._doc, password: null, token }, "Bienvenido!!!");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};

module.exports = userCtrl;