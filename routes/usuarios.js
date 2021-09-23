const { Router } = require("express");
const {usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuarios');
const router = new Router();


router.get('/', usuariosGet);

router.post('/', usuariosPost);

router.put('/:id', usuariosPut);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);















module.exports = router;