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
                 return next(err);

            
        var saldo={
            saldo:saldos[0].saldo+req.param('valor')
        }

        Saldo.update(saldos[0], saldo, function saldoUpdated(err) {
            if (err) {
                return next(err);
            }
        });

        });

        
        

        Giro.create(giro, function usuarioCreado(err, giro) {
            if (err) {
                //console.log(err); //nos muestra el error por consola
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
                return next(err);

            Usuario.findOne(giro.usuario, function usuarioGiro (err, usuario) {
            if (err)
                return next(err);
            res.view({
                giro: giro,
                usuario:usuario
            });
        });

        });
    },index: function(req, res, next) {
        Giro.find(function giroFounded(err, giros) {
            if (err) {
                console.log(err); //
                return;
            }
            return res.view({
                giros: giros
            });
        });
    }, destroy:function (req,res,next) {
        Giro.destroy(req.param('id'), function (err) {
            if(err)
                return next(err);
            res.redirect('/usuario/history');
            // body...
        });
    }
};

