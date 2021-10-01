const Role = require('../models/role');
const Usuario = require('../models/usuario');



const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe en la DB`);
    }
}

const emailExiste = async(correo) => {
    let existeEmail = await Usuario.findOne( {correo} );

    if(existeEmail) {
        throw new Error(`El email: ${correo} ya esta registrado`);
    }
}

const existeUsuarioPorId = async(id) => {
    let existeUsuario = await Usuario.findById(id);
    if(!existeUsuario) {
        throw new Error(`El id ${id} no existe en la DB`);
        
    }
}
    
module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}