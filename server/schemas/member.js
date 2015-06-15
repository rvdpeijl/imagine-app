var Schemas = {};

Schemas.Member = new SimpleSchema({
	memberId: {
		type: Number,
		label: 'Member id',
		optional: false
	},

	firstName: {
		type: String,
		label: 'First name',
		optional: false
	},
	middleName: {
		type: String,
		label: 'Middle name',
		optional: true
	},
	lastName: {
		type: String,
		label: 'Last name',
		optional: false
	},

	streetName: {
		type: String,
		label: 'Street name',
		optional: false
	},
	houseNumber: {
		type: String,
		label: 'House number',
		optional: true
	},
	zipcode: {
		type: String,
		label: 'Postal code',
		optional: true
	},
	city: {
		type: String,
		label: 'City',
		optional: true
	},

	email: {
		type: String,
		label: 'Email',
		optional: true
	},
	inviter: {
		type: String,
		label: 'Inviter',
		optional: true
	},
	notes: {
		type: String,
		label: 'Notes',
		optional: true
	},

	dateOfBirth: {
		type: String,
		label: 'Date of birth',
		optional: true
	},
	gender: {
		type: String,
		label: 'Gender',
		optional: true
	},
	idNumber: {
		type: String,
		label: 'ID number',
		optional: true
	},
	nifNie: {
		type: String,
		label: 'NIF/NIE',
		optional: true
	},

	credits: {
		type: Number,
		label: 'Credits',
		optional: false
	},
	discountModifier: {
		type: Number,
		label: 'Discount modifier',
		optional: true
	},
	hasPhoto: {
		type: Boolean,
		optional: true
	},
	active: {
		type: Boolean
	},
	createdAt: {
		type: Date
	},
	updatedAt: {
		type: Date
	}
});

Members.attachSchema(Schemas.Member);