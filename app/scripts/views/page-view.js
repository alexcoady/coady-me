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
            this.$el.addClass("template-" + this.model.get('template') + " page-" + this.model.get('permalink') + " inactive");
        },

        /*
        *   Function render
        *   ----------------------------------------------------------
        *   Renders a page to this view using it's template
        *   ----------------------------------------------------------
        *   @param null
        *   @return View: This view
        */
        render: function () {

            var template = this.template( this.model.toJSON() );
            this.$el.html(template);

            return this;
        },

        /*
        *   Function toggleActive
        *   ----------------------------------------------------------
        *   Sets the correct active state
        *   ----------------------------------------------------------
        *   @param null
        *   @return View: This view
        */
        toggleActive: function () {

            if (this.model.get('active')) {

                document.title = this.model.get('title');
                this.$el.addClass('active').removeClass('inactive');


                // If we're on the small screen version, we want to physically scroll to the page
                if ( $(document).width() <= 640 ) {

                    // Find physical location of requested page
                    console.log( this.$el.position() );
                    // Move user down there

                    $('html, body').animate({
                        scrollTop: this.$el.position().top
                    }, 1000);
                }

            } else {

                this.$el.removeClass('active').addClass('inactive');
            }

            return this;
        },

        /*
        *   Function makeActive
        *   ----------------------------------------------------------
        *   Activates this view's model
        *   ----------------------------------------------------------
        *   @param null
        *   @return Void
        */
        makeActive: function () {

            var router = NavigationRouter.getInstance();
            router.navigate( this.model.getFullPermalink(), { 'trigger' : true } );
        }
    });

    return PageView;
});