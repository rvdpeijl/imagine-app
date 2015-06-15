var events = {
	addCategory: function(event, template) {
		event.preventDefault();

		var name = event.target.categoryName.value;
		var isWeighable = event.target.weighable.value === 'yes';

		api.categories.add({
			name: name,
			options: {
				weighable: isWeighable
			}
		});

		event.target.categoryName.value = '';
		event.target.categoryName.focus();
	},
	removeCategory: function(event) {
		event.preventDefault();

		var id = event.target.dataset.id;

		if (confirm('Are you sure you want to delete this category?')) {
			Products.find({categoryId: id}).forEach(function(product) {
				Products.remove({_id: product._id});
			});
			api.categories.remove(id);
		}

		return;
	}
};

Template.categories.events({
	'submit #newCategory': events.addCategory,
	'click .removeCategory': events.removeCategory
});