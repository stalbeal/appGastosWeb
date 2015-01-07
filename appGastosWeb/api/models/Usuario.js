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
        },
        usuario: {
            type: 'string',
            unique: true,
            required: true
        },
        contraseña: {
            type: 'string',
            required: true
        },
        gastos: {
            collection: 'Gasto',
            via: 'usuario'
        },
        giros: {
            collection: 'Giro',
            via: 'usuario'
        },
        facturas: {
            collection: 'Factura',
            via: 'usuario'
        },
        tipo: {
            enum: ['admin', 'tipo1', 'tipo2']
        },
        confirmacionContrasena: {
            type: 'string',
            required: true
        },
        encryptedPassword: {
            type: 'string'
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            delete obj._csrf;
            delete obj.encryptedPassword;
            return obj;
        }
    },
    beforeCreate: function(values, next) {
        var password = values.contraseña;
        var passwordConfirmation = values.confirmacionContrasena;
        //console.log('contraseñas: '+ password+'; '+ passwordConfirmation);
        if (!password || !passwordConfirmation || password != passwordConfirmation) {
            var passwordDoesNotMatchError = [{

                message: 'Las Contraseñas no son iguales verifique'
            }]
            return next({
                err: passwordDoesNotMatchError
            });
        }

        require('bcrypt').hash(values.contraseña, 10, function passwordEncrypted(err, encryptedPassword) {
            // body...
            values.encryptedPassword = encryptedPassword;
            next();
        });
    }
};