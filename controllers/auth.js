const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const {generarJWT} = require("../helpers/generar-jwt");


const login = async (req = request, res = response) => {

    const {correo, password} = req.body;

    try {

        // Verificar si email existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario / Password no son correstos - correo"
            })
        }

        // Si el usuario esta activo en la DB
        if (!usuario.estado) /*(usuario.estado === false)*/ {
            return res.status(400).json({
                msg: "Usuario / Password no son correstos - estado: false"
            });
        }

        // Vefiricar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuario / Password no son correstos - password"
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: "login ok",
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo salio mal'
        });
    }



}


module.exports = {
    login
}