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

				initialize: function() {
					this.$el.attr('draggable', 'false');

					this.el.style.left = this.model.get('x');
					this.el.style.top = this.model.get('y');
				},

				deleteModel: function () {
					this.model.destroy();
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
                var x_pos = document.all ? window.event.clientX : e.pageX;
                var y_pos = document.all ? window.event.clientY : e.pageY;

								console.log(x_pos, y_pos);

                this.el.style.left = (this.model.get('x') + (x_pos - this.model.get('x'))) + 'px';
                this.el.style.top = (this.model.get('y') + (y_pos - this.model.get('y'))) + 'px';

                console.log(this.el.style.left, this.el.style.top);
            }
        },

        onDragEnd: function(e) {
            this.selected = false;

            this.model.x = this.el.offsetLeft;
            this.model.y = this.el.offsetTop;

            this.model.save();
        },

        toggleContentEditable: function(state) {
            if (state !== true && state !== false) {
                state = false;
            }

            var editor = new MediumEditor(this.$el);
            this.ui.item.attr('contenteditable', state);
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
            // var ENTER_KEY = 13;
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

        // ui: {
        // 	toggle: '#toggle-all'
        // },

        events: {
            'drop': 'onDrop',
            // 	'click @ui.toggle': 'onToggleAllClick'
        },

        onDrop: function(e) {
            e.preventDefault();
            // let elementId = e.dataTransfer.getData('text'),
            // 		element = document.getElementById(elementId);
            // e.target.appendChild(element);
            // $(element).attr('style', 'border:none;');
        },

        // collectionEvents: {
        // 	'change:completed': 'render',
        // 	all: 'setCheckAllState'
        // },

        initialize: function() {
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
