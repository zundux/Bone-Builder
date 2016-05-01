/*global Bone:true, Backbone, $ */

var Bone = Bone || {};

(function () {
	'use strict';

	var filterChannel = Backbone.Radio.channel('filter');

	// TodoList Router
	// ---------------
	//
	// Handles a single dynamic route to show
	// the active vs complete todo items
	Bone.Router = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			'*filter': 'filterItems'
		}
	});

	// TodoList Controller (Mediator)
	// ------------------------------
	//
	// Control the workflow and logic that exists at the application
	// level, above the implementation detail of views and models
	Bone.Controller = Backbone.Marionette.Object.extend({

		initialize: function () {
			this.todoList = new Bone.TodoList();
		},

		// Start the app by showing the appropriate views
		// and fetching the list of todo items, if there are any
		start: function () {
			this.showHeader(this.todoList);
			this.showFooter(this.todoList);
			this.showTodoList(this.todoList);
			this.todoList.on('all', this.updateHiddenElements, this);
			this.todoList.fetch();
		},

		updateHiddenElements: function () {
			$('#main, #footer').toggle(!!this.todoList.length);
		},

		showHeader: function (todoList) {
			var header = new Bone.HeaderLayout({
				collection: todoList
			});
			Bone.App.root.showChildView('header', header);
		},

		showFooter: function (todoList) {
			var footer = new Bone.FooterLayout({
				collection: todoList
			});
			Bone.App.root.showChildView('footer', footer);
		},

		showTodoList: function (todoList) {
			Bone.App.root.showChildView('main', new Bone.ListView({
				collection: todoList
			}));
		},

		// Set the filter to show complete or all items
		filterItems: function (filter) {
			var newFilter = filter && filter.trim() || 'all';
			filterChannel.request('filterState').set('filter', newFilter);
		}
	});
})();
