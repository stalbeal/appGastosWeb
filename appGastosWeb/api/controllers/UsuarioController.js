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
                req.session.flash = {
                    err: err
                }
                return res.redirect('/usuario/new')
            }

            Saldo.count(function saldoCounted(err, count) {
                if (err)
                    req.session.flash = {
                    err: err
                }
                
                if (count > 0)
                    return res.redirect('/usuario/history/' + user.id);
                saldo = {
                    saldo: 0
                }
                Saldo.create(saldo, function saldoCreated(err, saldo) {
                    if (err)
                        req.session.flash = {
                    err: err
                }

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

                    req.session.flash = {
                    err: err
                }
                }
                
                Gasto.find()
                    .sort({
                        createdAt: 'desc'
                    })
                    .limit(5)
                    .exec(function(err, gastos) {
                        if (err) {

                            req.session.flash = {
                          err: err
                         }
                        }

                        Giro.find()
                            .sort({
                                createdAt: 'desc'
                            })
                            .limit(5)
                            .exec(function(err, giros) {
                                if (err) {

                                    req.session.flash = {
                                        err: err
                                    }
                                }



                                Saldo.find().limit(1).exec(function saldoFounded(err, saldos) {
                                    // body...

                                    if (err)
                                        req.session.flash = {
                                        err: err
                                    }
                                    //console.log('saldito '+saldos[0].saldo);

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
    }, edit: function  (req, res, next) {
        
        Usuario.findOne(req.param('id'), function usuarioEncontrado (err, usuario) {
             if (err) {
                req.session.flash = {
                    err: err
                }
            }
            
            return res.view({
                usuario: usuario
            });
        });
    }, update: function (req, res, next){
        

        var user = {
            nombre: req.param('nombre'),
            usuario: req.param('usuario'),
            contraseña: req.param('contraseña'),
            confirmacionContrasena: req.param('confirmacionContrasena'),
            tipo: req.param('tipo')
        }

        
        Usuario.update(req.param('id'), user, function usuarioUpdated(err) {
            if (err) {
                req.session.flash = {
                    err: err
                }
            }
            return res.redirect('/usuario/show/' + req.param('id'));
        });
    },index: function(req, res, next) {
        Usuario.find(function usuarioFounded(err, usuarios) {
            if (err) {
                
                if(err)
                req.session.flash = {
                    err: err
                }
            }
            return res.view({
                usuarios: usuarios
            });
        });
    }, destroy:function (req,res,next) {
        Usuario.destroy(req.param('id'), function (err) {
            if(err)
                req.session.flash = {
                    err: err
                }
            res.redirect('/usuario/history');
            // body...
        });
    }, show: function(req, res, next) {
        Usuario.findOne(req.param('id'), function facturaEncontrada(err, usuario) {
            if (err)
                req.session.flash = {
                    err: err
                }

            return res.view({
                usuario: usuario
            });
        });
            

    }

};