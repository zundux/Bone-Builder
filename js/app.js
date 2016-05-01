/*global Backbone, Bone:true */

var Bone = Bone || {};

(function () {
	'use strict';

	var App = Backbone.Marionette.Application.extend({
		setRootLayout: function () {
			this.root = new Bone.RootLayout();
		}
	});

	// The Application Object is responsible for kicking off
	// a Marionette application when its start function is called
	//
	// This application has a singler root Layout that is attached
	// before it is started.  Other system components can listen
	// for the application start event, and perform initialization
	// on that event
	Bone.App = new App();

	Bone.App.on('before:start', function () {
		Bone.App.setRootLayout();
	});

})();
