/*global define*/

define([
    'underscore',
    'backbone',
    'collections/page-collection'
], function (_, Backbone, PageCollection) {
    'use strict';

    var PageGroupModel = Backbone.Model.extend({
        
        defaults: {
        	'permalink': 'home', // Top level navigation (ie. work/blog)
        	'pageCollection': null,
            'active': false
        },

        initialize: function () {

        	this.pageCollection = new PageCollection();
        }
    });

    return PageGroupModel;
});