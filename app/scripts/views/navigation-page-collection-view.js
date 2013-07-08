/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/navigation-page-view'
], function ($, _, Backbone, JST, NavigationPageView) {
    'use strict';

    var NavigationPageCollectionView = Backbone.View.extend({

    	tagName: 'ul',

    	className: 'list page-collection-list',

    	intiialize: function () {


    	},

    	render: function () {

    		var that = this;

    		this.collection.each(function (page) {

    			var navigationPageView = new NavigationPageView({ model: page });
    			that.$el.append( navigationPageView.render().el );
    		});

    		return this;
    	}

    });

    return NavigationPageCollectionView;
});