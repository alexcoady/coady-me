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

        template: JST['app/scripts/templates/pages/project-page.ejs']
        
    });

    return PagesProjectPageView;
});