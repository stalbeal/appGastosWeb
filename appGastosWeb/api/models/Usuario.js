/**
* Usuario.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      nombre: {
        type: 'string',
        required: true
      },usuario:{
  			type: 'string',
  			unique: true,
  			required: true
  		},contraseña:{
  			type:'string',
  			required:true
  		},gastos:{
        collection: 'Gasto',
        via: 'usuario'
      },giros:{
        collection: 'Giro',
        via: 'usuario'
      },facturas:{
        collection: 'Factura',
        via: 'usuario'
      }
    }
};

