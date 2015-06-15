Template.stock.helpers({
	Stock: function() {
		return Stock.find();
	},
	Categories: function() {
		return Categories.find();
	},
	Products: function() {
		return Products.find();
	},
	currentStock: function() {
		return Session.get('currentStock');
	},
	currentProduct: function() {
		return Session.get('currentProduct');
	},
	updatingStock: function() {
		return Session.get('updateStock');
	},
	movingStock: function() {
		return Session.get('moveStock');
	},
	countingStock: function() {
		return Session.get('countStock');
	},
	stockHistory: function() {
		return Session.get('stockHistory');
	}
});