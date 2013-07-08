/*global define*/

define([
    'underscore',
    'backbone',
    'collections/page-group-collection',
    'routes/navigation-router'
], function (_, Backbone, PageGroupCollection, NavigationRouter) {
    'use strict';

    var ViewHelperModel = Backbone.Model.extend({
        
        defaults: {
        },

        initialize: function () {

        }
    },
    {
    	getTransitionEndFunction: function () {

    		if (!this.transition_end_function) {

    			var t,
			    	el = document.createElement('fakeelement'),
			    	transitions = {
			      'transition':'transitionend',
			      'OTransition':'oTransitionEnd',
			      'MozTransition':'transitionend',
			      'WebkitTransition':'webkitTransitionEnd'
			    }

			    for(t in transitions){
			        
			        if( el.style[t] !== undefined ){
			        	
			        	this.transition_end_function = transitions[t]
			        }
			    }
    		} 

    		return this.transition_end_function;
    	}
    });

    return ViewHelperModel;
});