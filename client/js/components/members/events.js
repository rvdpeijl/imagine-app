var events = {
	addMember: function(event, template) {
		event.preventDefault();

		var member = {
			memberId        : event.target.memberId.value,

			firstName       : event.target.firstName.value,
			middleName      : event.target.middleName.value,
			lastName        : event.target.lastName.value,

			streetName      : event.target.streetName.value,
			houseNumber     : event.target.houseNumber.value,
			zipcode         : event.target.zipcode.value,
			city            : event.target.city.value,

			email           : event.target.email.value,
			inviter         : event.target.inviter.value,
			notes           : event.target.notes.value,

			dateOfBirth     : event.target.dateOfBirth.value,
			gender          : event.target.gender.value,
			idNumber        : event.target.idNumber.value,
			nifNie          : event.target.nifNie.value,

			credits         : event.target.credits.value,
			discountModifier: event.target.discountModifier.value
		};

		var validated = validate(member);

		if (!validated.valid) {
			Session.set('errors', validated.errors);
			return;
		} else {
			Session.set('errors', []);
		}

		api.members.add({
			memberId        : parseFloat(member.memberId),

			firstName       : member.firstName,
			middleName      : member.middleName,
			lastName        : member.lastName,

			streetName      : member.streetName,
			houseNumber     : member.houseNumber,
			zipcode         : member.zipcode,
			city            : member.city,

			email           : member.email,
			inviter         : member.inviter,
			notes           : member.notes,

			dateOfBirth     : member.dateOfBirth,
			gender          : member.gender,
			idNumber        : member.idNumber,
			nifNie          : member.nifNie,
			hasPhoto        : false,

			credits         : parseFloat(member.credits),
			discountModifier: parseFloat(member.discountModifier),

			active          : true
		});

		if (!Session.get('errors').length > 0) {
			$('#addMemberModal').modal('hide')
		}
	},
	removeMember: function(event) {
		event.preventDefault();

		if (confirm('Are you sure you want to delete this member?')) {
			var id = event.target.dataset.id;
			api.members.remove(id);
		}

		return;
	},
	randomizeMemberId: function(event) {
		var memberIdInput = document.getElementById('memberId');
		var randomId = null;
		var members = Members.find({}).fetch();
		var memberIds = _.map(members, function(member) {
			return member.memberId;
		});
		
		function randomize() {
			randomId = Math.floor(Math.random() * Config.members.maximumId) + 1;
			if (_.contains(memberIds, randomId)) {
				randomize();
			}
		}
		
		randomize();
		memberIdInput.value = randomId;
	},
	openMemberIdPicker: function() {
		$('#memberIdPicker').toggleClass('opened');
	},
	selectMemberId: function(e) {
		var memberIdInput = document.getElementById('memberId');
		memberIdInput.value = e.target.dataset.memberId;
		$('#memberIdPicker').toggleClass('opened');
	}
};

Template.members.events({
	'submit #newMember': events.addMember,
	'click #deleteMember': events.removeMember,
	'click .randomizeMemberId': events.randomizeMemberId,
	'click .pickNumber': events.openMemberIdPicker,
	'click .picker .memberId': events.selectMemberId
});

function validate(member) {
	var validation = {
		valid: true,
		errors: []
	};

	if (Members.find({memberId: parseFloat(member.memberId)}).count() > 0) {
		validation.errors.push('That member id already exists');
	}

	if (validation.errors.length > 0) validation.valid = false;

	return validation;
}