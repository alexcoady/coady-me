/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'routes/navigation-router',
    'collections/page-group-collection'
], function ($, _, Backbone, JST, NavigationRouter, PageGroupCollection) {
    'use strict';

    var KeyboardDeviceView = Backbone.View.extend({

        template: JST['app/scripts/templates/keyboard-device.ejs'],

        events: {

        	'click .left-button': 	'registerLeft',
        	'click .up-button': 	'registerUp',
        	'click .right-button': 'registerRight',
        	'click .down-button': 	'registerDown'
        },

        initialize: function () {

        	KeyboardDeviceView.bindKeyboard();
        },

        render: function () {

        	var template = this.template(  );
        	this.$el.html(template);

        	return this;
        },

        registerLeft: function () {

        	KeyboardDeviceView.doGridTransform({ 'x': -1, 'y': 0 });
        },

        registerUp: function () {

        	KeyboardDeviceView.doGridTransform({ 'x': 0, 'y': -1 });
        },

        registerRight: function () {

        	KeyboardDeviceView.doGridTransform({ 'x': 1, 'y': 0 });
        },

        registerDown: function () {

        	KeyboardDeviceView.doGridTransform({ 'x': 0, 'y': 1 });
        }

    },
    {
    	getInstance: function () {

    		if (this._instance === undefined) {

    			this._instance = new this();
    		}

    		return this._instance;
    	},

        bindKeyboard: function () {

        	var that = this;

            $(window).on('keydown', function (keyEvent) { 

                var transform = { x: 0, y: 0 };

                switch (keyEvent.keyCode) {

                    case 37: {

                        transform.x += -1;
                        break;
                    }
                    case 38: {

                        transform.y += -1;
                        break;
                    }
                    case 39: {

                        transform.x += 1;
                        break;
                    }
                    case 40: {

                        transform.y += 1;
                        break;
                    }
                }

                if (transform.x !== 0 || transform.y !== 0) {
                    that.doGridTransform(transform);
                }
            });
        },

        doGridTransform: function (transform) {

        	/* ---------------------------------------------------------------------- */
			// PERFORM A TRANSFORMATION ON THE GRID
			// 1. Get the current grid index
			// 2. Apply transformation
			// 3. Check request validity
			// 4. Perform (or don't) physical grid transformation
			/* ---------------------------------------------------------------------- */

        	// Get page group, page collection, page
        	var pageGroupCollection = PageGroupCollection.getInstance(),
            	pageGroup = pageGroupCollection.findWhere({ 'active': true }),
                pageCollection = pageGroup.get('pageCollection'),
                page = pageCollection.findWhere({ 'active': true }),

                // Define other variables for this function
                index = {},
                request_index = {};

            // 1. Get the current grid index
            index.x = request_index.x = pageGroupCollection.indexOf(pageGroup);
            index.y = request_index.y = pageCollection.indexOf(page);

            // 2. Apply transformation
            request_index.x += transform.x;
            request_index.y += transform.y;

            // 3. Check request validity
            var requestPageGroup = pageGroupCollection.at(request_index.x);
            if (!requestPageGroup) {
                console.log('404: No page group at', request_index.x);
                return false;
            }

            var requestPageCollection = requestPageGroup.get('pageCollection');
            var requestPage = requestPageCollection.at(request_index.y);
            if (!requestPage) {
                console.log('404: No page at', request_index.y);
                return false;
            }

            // 4. Perform physical grid transformation
            var navRouter = NavigationRouter.getInstance();
            navRouter.navigate(requestPage.getFullPermalink(), { 'trigger': true, 'replace': true });

            /* ---------------------------------------------------------------------- */
			// TAKE THIS FURTHER & MAKE USE OF WORK COMPLETED ABOVE
			// We have had to do quite a lot to perform this transformation in terms
			// of searching for models in collections. Let's use the work we have 
			// done and update the classes in the view to show which buttons are
			// pressable.
			/* ---------------------------------------------------------------------- */

			// TODO: 
        }
    });

    return KeyboardDeviceView;
});