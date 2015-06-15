/**
 * Shopping cart
 * @constructor
 */
ShoppingCart = function(options) {

	// Initialize the cart
	this.items = {};
	this.memberId = null;

	// Callbacks
	var defaults = {
		updateTotal: function() {},
		updateItemQuantity: function() {},
		clear: function() {},
		add: function() {},
		remove: function() {}
	};

	// Merge options with defaults
	for (var property in defaults) {
		if (!options.hasOwnProperty(property)) {
			options[property] = defaults[property]
		}
	}

	this.options = options;
};

/**
 * Removes all items from the cart
 */
ShoppingCart.prototype.clear = function() {
	this.items = {};
	this.options.clear();
	this.options.updateTotal();
};

/**
 * Returns the value of all items in the cart
 * @returns {number}
 */
ShoppingCart.prototype.total = function() {
	var sum = 0.0;
	for (var index in this.items) {
		var item = this.items[index];
		sum = sum + (item.price * item.quantity);
	}
	return sum;
};

/**
 * Returns the number of unique items in the cart
 * @returns {number}
 */
ShoppingCart.prototype.itemsCount = function() {
	var size = 0, key;
	for (key in this.items) {
		if (this.items.hasOwnProperty(key)) size++;
	}

	return size;
};

/**
 * Returns whether the cart is empty or not
 * @returns {boolean}
 */
ShoppingCart.prototype.isEmpty = function() {
	return this.itemsCount() == 0;
};

/**
 * Adds a new item to the cart or increases the quantity of an existing item
 * @param id
 * @param price
 * @param quantity
 * @returns {*}
 */
ShoppingCart.prototype.add = function(id, price, quantity) {
	var is_new;
	quantity = (typeof(quantity) != 'undefined') ? quantity : 1;
	if (this.items.hasOwnProperty(id)) {
		var item = this.items[id];
		item.quantity = item.quantity + quantity;
		this.options.updateItemQuantity(id);
		this.options.updateTotal();
		is_new = false;
	}
	else {
		this.items[id] = { quantity : quantity, price : price };
		this.options.updateTotal();
		is_new = true;
	}
	return is_new;
};

/**
 * Removes an item from the cart
 * @param id
 */
ShoppingCart.prototype.remove = function(id) {
	delete this.items[id];
	this.options.remove(id);
};

/**
 * Increase quantity of an item in the cart
 * @param id
 * @param quantity
 */
ShoppingCart.prototype.increase = function(id, quantity) {
	quantity = (typeof(quantity) != 'undefined') ? quantity : 1;
	if (this.items.hasOwnProperty(id)) {
		var item = this.items[id];
		item.quantity = item.quantity + quantity;
		this.options.updateItemQuantity(id);
		this.options.updateTotal();
	}
};

/**
 * Decrease quantity of an item in the cart
 * @param id
 * @param quantity
 */
ShoppingCart.prototype.decrease = function(id, quantity) {
	quantity = (typeof(quantity) != 'undefined') ? quantity : 1;
	if (this.items.hasOwnProperty(id)) {
		var item = this.items[id];
		if (item.quantity >= quantity) {
			item.quantity = item.quantity - quantity;
		}
		else {
			item.quantity = 0;
		}
		this.options.updateItemQuantity(id);
		if (item.quantity == 0) {
			delete this.items[id];
			this.options.remove(id);
		}
		this.options.updateTotal();
	}
};

/**
 * Returns the quantity of an item in the cart
 * @param id
 * @returns {*}
 */
ShoppingCart.prototype.quantityFor = function(id) {
	return this.items.hasOwnProperty(id) ? this.items[id].quantity : 0;
};

/**
 * Returns the total price for an item in the cart
 * @param id
 * @returns {*}
 */
ShoppingCart.prototype.totalFor = function(id) {
	if (this.items.hasOwnProperty(id)) {
		return this.items[id].quantity * this.items[id].price;
	}

	return null;
};

/**
 * Returns whether the cart has a memberId attached to it
 * @returns {boolean}
 */
ShoppingCart.prototype.hasMemberId = function() {
	return this.memberId !== null;
};

/**
 * Set the member id
 * @param id
 */
ShoppingCart.prototype.setMemberId = function(id) {
	this.memberId = id;
};

/**
 * Returns the current member id
 * @returns {null|*}
 */
ShoppingCart.prototype.getMemberId = function() {
	return this.memberId;
};