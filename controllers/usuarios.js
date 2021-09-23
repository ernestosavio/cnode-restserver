const {response, request} = require('express');

const usuariosGet = (req, res) => {

    const {q, nombre = 'No name', 
    apikey, page = 1, limit} = req.query;

    res.json({
        "msg": "get API - controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPost = (req, res) => {

    const {nombre, edad} = req.body;

    res.json({
        "msg": "Post API - controlador",
        nombre,
        edad
    })
}

const usuariosPut = (req, res) => {

    const {id} = req.params

    res.json({
        "msg": "Put API - controlador",
        id,
    })
}


const usuariosDelete = (req, res) => {
    res.json({
        "msg": "Delete API - controlador"
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