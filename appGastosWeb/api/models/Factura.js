/**
* Factura.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	estado:{
  		type:'string',
  		required: true,
  		enum: ['Sin Cancelar', 'Cancelado']
  	}, descripcion:{
  		type:'string'
  	},cuentasVencidas:{
      type:'integer', 
      required:true
    },valor:{
  		type:'float', 
  		required:true
  	},fechaPago:{
  		type: 'string',
      required:true
  	},fechaLimite:{
      type: 'string',
      required:true
    }, tipo:{
  		type: 'string',
  		enum: ['UNE', 'EPM'],
  		required:true
  	},fechaCancelado:{
      type:'string',
      required:true
    }, usuario:{
        model: 'Usuario'
      }


  }
};

