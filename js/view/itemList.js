/*global Bone: true, Backbone */

var Bone = Bone || {};

(function() {
    'use strict';

    Bone.itemView = Backbone.Marionette.ItemView.extend({
        tagName: 'div',
        template: '#template-itemItemView',
        ui: {
            destroy: '.destroy',
            item: '.e-content',
            toggle: '.toggle'
        },
        events: {
            'click @ui.destroy': 'deleteModel',
            'dblclick @ui.item': 'onEditClick',
            'keydown @ui.item': 'onEditKeypress',
            'focusout @ui.item': 'onEditFocusout',
            'mousedown': 'onDragStart',
            'mouseup': 'onDragEnd',
            'mousemove': 'onDrag',
        },

        modelEvents: {
            change: 'render'
        },

        deleteModel: function() {
            this.model.destroy();
        },

        onRender: function() {
            this.$el.draggable();
        },

        className: function() {
            var className = 'view',
                type = this.model.get('type');

            if (type === 'text') {
                className += ' e-text';
            } else if (type === 'image') {
                className += ' e-image';
            }

            return className;
        },

        onDragStart: function(e) {
            this.selected = true;
        },

        onDrag: function(e) {
            if (this.selected === true) {
                var x = document.all ? window.event.clientX : e.pageX;
                var y = document.all ? window.event.clientY : e.pageY;

                var x = this.el.offsetLeft,
                    y = this.el.offsetTop;

                this.model.set('x', x);
                this.model.set('y', y);

                this.model.save();
                //
                //     this.el.style.left = (this.model.get('x') + (x - this.model.get('x'))) + 'px';
                //     this.el.style.top = (this.model.get('y') + (y - this.model.get('y'))) + 'px';
                //
                //     console.log(this.el.style.left, this.el.style.top);
            }
        },

        onDragEnd: function(e) {
            this.selected = false;

            var x = this.el.offsetLeft,
                y = this.el.offsetTop;

            // console.log(x, y);

            this.model.set('x', x);
            this.model.set('y', y);

            this.model.save();

            // console.log(this.el.offsetLeft, this.el.offsetTop);
        },

        toggleContentEditable: function(state) {
            if (state !== true && state !== false) {
                state = false;
            }

            var editor = new MediumEditor(this.ui.item);
            // this.ui.item.attr('contenteditable', state);
        },

        onEditClick: function(e) {
            e.preventDefault();

            this.$el.addClass('editing');
            this.toggleContentEditable(true);
            this.ui.item.focus();
        },

        onEditFocusout: function() {
            var itemText = this.ui.item.text();
            if (itemText) {
                this.model.set('text', itemText).save();
                this.$el.removeClass('editing');
                this.toggleContentEditable(false);
            }
        },

        onEditKeypress: function(e) {
            var ESC_KEY = 27;

            if (e.which === ESC_KEY) {
                this.$el.removeClass('editing');
                this.onEditFocusout();
            }
        }
    });

    Bone.ListView = Backbone.Marionette.CompositeView.extend({
        template: '#template-itemListCompositeView',
        className: 'e-page-container',
        childView: Bone.itemView,
        childViewContainer: '#item-list',
    });
})();
