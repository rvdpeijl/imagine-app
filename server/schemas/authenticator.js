var Schemas = {};

Schemas.Authenticator = new SimpleSchema({
	authenticationCode: {
		type: Number,
		max: 99999,
		optional: false
	},
	pinCode: {
		type: Number,
		max: 9999
	},
	firstName: {
		type: String,
		label: 'Authenticator name',
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
		optional: true
	},
	createdAt: {
		type: Date
	},
	updatedAt: {
		type: Date
	}
});

Authenticators.attachSchema(Schemas.Authenticator);