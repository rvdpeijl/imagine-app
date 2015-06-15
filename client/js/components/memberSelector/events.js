var events = {
	selectMember: function(event) {
		event.preventDefault();

		var memberId        = parseFloat(event.target.memberId.value);
		var member = Members.findOne({memberId: memberId});

		if (member) {
			Session.set('memberId', memberId);
		} else {
			alert('No member found by that id!');
		}
	}
};


Template.memberSelector.events({
	'submit #selectMember': events.selectMember
});