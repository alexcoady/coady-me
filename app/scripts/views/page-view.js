/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'routes/navigation-router'
], function ($, _, Backbone, JST, NavigationRouter) {
    'use strict';

    var PageView = Backbone.View.extend({

    	tagName: 'li',

    	className: 'page-item list-item',
    	
        template: JST['app/scripts/templates/page.ejs'],

        events: {

            'click': 'makeActive'
        },

        initialize: function () {

            this.model.on('change:active', this.toggleActive, this);
            this.$el.addClass("template-" + this.model.get('template') + "page-" + this.model.get('permalink') + " inactive");
        },

        render: function () {

            document.title = this.model.get('title');

            // TODO: Optimise which pages are rendered
            var template = this.template( this.model.toJSON() );
            this.$el.html(template);

            return this;
        },

        toggleActive: function () {

            if (this.model.get('active')) {

                this.$el.addClass('active').removeClass('inactive');

            } else {

                this.$el.removeClass('active').addClass('inactive');
            }
        },

        makeActive: function () {

            var router = NavigationRouter.getInstance();
            router.navigate( this.model.getFullPermalink(), { 'trigger' : true } );
        }
    });

    return PageView;
});