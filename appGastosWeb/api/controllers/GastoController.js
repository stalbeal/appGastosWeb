/**
 * GastoController
 *
 * @description :: Server-side logic for managing Prestamoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	new:function  (req,res,next) {
                
        res.view();

	},create: function(req, res, next) {
	   var fechaCan;
        if (req.param('estado')=== 'Cancelado') {
            fechaCan= sails.date();
            Saldo.find().limit(1).exec(function saldoFounded(err, saldos) {            
           if (err)
                req.session.flash = {
                    err: err
                }

            
        var saldo={
            saldo:saldos[0].saldo-req.param('valor')
        }

        Saldo.update(saldos[0], saldo, function saldoUpdated(err) {
            if (err) {
                req.session.flash = {
                    err: err
                }
            }
        });
        });
        }else{
            fechaCan='N/A             ';
        }
        var gasto={
            descripcion: req.param('descripcion'),
            valor: req.param('valor'),
            estado: req.param('estado'),
            fechaIngreso: sails.date(),
            fechaCancelado: fechaCan,
            tipo: req.param('tipo'),
            usuario:req.session.Usuario.id
        }

        Gasto.create(gasto, function usuarioCreated(err, gasto) {
            if (err) {
                req.session.flash = {
                    err: err
                }
                return res.redirect('/gasto/new')
            }
            return res.redirect('/gasto/show/' + gasto.id);

        });
    },show: function(req, res, next) {
        Gasto.findOne(req.param('id'), function gastoFounded(err, gasto) {
            if (err)
                req.session.flash = {
                    err: err
                }


        Usuario.findOne(gasto.usuario, function usuarioGasto (err, usuario) {
            if (err)
                req.session.flash = {
                    err: err
                }
            res.view({
                gasto: gasto,
                usuario:usuario
            });
        });
            

        });
    }, edit: function  (req, res, next) {
        
        Gasto.findOne(req.param('id'), function gastoEncontrado (err, gasto) {
             if (err) {
                req.session.flash = {
                    err: err
                }
            }
            
            return res.view({
                gasto: gasto
            });
        });
    }, update: function (req, res, next){
        var fechaCan;
        if (req.param('estado')=== 'Cancelado') {
            fechaCan= sails.date();
            Saldo.find().limit(1).exec(function saldoFounded(err, saldos) {            
           if (err)
                req.session.flash = {
                    err: err
                }

            
                var saldo={
                    saldo:saldos[0].saldo-req.param('valor')
                }

                Saldo.update(saldos[0], saldo, function saldoUpdated(err) {
                    if (err) {
                        req.session.flash = {
                    err: err
                }
                    }
                });
                });
        }else{
            fechaCan='N/A';
        }
        var gasto={
            descripcion: req.param('descripcion'),
            valor: req.param('valor'),
            estado: req.param('estado'),
            fechaIngreso: sails.date(),
            fechaCancelado: fechaCan,
            tipo: req.param('tipo'),
            usuario:req.session.Usuario.id
        }
        
        Gasto.update(req.param('id'), gasto, function gastoUpdated(err) {
            if (err) {
                req.session.flash = {
                    err: err
                }
            }
            return res.redirect('/gasto/show/' + req.param('id'));
        });
    }, updatestate: function (req, res, next){
        
        var gasto={
            
            estado: "Cancelado",           
            fechaCancelado: sails.date()
           
        }

        Gasto.findOne(req.param('id'),function gastoFounded(err, gasto) {
            if (err) {
                req.session.flash = {
                    err: err
                }
            }
           Saldo.find().limit(1).exec(function saldoFounded(err, saldos) {            
           if (err)
                req.session.flash = {
                    err: err
                }

            
        var saldo={
            saldo:saldos[0].saldo-gasto.valor

        }

        Saldo.update(saldos[0], saldo, function saldoUpdated(err) {
            if (err) {
                req.session.flash = {
                    err: err
                }
            }
        });

        });

        });

        
            Gasto.update(req.param('id'), gasto, function gastoUpdated(err) {
                if (err) {
                    req.session.flash = {
                    err: err
                }
                    
                }
                return res.redirect('/usuario/history' );
            });
    }, index: function(req, res, next) {
        Gasto.find()
            .sort({
                createdAt: 'desc'
            })
            .exec(function(err, gastos) {
                if (err) {

                    req.session.flash = {
                    err: err
                }
                }
            return res.view({
                gastos: gastos
            });
        });
    }, destroy:function (req,res,next) {
        Gasto.destroy(req.param('id'), function (err) {
            if(err)
                req.session.flash = {
                    err: err
                }
            res.redirect('/usuario/history');
            // body...
        });
    }
};

