const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.models.js');
const messages = require('../utils/messages.js');

const { messageGeneral } = messages;
const userCtrl = {};

userCtrl.register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Encripta la contraseña
        const user = await UserModel.create({ ...req.body, password: hashedPassword });
        res.json({
            message: messageGeneral,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al registrar usuario",
            error: error.message
        });
    }
};

userCtrl.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Contraseña incorrecta"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username
            },
            process.env.SECRET_KEY,
            {
                expiresIn: 60 * 60 * 24
            }
        );

        res.json({
            message: "Login exitoso",
            token
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al iniciar sesión",
            error: error.message
        });
    }
};

module.exports = userCtrl;
