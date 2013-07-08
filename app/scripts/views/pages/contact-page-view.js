/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/page-view'
], function ($, _, Backbone, JST, PageView) {
    'use strict';

    var PagesContactPageView = PageView.extend({

        template: JST['app/scripts/templates/pages/contact-page.ejs']
        
    });

    return PagesContactPageView;
});