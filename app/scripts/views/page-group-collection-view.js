/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/page-group-view'
], function ($, _, Backbone, JST, PageGroupView) {
    'use strict';

    var PageGroupCollectionView = Backbone.View.extend({

    	tagName: 'ul',

    	className: 'page-group-collection-list list',

        render: function () {

            var that = this;

            this.collection.each(function (pageGroup) {

                var pageGroupView = new PageGroupView({ model: pageGroup });
                that.$el.append(pageGroupView.render().el);
            });

            return this;
        }
    });

    return PageGroupCollectionView;
});