/*global Backbone, Bone:true */

var Bone = Bone || {};

(function() {
    'use strict';

    Bone.item = Backbone.Model.extend({
        defaults: {
            type: 'text',

            text: 'default text',
            url: 'http://placehold.it/150x150',

            x: 0,
            y: 0,
            created: 0
        },

        initialize: function(attributes, options) {
            if (this.isNew()) {
                this.set('created', Date.now());
            }
        },
    });

    Bone.itemList = Backbone.Collection.extend({
        model: Bone.item,

        localStorage: new Backbone.LocalStorage('items-backbone-marionette'),

        comparator: 'created',
    });
})();
