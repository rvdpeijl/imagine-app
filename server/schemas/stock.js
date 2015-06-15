var Schemas = {};

Schemas.Stock = new SimpleSchema({
	productId: {
		type: String,
		label: 'Product id',
		optional: false
	},
	'safe.optimal': {
		type: Number,
		label: 'Optimal in safe',
		optional: true
	},
	'safe.inferior': {
		type: Number,
		label: 'Inferior in safe',
		optional: true
	},
	'safe.waste': {
		type: Number,
		label: 'Waste in safe',
		optional: true
	},
	'safe.joints': {
		type: Number,
		label: 'Joints in safe',
		optional: true
	},
	'dispenser.optimal': {
		type: Number,
		label: 'Optimal in dispenser',
		optional: true
	},
	'dispenser.inferior': {
		type: Number,
		label: 'Inferior in dispenser',
		optional: true
	},
	'dispenser.waste': {
		type: Number,
		label: 'Waste in dispenser',
		optional: true
	},
	'dispenser.joints': {
		type: Number,
		label: 'Joints in dispenser',
		optional: true
	},
	'tent.optimal': {
		type: Number,
		label: 'Optimal in tent',
		optional: true
	},
	'tent.inferior': {
		type: Number,
		label: 'Inferior in tent',
		optional: true
	},
	'tent.waste': {
		type: Number,
		label: 'Waste in tent',
		optional: true
	},
	'tent.joints': {
		type: Number,
		label: 'Joints in tent',
		optional: true
	},
	createdAt: {
		type: Date
	},
	updatedAt: {
		type: Date
	}
});

Stock.attachSchema(Schemas.Stock);