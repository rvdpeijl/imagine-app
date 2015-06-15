api = {
	products: {
		add: function(input) {
			addTimestamps(input);
			var productId = Products.insert(input, function(error, result) {
				if (error) {
					return Errorhandler.handleErrors(error);
				}

				return result;
			});

			var initialStock = {
				productId: productId,
				safe: {
					optimal: 0,
					inferior: 0,
					waste: 0,
					joints: 0
				},
				tent: {
					optimal: 0,
					inferior: 0,
					waste: 0,
					joints: 0
				},
				dispenser: {
					optimal: 0,
					inferior: 0,
					waste: 0,
					joints: 0
				}
			};

			addTimestamps(initialStock);
			Stock.insert(initialStock, function(error, result) {
				if (error) {
					return Errorhandler.handleErrors(error);
				}

				return result;
			});
		},
		remove: function(id) {
			Products.remove(id);
		},
		save: function() {

		}
	},
	categories: {
		add: function(input) {
			addTimestamps(input);
			Categories.insert(input, function(error, result) {
				if (error) {
					return Errorhandler.handleErrors(error);
				}

				return result;
			});
		},
		remove: function(id) {
			Categories.remove(id);
		},
		save: function() {

		}
	},
	members: {
		add: function(input) {
			addTimestamps(input);
			Members.insert(input, function(error, result) {
				if (error) {
					return Errorhandler.handleErrors(error);
				}

				return result;
			});
		},
		remove: function(id) {
			Members.remove(id);
		},
		save: function() {

		}
	}
};

function addTimestamps(object) {
	object.createdAt = new Date();
	object.updatedAt = new Date();
	return object;
}