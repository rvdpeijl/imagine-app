Cart = new ShoppingCart({
	updateTotal: function() {
		console.log('updated total');
		CartDep.changed();
	},
	updateItemQuantity: function() {
		console.log('updated item quantity');
		CartDep.changed();
	},
	clear: function() {
		console.log('cart cleared');
		CartDep.changed();
	},
	add: function() {
		console.log('added item to cart');
		CartDep.changed();
	},
	remove: function(id) {
		console.log('removed item from cart', id);
		CartDep.changed();
	}
});

CartDep = new Tracker.Dependency();