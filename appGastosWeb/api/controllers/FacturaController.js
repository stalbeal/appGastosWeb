/**
 * FacturaController
 *
 * @description :: Server-side logic for managing facturaes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
		new:function (req,res,next) {
			res.view();
		},create: function(req, res, next) {
			
		var fechaCan;
		if (req.param('estado')=== 'Cancelado') {
			fechaCan= sails.date();

            Saldo.find().limit(1).exec(function saldoFounded(err, saldos) {
           if (err)
                return next(err);

            
            var saldo={
                saldo:saldos[0].saldo-req.param('valor')
            }

        Saldo.update(saldos[0], saldo, function saldoUpdated(err) {
            if (err) {
                return next(err);
            }
        });
        });
            
		}else{
			fechaCan='N/A              ';
		}
        var factura={
            descripcion: req.param('descripcion'),
            valor: req.param('valor'),
            estado: req.param('estado'),
            fechaPago: req.param('fechaPago'),
            fechaLimite:req.param('fechaLimite'),
            fechaCancelado: fechaCan,
            tipo: req.param('tipo'),
            cuentasVencidas:req.param('cuentasVencidas'),
            usuario:req.session.Usuario.id
        }

        Factura.create(factura, function usuarioCreated(err, factura) {
            if (err) {
                req.session.flash = {
                    err: err
                }
                return res.redirect('/factura/new')
            }
            return res.redirect('/factura/show/' + factura.id);

        });
    },show: function(req, res, next) {
        Factura.findOne(req.param('id'), function facturaEncontrada(err, factura) {
            if (err)
                return next(err);


        Usuario.findOne(factura.usuario, function usuariofactura (err, usuario) {
            if (err)
                return next(err);
            res.view({
                factura: factura,
                usuario:usuario
            });
        });
            

        });
    },updatestate: function (req, res, next){
        
        var factura={            
            estado: "Cancelado",           
            fechaCancelado: sails.date()           
        }

         Factura.findOne(req.param('id'),function facturaFounded(err, factura) {
            if (err) {
                return next(err);

            }
               Saldo.find().limit(1).exec(function saldoFounded(err, saldos) {
               if (err)
                    return next(err);

                
                var saldo={
                    saldo:saldos[0].saldo-factura.valor

                }

            Saldo.update(saldos[0], saldo, function saldoUpdated(err) {
                if (err) {
                    return next(err);
                }
            });

        });
           });


        
        Factura.update(req.param('id'), factura, function facturaUpdated(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/usuario/history' );
        });
    }, edit: function  (req, res, next) {
        
        Factura.findOne(req.param('id'), function facturaEncontrado (err, factura) {
             if (err) {
                return next(err);
            }
            
            return res.view({
                factura: factura
            });
        });
    }, update: function (req, res, next){
        var fechaCan;
        if (req.param('estado')=== 'Cancelado') {
            fechaCan= sails.date();
            Saldo.find().limit(1).exec(function saldoFounded(err, saldos) {
           if (err)
                return next(err);

            
        var saldo={
            saldo:saldos[0].saldo-req.param('valor')
        }

        Saldo.update(saldos[0], saldo, function saldoUpdated(err) {
            if (err) {
                return next(err);
            }
        });
        });

        }else{
            fechaCan='N/A';
        }
        var factura={
            descripcion: req.param('descripcion'),
            valor: req.param('valor'),
            estado: req.param('estado'),
            fechaPago: req.param('fechaPago'),
            fechaLimite:req.param('fechaLimite'),
            fechaCancelado: fechaCan,
            tipo: req.param('tipo'),
            cuentasVencidas:req.param('cuentasVencidas'),
            usuario:req.session.Usuario.id
        }

        
        Factura.update(req.param('id'), factura, function facturaUpdated(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/factura/show/' + req.param('id'));
        });
    },index: function(req, res, next) {
        Factura.find(function facturaFounded(err, facturas) {
            if (err) {
                
                return;
            }
            return res.view({
                facturas: facturas
            });
        });
    }, destroy:function (req,res,next) {
        Factura.destroy(req.param('id'), function (err) {
            if(err)
                return next(err);
            res.redirect('/usuario/history');
            // body...
        });
    }
};

