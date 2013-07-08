/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/page-view'
], function ($, _, Backbone, JST, PageView) {
    'use strict';

    var PagesBlogPageView = PageView.extend({

        template: JST['app/scripts/templates/pages/blog-page.ejs']
        
    });

    return PagesBlogPageView;
});