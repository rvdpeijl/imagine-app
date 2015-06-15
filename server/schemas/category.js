var Schemas = {};

Schemas.Category = new SimpleSchema({
	name: {
		type: String,
		label: 'Category name',
		max: 200,
		optional: false
	},
	'options.weighable': {
		type: Boolean
	},
	createdAt: {
		type: Date
	},
	updatedAt: {
		type: Date
	}
});

Categories.attachSchema(Schemas.Category);