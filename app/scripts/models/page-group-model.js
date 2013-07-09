/*global define*/

define([
    'underscore',
    'backbone',
    'collections/page-collection'
], function (_, Backbone, PageCollection) {
    'use strict';

    var PageGroupModel = Backbone.Model.extend({
        
        defaults: {
            'title': 'group',
        	'permalink': 'home', // Top level navigation (ie. work/blog)
        	'pageCollection': null,
            'active': false
        },

        initialize: function () {

        	this.pageCollection = new PageCollection();
            this.set('key_color', PageGroupModel.getGroupColor( this.get('title') ));
        }
    },
    { 
        getGroupColor: function(groupName) {

            var element = document.createElement('testelement');
            element.className = 'color-' + groupName;
            $(document.body).append(element);
            var color = $(element).css('color');
            element.parentNode.removeChild(element);

            console.log('setting color to', color);
            
            return color || false;
        }
    });

    return PageGroupModel;
});