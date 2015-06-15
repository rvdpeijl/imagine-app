Authentication = {
	authenticated: Session.equals('authenticated', true),
	authenticationCode: Session.get('authenticationCode'),
	authenticate: function(authenticationCode, pinCode) {
		var auth = Authenticators.findOne({authenticationCode: parseFloat(authenticationCode)});
		if (auth && auth.pinCode === parseFloat(pinCode)) {
			console.log('authenticated');
			Session.set('authenticated', true);
			Session.set('authenticationCode', parseFloat(authenticationCode));
			return true;
		} else {
			console.log('not authenticated');
			return false;
		}
	}
};