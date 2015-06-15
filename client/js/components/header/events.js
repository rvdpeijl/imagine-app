var events = {
	clearErrors: function() {
		Errorhandler.clearErrors();
	}
};

Template.header.events({
	'click #closeError': events.clearErrors
});