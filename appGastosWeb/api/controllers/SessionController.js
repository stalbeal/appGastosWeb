/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcrypt');
module.exports = {

    login: function(req, res, next) {
        res.view();
    },
    create: function(req, res, next) {
        var usuario = req.param('usuario');
        var contrasena = req.param('contrasena');
        console.log(req.param('contrasena'));

        if (!usuario || !contrasena) {
            var error = [{
                mensaje: 'Error de validacion'
            }]
            req.session.flash = {
                err: error
            }
            return res.redirect('/session/login');
        }

        Usuario.findOneByUsuario(usuario, function usuarioEncontrado(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                var errNoExiste = [{
                    mensaje: 'El usuario no existe'
                }]
                req.session.flash = {
                    err: errNoExiste
                }
                return res.redirect('/session/login');
            }

            console.log(user.contraseña);

                if (contrasena!==user.contraseña) {
                    var contrasenaErronea = [{
                        mensaje: 'La contraseña no coincide'
                    }]
                    req.session.flash = {
                        err: contrasenaErronea
                    }
                    return res.redirect('/session/login');
                }

                req.session.Usuario=user;
                
                return res.redirect('/usuario/history');


            

        });




    }

};