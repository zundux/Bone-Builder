/*global Bone: true, Backbone */

var Bone = Bone || {};

(function () {
	'use strict';

	var filterChannel = Backbone.Radio.channel('filter');

	Bone.itemView = Backbone.Marionette.ItemView.extend({

		tagName: 'li',

		template: '#template-itemItemView',

		ui: {
			edit: '.edit',
			destroy: '.destroy',
			label: 'label',
			toggle: '.toggle'
		},

		events: {
			'click @ui.destroy': 'deleteModel',
			'dblclick @ui.label': 'onEditClick',
			'keydown @ui.edit': 'onEditKeypress',
			'focusout @ui.edit': 'onEditFocusout',
			// 'click @ui.toggle': 'toggle'
		},

		modelEvents: {
			change: 'render'
		},

		deleteModel: function () {
			this.model.destroy();
		},

		// toggle: function () {
		// 	this.model.toggle().save();
		// },

		onEditClick: function () {
			this.$el.addClass('editing');
			this.ui.edit.focus();
			this.ui.edit.val(this.ui.edit.val());
		},

		onEditFocusout: function () {
			var itemText = this.ui.edit.val().trim();
			if (itemText) {
				this.model.set('title', itemText).save();
				this.$el.removeClass('editing');
			}
		},

		onEditKeypress: function (e) {
			var ENTER_KEY = 13;
			var ESC_KEY = 27;

			if (e.which === ENTER_KEY) {
				this.onEditFocusout();
				return;
			}

			if (e.which === ESC_KEY) {
				this.ui.edit.val(this.model.get('text'));
				this.$el.removeClass('editing');
			}
		}
	});

	Bone.ListView = Backbone.Marionette.CompositeView.extend({

		template: '#template-itemListCompositeView',

		childView: Bone.itemView,

		childViewContainer: '#item-list',

		// ui: {
		// 	toggle: '#toggle-all'
		// },

		// events: {
		// 	'click @ui.toggle': 'onToggleAllClick'
		// },

		// collectionEvents: {
		// 	'change:completed': 'render',
		// 	all: 'setCheckAllState'
		// },

		initialize: function () {
			// this.listenTo(filterChannel.request('filterState'), 'change:filter', this.render, this);
		},

		// filter: function (child) {
		// 	var filteredOn = filterChannel.request('filterState').get('filter');
		// 	return child.matchesFilter(filteredOn);
		// },

		// setCheckAllState: function () {
		// 	function reduceCompleted(left, right) {
		// 		return left && right.get('completed');
		// 	}
		//
		// 	var allCompleted = this.collection.reduce(reduceCompleted, true);
		// 	this.ui.toggle.prop('checked', allCompleted);
		// 	this.$el.parent().toggle(!!this.collection.length);
		// },

		// onToggleAllClick: function (e) {
		// 	var isChecked = e.currentTarget.checked;
		//
		// 	this.collection.each(function (item) {
		// 		item.save({ completed: isChecked });
		// 	});
		// }
	});
})();
