Template.header.helpers({
	errors: function() {
		return Session.get('errors');
	},
	isAuthenticated: function() {
		return Session.equals('authenticated', true);
	}
});