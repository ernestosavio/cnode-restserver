const { Router } = require("express");
const { check } = require('express-validator');

//const { validarJWT } = require("../middlewares/validar-jwt");
//const {validarCampos} = require('../middlewares/validar-campos');
//const { esAdminRole, tieneRol } = require("../middlewares/validar-roles");
const { validarJWT, 
        validarCampos, 
        tieneRol } = require('../middlewares/index');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = new Router();


router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mas de 6 caracteres').isLength({min: 6}),
    //check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( (correo = '') => emailExiste(correo)),
    //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom( (rol = '') => esRoleValido(rol) ),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom( (id = '') => existeUsuarioPorId(id) ),
    check('rol').custom( (rol = '') => esRoleValido(rol) ),
    validarCampos
], usuariosPut);

router.delete('/:id',[
    validarJWT,
    //esAdminRole, // Este middleware fuerza a que sea ADM
    tieneRol('ADMIN_ROL', "VENTAS_ROL"),
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom( (id = '') => existeUsuarioPorId(id) ),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;