/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/page-view',
], function ($, _, Backbone, JST, PageView) {
    'use strict';

    var PagesProjectPageView = PageView.extend({

        template: JST['app/scripts/templates/pages/project-page.ejs'],

        render: function () {

            var that = PagesProjectPageView.__super__.render.apply(this, arguments);

            return that;
        }
        
    });

    return PagesProjectPageView;
});