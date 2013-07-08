/*global define*/

define([
    'underscore',
    'backbone',
    'models/page-group-model'
], function (_, Backbone, PageGroupModel) {
    'use strict';

    var PageGroupCollection = Backbone.Collection.extend({

        model: PageGroupModel,

        current: false,

        instance: false
    },
    // Static methods
    {
    	setInstance: function (instance) {

    		this.instance = instance;
    	},

    	getInstance: function () {

    		return this.instance ? this.instance : false;
    	}
    });

    return PageGroupCollection;
});