/*global Backbone, Bone:true */

var Bone = Bone || {};

(function () {
	'use strict';

	Bone.item = Backbone.Model.extend({
		defaults: {
			text: 'default text',
			x: 0,
			y: 0,
			created: 0
		},

		initialize: function () {
			if (this.isNew()) {
				this.set('created', Date.now());
			}
		},

		// toggle: function () {
		// 	return this.set('completed', !this.isCompleted());
		// },
		//
		// isCompleted: function () {
		// 	return this.get('completed');
		// },

		// matchesFilter: function (filter) {
		// 	if (filter === 'all') {
		// 		return true;
		// 	}
		//
		// 	if (filter === 'active') {
		// 		return !this.isCompleted();
		// 	}
		//
		// 	return this.isCompleted();
		// }
	});

	Bone.itemList = Backbone.Collection.extend({
		model: Bone.item,

		localStorage: new Backbone.LocalStorage('items-backbone-marionette'),

		comparator: 'created',

		// getCompleted: function () {
		// 	return this.filter(this._isCompleted);
		// },
		//
		// getActive: function () {
		// 	return this.reject(this._isCompleted);
		// },
		//
		// _isCompleted: function (item) {
		// 	return item.isCompleted();
		// }
	});
})();
