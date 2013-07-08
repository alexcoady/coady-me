/*global define*/

define([
    'underscore',
    'backbone',
    'models/page-model'
], function (_, Backbone, PageModel) {
    'use strict';

    var PageCollection = Backbone.Collection.extend({
    // Instance methods
        
        model: PageModel
        
    });

    return PageCollection;
});