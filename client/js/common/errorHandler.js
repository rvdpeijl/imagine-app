Errorhandler = {
	handleErrors: function(error) {
		console.error(error);

		var messages = [];

		var details = JSON.parse(error.details);
		details.forEach(function(detail) {
			var message;

			switch (error.reason) {
				case 'INVALID':
					message = 'The field '+ detail.name + ' is invalid';
					break;
				case 'EXISTS':
					message = 'The field '+ detail.name + ' already exists in the database';
					break;
			}

			messages.push(message);

		});

		Session.set('errors', messages);
	},
	clearErrors: function() {
		Session.set('errors', []);
	}
};