module.exports = function(req, res, ok) {

    if (req.session.authenticated && req.session.Usuario.tipo=='admin') {
        res.locals.flash = {};
        if (!req.session.flash) return ok();

        res.locals.flash = _.clone(req.session.flash);

        req.session.flash = {};
        return ok();
    }

    var requireAdminError=[{message:'debes ser administrador'}]
	req.session.flash={
		err:requireAdminError
	}
	res.redirect('session/login');
	return;




};