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
        var user = {
            nombre: req.param('nombre'),
            usuario: req.param('usuario'),
            contraseña: req.param('contraseña'),
            confirmacionContrasena: req.param('confirmacionContrasena'),
            tipo: req.param('tipo')
        }

        Usuario.create(user, function usuarioCreated(err, user) {
            if (err) {
                //console.log(err); //nos muestra el error por consola
                req.session.flash = {
                    err: err
                }
                return res.redirect('/usuario/new')
            }

            Saldo.count(function saldoCounted(err, count) {
                if (err)
                    return next(err);
                console.log('cuenta ' + count);
                if (count > 0)
                    return res.redirect('/usuario/history/' + user.id);
                saldo = {
                    saldo: 0
                }
                Saldo.create(saldo, function saldoCreated(err, saldo) {
                    if (err)
                        return next(err);

                    return res.redirect('/usuario/history/');
                });

            });


        });
    },
    history: function(req, res, next) {

        Factura.find()
            .sort({
                createdAt: 'desc'
            })
            .limit(5)
            .exec(function(err, facturas) {
                if (err) {

                    return next(err);
                }
                console.log(facturas);
                Gasto.find()
                    .sort({
                        createdAt: 'desc'
                    })
                    .limit(5)
                    .exec(function(err, gastos) {
                        if (err) {

                            return next(err);
                        }

                        Giro.find()
                            .sort({
                                createdAt: 'desc'
                            })
                            .limit(5)
                            .exec(function(err, giros) {
                                if (err) {

                                    return next(err);
                                }



                                Saldo.find().limit(1).exec(function saldoFounded(err, saldos) {
                                    // body...

                                    if (err)
                                        return next(err);

                                    res.view({
                                        facturas: facturas,
                                        gastos: gastos,
                                        giros: giros,
                                        saldo: saldos[0]
                                    });

                                });

                            });
                    });

            });
    }

};