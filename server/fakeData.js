Meteor.startup(function() {
	if (Products.find().count() === 0) {
		// load sample products
	}

	if (Authenticators.find().count() === 0) {
		Authenticators.insert({
			firstName: 'Robbin',
			middleName: 'van der',
			lastName: 'Peijl',
			authenticationCode: 91887,
			pinCode: 1311,
			createdAt: new Date(),
			updatedAt: new Date()
		})
	}
});