/*global Backbone, Bone:true, $ */

var Bone = Bone || {};

$(function () {
	'use strict';

	// After we initialize the app, we want to kick off the router
	// and controller, which will handle initializing our Views
	Bone.App.on('start', function () {
		var controller = new Bone.Controller();
		controller.router = new Bone.Router({
			controller: controller
		});

		controller.start();
		Backbone.history.start();
	});

	// start the Bone app (defined in js/Bone.js)
	Bone.App.start();
});
