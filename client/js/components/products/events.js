var events = {
	addProduct: function(event, template) {
		event.preventDefault();

		var productName = event.target.productName.value;
		var categoryId = event.target.categoryId.value;
		var buyInPrice = parseFloat(event.target.buyInPrice.value);
		var sellingPrice = parseFloat(event.target.sellingPrice.value);

		var product = {
			name: productName,
			categoryId: categoryId,
			pricing: {
				buyIn: buyInPrice,
				selling: sellingPrice
			},
			active: true
		};

		if (event.target.jointPrice) {
			product.pricing.joint = parseFloat(event.target.jointPrice.value);
		}

		api.products.add(product);
		event.target.reset();
		Session.set('selectedCategoryId', categoryId);
	},
	removeProduct: function(event) {
		event.preventDefault();

		if (confirm('Are you sure you want to delete this product?')) {
			var id = event.target.dataset.id;
			api.products.remove(id);
		}
	},
	selectCategory: function(event) {
		Session.set('selectedCategoryId', event.target.value);
	}
};

Template.products.events({
	'submit #newProduct': events.addProduct,
	'click #deleteProduct': events.removeProduct,
	'change #categoryId': events.selectCategory
});