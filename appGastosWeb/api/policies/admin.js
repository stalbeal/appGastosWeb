module.exports= function (req, res,ok) {
	if(req.session.Usuario && req.session.Usuario.tipo=='admin'){
		return ok();
	}
	var requireLoginError=[{message:'Debes ser Administrador para realizar esta accion'}]

	req.session.flash={
		err: requireLoginError
	}
	res.redirect('/session/login');
	// body...
}