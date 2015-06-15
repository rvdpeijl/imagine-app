Router.map(function () {

	var self = this;

	this.route('index', {
		controller: 'BasicController',
		template: 'dashboard',
		path: '/'
	});

	this.route('checkout', {
		controller: 'BasicController',
		template: 'checkout',
		path: '/checkout'
	});

	this.route('products', {
		controller: 'BasicController',
		template: 'products',
		path: '/products'
	});

	this.route('categories', {
		controller: 'BasicController',
		template: 'categories',
		path: '/categories'
	});

	this.route('members', {
		controller: 'BasicController',
		template: 'members',
		path: '/members'
	});

	this.route('member', {
		controller: 'MemberController',
		template: 'member',
		path: '/members/:memberId'
	});

	this.route('stock', {
		controller: 'BasicController',
		template: 'stock',
		path: '/stock'
	});

	this.route('updateStock', {
		controller: 'BasicController',
		template: 'stock',
		path: '/stock/update/:stockId',
		onBeforeAction: function () {
			if (Stock.findOne(this.params.stockId)) {
				Session.set('updateStock', true);
			} else {
				Session.set('updateStock', false);
			}
			this.next();
		}
	});

	this.route('moveStock', {
		controller: 'BasicController',
		template: 'stock',
		path: '/stock/move/:stockId',
		onBeforeAction: function () {
			if (Stock.findOne(this.params.stockId)) {
				Session.set('moveStock', true);
			} else {
				Session.set('moveStock', false);
			}
			this.next();
		}
	});

	this.route('countStock', {
		controller: 'BasicController',
		template: 'stock',
		path: '/stock/count/:stockId',
		onBeforeAction: function () {
			if (Stock.findOne(this.params.stockId)) {
				Session.set('countStock', true);
			} else {
				Session.set('countStock', false);
			}
			this.next();
		}
	});

	this.route('stockHistory', {
		controller: 'BasicController',
		template: 'stock',
		path: '/stock/history/:stockId',
		onBeforeAction: function () {
			if (Stock.findOne(this.params.stockId)) {
				Session.set('stockHistory', true);
			} else {
				Session.set('stockHistory', false);
			}
			this.next();
		}
	});

	this.route('authentication', {
		controller: 'AuthController',
		template: 'authentication',
		path: '/authentication'
	});

	this.route('logout', {
		controller: 'LogoutController',
		template: 'dashboard',
		path: '/logout'
	});

	//this.route('login', {
	//	controller: 'BasicController',
	//	template: 'login',
	//	path: '/login'
	//});

	//this.route('remove-all-products', {
	//	path: '/remove-all-products',
	//	action: function() {
	//		Products.find().forEach(function(product) {
	//			Products.remove({_id: product._id});
	//		});
	//
	//		console.log('Products deleted!');
	//		this.next();
	//	}
	//});

});

BasicController = RouteController.extend({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading',
	onBeforeAction: function() {
		//$('#content').addClass("animated fadeIn");
		//setTimeout(function() {
		//	$('#content').removeClass("animated fadeIn");
		//}, 400);
		this.next();
	}
});

MemberController = BasicController.extend({
	onBeforeAction: function () {
		var currentMember = Members.findOne(this.params.memberId);
		Session.set('currentMember', currentMember);
		this.next();
	}
});

AuthController = BasicController.extend({
	onBeforeAction: function () {
		if (Session.equals('authenticated', true)) {
			this.redirect('/');
			this.next();
		} else {
			this.next();
		}
	}
});

LogoutController = BasicController.extend({
	onBeforeAction: function () {
		Session.set('authenticated', false);
		Session.set('authenticationCode', null);
		this.next();
	}
});

Router.onBeforeAction(function() {
	clearSessionVariables();

	if (!Session.equals('authenticated', true)) {
		this.redirect('/authentication');
		this.next();
	} else {
		this.next();
	}
}, { except: ['authentication']});

function clearSessionVariables() {
	Errorhandler.clearErrors();

	Session.set('fromSelected', false);
	Session.set('toSelected', false);

	Session.set('updateStock', false);
	Session.set('countStock', false);
	Session.set('moveStock', false);
	Session.set('stockHistory', false);

	Session.set('memberId', null);
}