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
            nombre:req.param('nombre'),
           	usuario: req.param('usuario'),
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

        Factura.find()
        .sort({ createdAt: 'desc' })
        .exec(function(err, facturas) {
            if (err) {
                
                return next(err); 
            }
            console.log(facturas);
            Gasto.find()
            .sort({ createdAt: 'desc' })
            .exec(function(err, gastos) {

                if (err) {
                   
                    return next(err);
                }

                Giro.find()
                .sort({ createdAt: 'desc' })
                .exec(function(err, giros) {
                    if (err) {
                        
                        return next(err); 
                    }

                    Saldo.findOne('54ac9015bbda1e91a811927a', function gastoFounded(err, saldo) {
                        if (err)
                            return next(err);

                    res.view({

                        facturas: facturas,
                        gastos: gastos,
                        giros: giros,
                        saldo:saldo
                    });

                });

                });
            });

        });
    }

};