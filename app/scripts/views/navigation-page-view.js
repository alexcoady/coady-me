/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'routes/navigation-router',
], function ($, _, Backbone, JST, NavigationRouter) {
    'use strict';

    var NavigationPageView = Backbone.View.extend({

    	tagName: 'li',

    	className: 'list-item page-item',

        template: JST['app/scripts/templates/navigation-page.ejs'],

        events: {

            'click a': 'clickedMe'
        },

        initialize: function () {

            this.model.on('change:active', this.render, this);
        },

        render: function () {

        	var template = this.template( this.model.toJSON() );
        	this.$el.html(template);

            if (this.model.get('active')) {

                this.$el.addClass('active');
            } else {

                this.$el.removeClass('active');
            }

        	return this;
        },

        clickedMe: function () {

            var router = NavigationRouter.getInstance();

            // 1. Need to get the permalink of the owning group of this page

            // 2. Need to get the permalink of this page

            // 3. need to go to this page
            router.navigate( this.model.getFullPermalink(), { 'trigger' : true } );
        }
    });

    return NavigationPageView;
});