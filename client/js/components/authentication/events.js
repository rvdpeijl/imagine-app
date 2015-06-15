var events = {
	authenticate: function(event, template) {
		event.preventDefault();

		var authenticationCode = event.target.authenticationCode.value;
		var pinCode            = event.target.pinCode.value;

		var authenticated = Authentication.authenticate(authenticationCode, pinCode);
		if (!authenticated) {
			$('.numPad.authenticationCode').addClass('active');
			$('.numPad.pinCode').removeClass('active');
			alert('Bad authentication credentials');
		}
	},
	handleNumpad: function(event) {
		var number = event.target.getAttribute('data-number');
		var inputField = event.target.parentNode.getElementsByTagName('input')[0];
		inputField.value += number;
	},
	clearNumPad: function(event) {
		var inputField = event.target.parentNode.getElementsByTagName('input')[0];
		inputField.value = '';
	},
	nextNumPad: function(event) {
		$('.numPad.authenticationCode').removeClass('active');
		$('.numPad.pinCode').addClass('active');
	}
};

Template.authentication.events({
	'submit #authenticationForm': events.authenticate,
	'click .numPad .pad': events.handleNumpad,
	'click .numPad .pad-clear': events.clearNumPad,
	'click .numPad.authenticationCode .pad-go': events.nextNumPad
});