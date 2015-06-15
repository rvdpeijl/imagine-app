Template.registerHelper('productCount', function () {
	return Products.find({}).count();
});

Template.registerHelper('memberCount', function () {
	return Members.find({}).count();
});

Template.registerHelper('config', function() {
	return Config;
});

Template.registerHelper('locale', function() {
	return Locale;
});

Template.registerHelper('products', function() {
	return Products.find({});
});

Template.registerHelper('members', function() {
	return Members.find({});
});

Template.registerHelper('dateToFormattedString', function(date) {
	return moment(date).format('DD-MM-YYYY - HH:mm');
});

Template.registerHelper('memberId', function() {
	return Session.get('memberId');
});

Template.registerHelper('hasMemberId', function() {
	return !Session.equals('memberId', null);
});


Template.registerHelper('quantityFor', function(id) {
	return Cart.quantityFor(id);
});

Template.registerHelper('totalFor', function(id) {
	return Cart.totalFor(id);
});

Template.registerHelper('itemsCount', function() {
	return Cart.itemsCount();
});

Template.registerHelper('equals', function (a, b) {
	return a === b;
});

Template.registerHelper("arrayify", function(obj){
	result = [];
	for (var key in obj){
		result.push({name:key,value:obj[key]});
	}
	return result;
});

Template.registerHelper("from", function(collection, key, id){
	var arr = collection.fetch();
	var filtered = arr.filter(function(value) {
		return value[key] === id;
	});
	return filtered;
});