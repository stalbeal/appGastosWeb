/**
* Gasto.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	descripcion:{
  		type:'string',
  		required:true
  	}, valor:{
  		type:'float',
  		required:true
  	},estado:{
  		type:'string',
      required: true,
      enum: ['Sin Cancelar', 'Cancelado'] 
  	}, fecha:{
      type:'string',
      required:true
    },fechaCancelado:{
      type:'string',
      required:true
    },tipo:{
      type:'string',
      required: true,
      enum: ['Comida', 'Pasajes Paula', 'Prestamo']
    }

  }
};

