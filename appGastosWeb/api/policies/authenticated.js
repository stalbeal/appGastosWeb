
module.exports= function (req, res,ok) {
	if(req.session.authenticated)
		return ok();
	
	var requireLoginError=[{name:'requireLogin', message:'Debes Iniciar Sesion'}]
	req.session.flash={
		err: requireLoginError
	}
	res.redirect('/session/login');
	// body...
}