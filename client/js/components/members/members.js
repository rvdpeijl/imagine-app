Template.members.helpers({
	members: function () {
		return Members.find({});
	},
	memberIdList: function() {

		var list = [];
		var idListCount = 100;

		var members = Members.find({}).fetch();
		var memberIdList = _.map(members, function(member, idx) {
			return member.memberId;
		});

		for (var i = 1; i < idListCount; i++) {
			var exists = _.contains(memberIdList, i);
			list.push({ id: i, className: exists ? 'exists' : '' });
		}

		return list;
	},
	errors: function() {
		return Session.get('errors');
	}
});

Template.member.helpers({
	currentMember: function() {
		return Session.get('currentMember');
	},
	idPhoto: function() {
		return '/33006923hGGrteo005PPwter4562agcs22/'+ Session.get('currentMember')._id + '.jpg';
	}
});