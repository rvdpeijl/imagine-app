var events = {
	selectCategory: function(event) {
		event.preventDefault();
		Session.set('checkoutCategoryId', event.target.value);
		Session.set('checkoutProductId', '');
	},
	selectProduct: function(event) {
		event.preventDefault();
		Session.set('checkoutProductId', event.target.dataset.productId);
	},
	handleNumpad: function(event) {
		var number = event.target.getAttribute('data-number').replace(/,/g, '.');
		var inputField = event.target.parentNode.getElementsByTagName('input')[0];
		inputField.value += number;
	},
	clearNumPad: function(event) {
		var inputField = event.target.parentNode.getElementsByTagName('input')[0];
		inputField.value = '';
	},
	addItem: function(event, template) {
		var productId = Session.get('checkoutProductId');
		console.log(productId);
		var product   = Products.findOne({_id: productId});
		console.log(product);
		var quantity  = round(document.getElementById('quantity').value);

		if (isNaN(quantity)) {
			return;
		}

		Cart.add(productId, product.pricing.selling, quantity);

		console.log(Cart.items);
	},

	// Shopping cart

	deleteItem: function(event) {
		if (confirm('Are you sure you want to remove this item from the cart?')) {
			var _id = event.target.dataset.id;
			Cart.remove(_id);
		}
	},
	cancelCheckout: function(event) {
		if (confirm('Are you sure you want to cancel?')) {
			Session.set('memberId', null);
			Cart.clear();
		}
	},
	clearCart: function(event) {
		if (confirm('Are you sure you want to clear the cart?')) {
			Cart.clear();
		}
	},
	confirmCheckout: function() {
		for (var id in Cart.items) {
			var product   = Products.findOne({_id: id});
			var stock     = Stock.findOne({productId: id});
			var dispenser = stock.dispenser;

			if (dispenser.optimal - Cart.items[id].quantity >= 0) {
				Stock.update({
					_id: stock._id
				}, {
					$set: {
						dispenser: {
							optimal: dispenser.optimal - Cart.items[id].quantity
						}
					}
				});

				console.log('authenticationCode', Session.get('authenticationCode'));
				console.log('currentMember', Session.get('currentMember'));
				console.log('transactions', Transactions.find().fetch());

			} else {
				console.log('not enough stock for', product.name);
			}
		}
	}
};

Template.checkout.events({
	'click .numPad .pad-go': events.addItem,
	'change #categoryId': events.selectCategory,
	'click ul.products li': events.selectProduct,
	'click .numPad .pad': events.handleNumpad,
	'click .numPad .pad-clear': events.clearNumPad,
	// Shopping cart
	'click .deleteItem': events.deleteItem,
	'click #cancelCheckout': events.cancelCheckout,
	'click .clearCart': events.clearCart,
	'click #confirmCheckout': events.confirmCheckout
});