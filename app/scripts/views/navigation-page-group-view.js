/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/navigation-page-collection-view'
], function ($, _, Backbone, JST, NavigationPageCollectionView) {
    'use strict';

    var NavigationPageGroupView = Backbone.View.extend({

    	tagName: 'li',

    	className: 'list-item page-group-item',

    	initialize: function () {

            this.$el.addClass("template-" + this.model.get('title'));
            this.model.on('change:active', this.toggleActive, this);
    	},

    	render: function () {

    		var navigationPageCollectionView = new NavigationPageCollectionView({ collection: this.model.get('pageCollection') });
    		this.$el.append( navigationPageCollectionView.render().el );

            if (this.model.get('active')) {

                this.$el.addClass('active');
            } else {

                this.$el.removeClass('active');
            }

    		return this;
    	},

        toggleActive: function () {

            if (this.model.get('active')) {

                this.$el.addClass('active');
            } else {

                this.$el.removeClass('active');
            }

            return this;
        }
    });

    return NavigationPageGroupView;
});