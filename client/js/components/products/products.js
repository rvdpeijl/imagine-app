Template.products.helpers({
	Categories: function() {
		return Categories.find();
	},
	categorySelected: function() {
		return Session.get('selectedCategoryId');
	},
	categoryIsWeighable: function() {
		var category = Categories.findOne(Session.get('selectedCategoryId'));
		if (category) {
			return category.options.weighable === true;
		}
		return false;
	}
});

Template.productList.helpers({
	Products: function () {
		return Products.find();
	},
	Categories: function() {
		return Categories.find();
	},
	categorySelected: function() {
		return Session.get('selectedCategoryId');
	}
});