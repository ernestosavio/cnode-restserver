const { request, response, json } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const {generarJWT} = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


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

const googleSignIn = async(req = request, res = response) =>{

    const {id_token} = req.body;

    //console.log("ID TOKEN:", id_token);

    try {

        const {nombre, img, correo} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});
        if(!usuario) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: 'asd',
                img,
                rol: 'USER_ROLE',
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario en DB
        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el ADM, usuario bloqueado'
            })
        }

        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

}



module.exports = {
    login,
    googleSignIn
}