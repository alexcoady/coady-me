/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/navigation-page-group-view',
], function ($, _, Backbone, JST, NavigationPageGroupView) {
    'use strict';

    var NavigationPageGroupCollectionView = Backbone.View.extend({

    	tagName: 'ul',

    	className: 'list page-group-list',

    	initialize: function () {


    	},

    	render: function () {

    		var that = this;

    		this.collection.each(function (pageGroup) {

    			var navigationPageGroupView = new NavigationPageGroupView({ model: pageGroup });
    			that.$el.append( navigationPageGroupView.render().el );
    		});

    		return this;
    	}
    });

    return NavigationPageGroupCollectionView;
});