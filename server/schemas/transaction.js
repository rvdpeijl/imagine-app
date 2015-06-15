var Schemas = {};

Schemas.Transaction = new SimpleSchema({
	ownerId: {
		type: String,
		optional: false
	},
	createdAt: {
		type: Date
	},
	updatedAt: {
		type: Date
	}
});

Transactions.attachSchema(Schemas.Transaction);