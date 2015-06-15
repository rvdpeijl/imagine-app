Template.checkout.helpers({
	Categories: function() {
		return Categories.find();
	},
	Products: function() {
		return Products.find();
	},
	currentMember: function() {
		return Session.get('currentMember');
	},
	idPhoto: function() {
		return '/33006923hGGrteo005PPwter4562agcs22/'+ Session.get('currentMember')._id + '.jpg';
	},
	selectedCategoryId: function() {
		return Session.get('checkoutCategoryId');
	},
	selectedCategoryName: function() {
		var category = Categories.findOne(Session.get('checkoutCategoryId'));
		if (category) return category.name;
		return 'Loading...';
	},
	selectedProductId: function() {
		return Session.get('checkoutProductId');
	},
	selectedProductName: function() {
		var product = Products.findOne(Session.get('checkoutProductId'));
		if (product) return product.name;
		return 'Loading...';
	},
	categoryIsWeighable: function() {
		var category = Categories.findOne(Session.get('checkoutCategoryId'));
		if (category) return category.options.weighable;
		return false;
	},

	// Shopping Cart

	cartTotal: function() {
		CartDep.depend();
		return Cart.total();
	},
	cartItemList: function() {
		CartDep.depend();

		var items = _.map(Cart.items, function(item, id) {
			var _item = Products.find({ _id: id }).fetch()[0];

			return {
				'_id': _item._id,
				'name': _item.name,
				'price': item.price,
				'quantity': item.quantity
			}
		});

		return items;

	},
	cartIsEmpty: function() {
		CartDep.depend();
		return Cart.isEmpty();
	}
});