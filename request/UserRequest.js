class UserRequest {
    static nombre;
    static correo;
    static password; 
    static rol;

    constructor(user) {
        this.nombre = user && user.nombre? user.nombre : null;
        this.correo = user && user.correo? user.correo : null;
        this.password = user && user.password? user.password : null;
        this.rol = user && user.rol? user.rol : null;
    }
}

module.exports = { UserRequest };