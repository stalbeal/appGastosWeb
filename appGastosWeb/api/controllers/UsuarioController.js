/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing Usuarios
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	new: function(req, res, next) {
        res.view();
    },
    login: function(req, res, next) {
        res.view();
    },
    create: function(req, res, next) {
        var user={
           	usuario: req.param('nombre'),
            contraseña: req.param('contraseña')
        }

        Usuario.create(user, function usuarioCreated(err, user) {
            if (err) {
                //console.log(err); //nos muestra el error por consola
                req.session.flash = {
                    err: err
                }
                return res.redirect('/usuario/new')
            }
            return res.redirect('/usuario/history/' + user.id);

        });
    },
    history: function(req, res, next) {

        Factura.find(function facturaFounded(err, facturas) {
            if (err) {
                console.log(err); //
                return;
            }
            console.log(facturas);
            Gastos.find(function gastosFounded(err, gastos) {
                if (err) {
                    console.log(err); //
                    return;
                }
                Giros.find(function clienteFounded(err, giros) {
                    if (err) {
                        console.log(err); //
                        return;
                    }

                    res.view({

                        facturas: facturas,
                        gastos: gastos,
                        giros: giros
                    });

                });
            });

        });
    }

};