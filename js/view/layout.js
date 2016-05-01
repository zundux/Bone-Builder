/*global Bone:true, Backbone */

var Bone = Bone || {};

(function () {
	'use strict';

	var filterChannel = Backbone.Radio.channel('filter');

	Bone.RootLayout = Backbone.Marionette.LayoutView.extend({

		el: '#itemapp',

		regions: {
			header: '#header',
			main: '#main',
			footer: '#footer'
		}
	});

	Bone.HeaderLayout = Backbone.Marionette.ItemView.extend({

		template: '#template-header',

		// UI bindings create cached attributes that
		// point to jQuery selected objects
		ui: {
			text: '#new-text'
		},

		events: {
			'click @ui.text': 'onAddText',
		},

		onAddText: function (e) {
			this.collection.create();
			// this.render();
		},

	});

	Bone.FooterLayout = Backbone.Marionette.ItemView.extend({
		template: '#template-footer',

		// UI bindings create cached attributes that
		// point to jQuery selected objects
		// ui: {
			// filters: '#filters a',
			// completed: '.completed a',
			// active: '.active a',
			// all: '.all a',
			// summary: '#item-count',
			// clear: '#clear-completed'
		// },

		// events: {
		// 	'click @ui.clear': 'onClearClick'
		// },

		// collectionEvents: {
		// 	all: 'render'
		// },

		templateHelpers: {
			// activeCountLabel: function () {
			// 	return (this.activeCount === 1 ? 'item' : 'items') + ' left';
			// }
		},

		initialize: function () {
			// this.listenTo(filterChannel.request('filterState'), 'change:filter', this.updateFilterSelection, this);
		},

		// serializeData: function () {
		// 	var active = this.collection.getActive().length;
		// 	var total = this.collection.length;
		//
		// 	return {
		// 		activeCount: active,
		// 		totalCount: total,
		// 		completedCount: total - active
		// 	};
		// },

		onRender: function () {
			// this.$el.parent().toggle(this.collection.length > 0);
			// this.updateFilterSelec.tion();
		},

		// updateFilterSelection: function () {
		// 	this.ui.filters.removeClass('selected');
		// 	this.ui[filterChannel.request('filterState').get('filter')]
		// 	.addClass('selected');
		// },

		// onClearClick: function () {
		// 	var completed = this.collection.getCompleted();
		// 	completed.forEach(function (item) {
		// 		item.destroy();
		// 	});
		// }
	});
})();
