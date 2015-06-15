var Schemas = {};

Schemas.Product = new SimpleSchema({
	name: {
		type: String,
		label: 'Product name',
		max: 200,
		optional: false
	},
	categoryId: {
		type: String,
		label: 'Category id',
		optional: false
	},
	'pricing.selling': {
		type: Number,
		decimal: true,
		optional: false
	},
	'pricing.buyIn': {
		type: Number,
		decimal: true,
		optional: false
	},
	'pricing.joint': {
		type: Number,
		decimal: true,
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

Products.attachSchema(Schemas.Product);