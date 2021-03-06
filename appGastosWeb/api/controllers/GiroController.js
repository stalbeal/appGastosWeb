/**
 * GiroController
 *
 * @description :: Server-side logic for managing Giroes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	new:function  (req,res,next) {
		res.view();
	},create: function(req, res, next) {
	 	
        var giro={
           	descripcion: req.param('descripcion'),
            valor: req.param('valor'),
            codigo: req.param('codigo'),
            fecha: req.param('fecha'),
            usuario:req.session.Usuario.id
        }

        Saldo.find().limit(1).exec(function saldoFounded(err, saldos) {
              if (err)
                 req.session.flash = {
                    err: err
                }

            var res=saldos[0].saldo+parseFloat(req.param('valor'));
        var saldo={
            saldo:res
        }

        Saldo.update(saldos[0], saldo, function saldoUpdated(err) {
            if (err) {
                req.session.flash = {
                    err: err
                }
            }
        });

        });

        
        

        Giro.create(giro, function usuarioCreado(err, giro) {
            if (err) {
                req.session.flash = {
                    err: err
                }
                return res.redirect('/giro/new')
            }
            return res.redirect('/giro/show/' + giro.id);

        });

        

    },show: function(req, res, next) {

        Giro.findOne(req.param('id'), function giroEncontrado(err, giro) {
            if (err)
                req.session.flash = {
                    err: err
                }

            Usuario.findOne(giro.usuario, function usuarioGiro (err, usuario) {
            if (err)
                req.session.flash = {
                    err: err
                }
            res.view({
                giro: giro,
                usuario:usuario
            });
        });

        });
    },index: function(req, res, next) {
        Giro.find()
            .sort({
                createdAt: 'desc'
            })
            .exec(function(err, giros) {
                if (err) {

                    req.session.flash = {
                    err: err
                }
                }
            return res.view({
                giros: giros
            });
        });
    }, destroy:function (req,res,next) {
        Giro.destroy(req.param('id'), function (err) {
            if(err)
                req.session.flash = {
                    err: err
                }
            res.redirect('/usuario/history');
            // body...
        });
    },edit: function  (req, res, next) {
        
        Giro.findOne(req.param('id'), function giroEncontrado (err, giro) {
             if (err) {
                req.session.flash = {
                    err: err
                }
            }
            
            return res.view({
                giro: giro
            });
        });
    }, update: function (req, res, next){
        

        var giro={
            descripcion: req.param('descripcion'),
            
            codigo: req.param('codigo'),
            fecha: req.param('fecha'),
            valor:req.param('valor'),
            usuario:req.session.Usuario.id
        }

        
        Giro.update(req.param('id'), giro, function giroUpdated(err) {
            if (err) {
                req.session.flash = {
                    err: err
                }
            }
            return res.redirect('/giro/show/' + req.param('id'));
        });
    }
};

