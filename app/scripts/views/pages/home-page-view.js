/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/page-view'
], function ($, _, Backbone, JST, PageView) {
    'use strict';

    var PagesHomePageView = PageView.extend({

        template: JST['app/scripts/templates/pages/home-page.ejs']
        
    });

    return PagesHomePageView;
});