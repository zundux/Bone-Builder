/*global Bone:true, Backbone */

var Bone = Bone || {};

(function() {
    'use strict';

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
            text: '#new-text',
            image: '#new-image',
        },

        events: {
            'click @ui.text': 'onAddText',
            'click @ui.image': 'onAddImage',
        },

        onAddText: function(e) {
            this.collection.create();
        },
        onAddImage: function(e) {
            this.collection.create({
                type: 'image'
            });
        },

    });

    Bone.FooterLayout = Backbone.Marionette.ItemView.extend({
        template: '#template-footer',
    });
})();
