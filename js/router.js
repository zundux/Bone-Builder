/*global Bone:true, Backbone, $ */

var Bone = Bone || {};

(function() {
    'use strict';


    // Handles a single dynamic route to show
    // the active vs complete item items
    Bone.Router = Backbone.Marionette.AppRouter.extend({
        appRoutes: {}
    });

    // Control the workflow and logic that exists at the application
    // level, above the implementation detail of views and models
    Bone.Controller = Backbone.Marionette.Object.extend({

        initialize: function() {
            this.itemList = new Bone.itemList();
        },

        // Start the app by showing the appropriate views
        // and fetching the list of item items, if there are any
        start: function() {
            this.showHeader(this.itemList);
            this.showFooter(this.itemList);
            this.showitemList(this.itemList);
            this.itemList.on('all', this.updateHiddenElements, this);
            this.itemList.fetch();
        },

        updateHiddenElements: function() {
            $('#main, #footer').toggle(!!this.itemList.length);
        },

        showHeader: function(itemList) {
            var header = new Bone.HeaderLayout({
                collection: itemList
            });
            Bone.App.root.showChildView('header', header);
        },

        showFooter: function(itemList) {
            var footer = new Bone.FooterLayout({
                collection: itemList
            });
            Bone.App.root.showChildView('footer', footer);
        },

        showitemList: function(itemList) {
            Bone.App.root.showChildView('main', new Bone.ListView({
                collection: itemList
            }));
        }
    });
})();
