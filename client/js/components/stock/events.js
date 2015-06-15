var events = {
	/**
	 * View stock
	 * @param event
	 */
	viewStock: function(event) {
		event.preventDefault();
		var productId = event.target.value;
		if (productId.length < 1) return;
		Session.set('currentStock', Stock.findOne({productId: productId}));
		Session.set('currentProduct', Products.findOne(productId));

		console.log('Stock:', Session.get('currentStock'));
		console.log('Product:', Session.get('currentProduct'));

		Session.set('updateStock', false);
		Session.set('countStock', false);
		Session.set('moveStock', false);
	},

	/**
	 * Update stock
	 * @param event
	 */
	updateStock: function(event) {
		event.preventDefault();
		var stockId = event.target.stockId.value;
		var updatedStock = {
			dispenser: {
				optimal : round(event.target.updateDispenserOptimal.value),
				joints  : round(event.target.updateDispenserJoints.value),
				inferior: round(event.target.updateDispenserInferior.value),
				waste   : round(event.target.updateDispenserWaste.value)
			},
			tent: {
				optimal : round(event.target.updateTentOptimal.value),
				joints  : round(event.target.updateTentJoints.value),
				inferior: round(event.target.updateTentInferior.value),
				waste   : round(event.target.updateTentWaste.value)
			},
			safe: {
				optimal : round(event.target.updateSafeOptimal.value),
				joints  : round(event.target.updateSafeJoints.value),
				inferior: round(event.target.updateSafeInferior.value),
				waste   : round(event.target.updateSafeWaste.value)
			}
		};

		Stock.update({_id: stockId}, { $set: updatedStock });
		Session.set('currentStock', Stock.findOne(stockId));
	},

	handleMoveStock: function(event) {
		var currentStock  = Session.get('currentStock');
		var amount        = round(event.target.parentNode.dataset.amount);
		var quality       = event.target.parentNode.dataset.quality;
		var stockType     = event.target.parentNode.dataset.stockType;

		var moveStockType = Session.get('moveStock-stockType');
		var moveQuality   = Session.get('moveStock-quality');
		var moveInput     = round(Session.get('moveStock-input'));

		if ($(event.target.parentNode).hasClass('from') || $(event.target.parentNode).hasClass('to')) {
			return false;
		}

		if (Session.equals('fromSelected', false)) {
			var input = round(prompt('Amount:', '0'));

			if (input === 0 || isNaN(input)) {
				return false;
			}

			if ((amount - input) >= 0) {
				$(event.target.parentNode).addClass('from');

				Session.set('moveStock-input', input);
				Session.set('moveStock-stockType', stockType);
				Session.set('moveStock-quality', quality);

				Session.set('fromSelected', true);
			} else {
				alert('Not enough available');
			}
		} else {
			if (moveQuality !== quality) {
				return alert('Please select the same quality');
			}

			if (currentStock[moveStockType][moveQuality] - moveInput < 0) {
				return alert('Not enough in stock');
			}

			var id = currentStock._id;
			delete currentStock._id;

			currentStock[stockType][quality] += moveInput;
			currentStock[moveStockType][moveQuality] -= moveInput;

			Stock.update({_id: id}, { $set: currentStock });
			Session.set('fromSelected', false);
			Session.set('currentStock', Stock.findOne(id));
			$('.from').removeClass('from');
		}
	}
};

Template.stock.events({
	'change #productId': events.viewStock,
	'submit #updateStock': events.updateStock,
	'click table.moveStock table.inner tr': events.handleMoveStock
});