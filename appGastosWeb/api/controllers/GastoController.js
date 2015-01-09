/**
 * GastoController
 *
 * @description :: Server-side logic for managing Prestamoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	new:function  (req,res,next) {
		//*******console.log(req.session.Usuario.usuario);
                
        res.view();

	},create: function(req, res, next) {
	   var fechaCan;
        if (req.param('estado')=== 'Cancelado') {
            fechaCan= sails.date();
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
                //console.log(err); //nos muestra el error por consola
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
                return next(err);


        Usuario.findOne(gasto.usuario, function usuarioGasto (err, usuario) {
            if (err)
                return next(err);
            res.view({
                gasto: gasto,
                usuario:usuario
            });
        });
            

        });
    }, edit: function  (req, res, next) {
        
        Gasto.findOne(req.param('id'), function gastoEncontrado (err, gasto) {
             if (err) {
                return next(err);
            }
            
            return res.view({
                gasto: gasto
            });
        });
    }, update: function (req, res, next){
        var fechaCan;
        if (req.param('estado')=== 'Cancelado') {
            fechaCan= sails.date();
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
                return next(err);
            }
            return res.redirect('/gasto/show/' + req.param('id'));
        });
    }, updatestate: function (req, res, next){
        
        var gasto={
            
            estado: "Cancelado",           
            fechaCancelado: sails.date()
           
        }
        
        Gasto.update(req.param('id'), gasto, function gastoUpdated(err) {
            if (err) {
                return next(err);
                console.log(err);
            }
            return res.redirect('/usuario/history' );
        });
    }, index: function(req, res, next) {
        Gasto.find(function gastoFounded(err, gastos) {
            if (err) {
                console.log(err); //
                return;
            }
            return res.view({
                gastos: gastos
            });
        });
    }
};

