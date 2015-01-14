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


            bcrypt.compare(contrasena,user.encryptedPassword, function passwordsMatch(err, valid) {
                if (err)
                    return next(err);
                if (!valid) {
                    var contrasenaErronea = [{
                        mensaje: 'La contraseña no coincide'
                    }]
                    req.session.flash = {
                        err: contrasenaErronea
                    }
                    return res.redirect('/session/login');
                }
                req.session.Usuario = user;
                req.session.authenticated= true;
                return res.redirect('/usuario/history');


            });






        });




    }, destroy: function (req, res, next) {
       req.session.destroy();
        res.redirect('session/login');
    }

};