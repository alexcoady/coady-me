/*global define*/

define([
    'jquery',
    'backbone',
    'models/page-model',
    'models/page-group-model',
    'collections/page-collection',
    'collections/page-group-collection',
    'views/page-view',
    'views/page-group-view',
    'views/page-group-collection-view',
    'routes/navigation-router',
    'models/view-helper-model',
], function ($, Backbone, PageModel, PageGroupModel, PageCollection, PageGroupCollection, PageView, PageGroupView, PageGroupCollectionView, NavigationRouter, ViewHelper) {
    'use strict';

    var NavigationRouter = Backbone.Router.extend({
        
        routes: {
        	':pageGroup':          'loadPage',
        	':pageGroup/':         'loadPage',
        	':pageGroup/:page':    'loadPage',
        	':pageGroup/:page/':   'loadPage',
            '*path':               'loadPage'
        },

        initialize: function () {

            // ViewHelper.bindKeyboard(this);
        },

        loadPage: function (page_group_permalink, page_permalink) {

            PageModel.loadPage(page_group_permalink, page_permalink);
        }
    },
    {
        getInstance: function () {

            if (this._instance === undefined) {

                this._instance = new this();
            }

            return this._instance;
        }
    });

    return NavigationRouter;
});