/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/page-view'
], function ($, _, Backbone, JST, PageView) {
    'use strict';

    var PagesAboutPageView = PageView.extend({

        template: JST['app/scripts/templates/pages/about-page.ejs']
        
    });

    return PagesAboutPageView;
});