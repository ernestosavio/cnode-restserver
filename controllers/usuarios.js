const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const { UserRequest } = require('../request/UserRequest');

const Usuario = require('../models/usuario');

const usuariosGet = async(req, res) => {

    //const {q, nombre = 'No name', apikey, page = 1, limit} = req.query;
    const {limite = 5, desde=0} = req.query;
    const query = {estado:true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        "msg": "get API - controlador",
        total,
        usuarios
    })
}

const usuariosPost = async (req, res) => {

    let request = new UserRequest(req.body);
    // const {nombre, correo, password, rol} = req.body;
    // const usuario = new Usuario({response, correo, password, rol});
    const usuario = new Usuario(request);

 
    // Encriptar la contraseña (hash)
    const salt = await bcryptjs.genSaltSync(10);
    usuario.password = await bcryptjs.hashSync(usuario.password, salt);

    // Guardar en DB
    await usuario.save();

    res.json({
        "msg": "Post API - controlador",
        usuario
    })
}

const usuariosPut = async(req, res) => {

    const {id} = req.params;
    const {_id, password, google,correo, ...resto} = req.body;

    if (password) {
        // Encriptar la contraseña (hash)
        const salt = await bcryptjs.genSaltSync(10);
        resto.password = await bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        "msg": "Put API - controlador",
        usuario
    })
}


const usuariosDelete = async(req, res) => {

    const { id } = req.params

    // Fisicamente borrado
    //const usuario = await Usuario.findByIdAndRemove(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});

    res.json({
        "msg": "Delete API - controlador",
        usuario
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        "msg": "Patch API - controlador"
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
}