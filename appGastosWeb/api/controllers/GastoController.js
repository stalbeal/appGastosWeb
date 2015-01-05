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
	var x = new Date();
    var day = x.getDate();
    var month = x.getMonth() + 1;
    var hour = x.getHours();
    var year = x.getFullYear();
    var minuts = x.getMinutes();
    var date = day + '/' + month + '/' + year + ' ' + hour + ':' + minuts;
        var gasto={
           	descripcion: req.param('descripcion'),
            valor: req.param('valor'),
            estado: req.param('estado'),
            fechaIngreso: date,
            fechaCancelado: 'N/A',
            tipo: req.param('tipo'),
            usuario:req.session.Usuario.usuario
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
            res.view({
                gasto: gasto
            });

        });
    }
};

