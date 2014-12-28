/**
* Giro.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  		codigo:{
  			type:'string',
  			required:true
  		},valor:{
  			type:'float',
  			required:true
  		}, descripcion:{
  			type:'string'
  		},fecha:{
  			type:'string',
  			required:true
  		}

  }
};

