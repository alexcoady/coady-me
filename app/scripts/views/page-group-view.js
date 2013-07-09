/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/page-collection-view',
], function ($, _, Backbone, JST, PageCollectionView) {
    'use strict';

    var PageGroupView = Backbone.View.extend({

    	tagName: 'li',

    	className: 'page-group-item list-item',

        initialize: function () {

            this.model.on('change:active', this.toggleActive, this);
        },

        render: function () {

            // TODO: Improve optimisation (Maybe delay emptying until transitions have ended etc..)
            var pageCollectionView = new PageCollectionView({ collection: this.model.get('pageCollection') });
            this.$el.html(pageCollectionView.render().el);

            this.$el.addClass('group-' + this.model.get('title'));

            return this;
        },

        toggleActive: function () {

            console.log(this.model);

            if (this.model.get('active')) {

                this.$el.addClass('active').removeClass('inactive');
                $('#utility-bar').css('background-color', this.model.get('key_color'));
                // $('.logo-element').css('fill', this.model.get('key_color'));

            } else {

                this.$el.removeClass('active').addClass('inactive');
            }


        }
    });

    return PageGroupView;
});