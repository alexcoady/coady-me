define([
    'underscore',
    'backbone',
    'collections/page-collection',
    'collections/page-group-collection',
], function (_, Backbone, PageCollection, PageGroupCollection) {
    'use strict';

    var PageModel = Backbone.Model.extend({

    	tagName: 'li',

    	className: 'page-item list-item',
        
        defaults: {
        	'title': 'New page',
        	'description': 'Welcome to this new page, friend!',
        	'permalink': 'new-page',
            'key_colour': 'yellowgreen',
        	'template': 'default',
            'active': false
        },

        initialize: function () {

        },

        getFullPermalink: function () {

            // TODO: Add error checking (Did we 'findWhere' for example)
            var pageGroupCollection = PageGroupCollection.getInstance();

            var pageGroup = pageGroupCollection.findWhere({ 'pageCollection': this.collection });

            var pageGroupPermalink = pageGroup.get('permalink');

            return "/" + pageGroupPermalink + "/" + this.get('permalink');
        }
    },
    {
        loadPage: function (page_group_permalink, page_permalink) {

            // If no page_permalink was set, we look for the INDEX
            page_group_permalink = page_group_permalink ? page_group_permalink : "about";
            page_permalink = page_permalink ? page_permalink : "index";

            /* ---------------------------------------------------------------------- */
            // Find and manage page navigation
            /* ---------------------------------------------------------------------- */

            // Get all page information
            var pageGroupCollection = PageGroupCollection.getInstance();

            // 1. Find page group with matching permalink
            var pageGroup = pageGroupCollection.findWhere({ 'permalink': page_group_permalink });
            if (!pageGroup) { 
                
                console.log('404!');
                return false;
            }

            // 2. Get collection from group model
            var pageCollection = pageGroup.get('pageCollection');
            if (!pageCollection) { 
                
                console.log('BROKEN: No pageCollection found in valid page group');
                return false;
            }

            // 3. Get page from collection
            var page = pageCollection.findWhere({ 'permalink': page_permalink });
            if (!page) { 
                
                console.log('404: Page not found within valid page group');
                return false;
            }

            /* ---------------------------------------------------------------------- */
            // At this point we have a page to display - excellent!
            // 
            // There is most likely already an active page. Before we do anything with
            // our new request, let's deactivate that one.
            /* ---------------------------------------------------------------------- */

            // DEACTIVATE ACTIVE PAGE
            // 1. Find currently-active PAGE GROUP
            var activePageGroup = pageGroupCollection.findWhere({ 'active': true });
            if (activePageGroup) {
            
                // 2. Get the PAGE COLLECTION from the PAGE GROUP
                var activePageCollection = activePageGroup.get('pageCollection');
                if (!activePageCollection.length) { 
                    
                    console.log('BROKEN: No pageCollection found in active page group [HOUSE KEEPING]');
                    return false;
                }

                // 3. Get the PAGE from the PAGE COLLECTION
                var activePage = activePageCollection.findWhere({ 'active': true });
                if (!activePage) { 
                    
                    console.log('BROKEN: No active page found within active page group (' + activePageGroup.get('permalink') + ') [HOUSE KEEPING]');
                    return false;
                }

                // 4. Deactivate PAGE
                activePage.set('active', false);

                // 5. Deactivate PAGE GROUP
                activePageGroup.set('active', false);
            }

            // ACTIVATE REQUESTED PAGE
            // 1. Activate PAGE
            page.set('active', true);

            // 2. Activate PAGE GROUP
            pageGroup.set('active', true);

            var container_coordinates = {};
            container_coordinates.y = pageCollection.indexOf(page);
            container_coordinates.x = pageGroupCollection.indexOf(pageGroup);

            // Physically move the container to show the current page
            $('#container').css({
                'left': ((container_coordinates.x * 100) * -1) + '%',
                'top': ((container_coordinates.y * 100) * -1) + '%'
            });

            // TODO: Add property to page such as 'prepare_to_remove' that keeps it rendered, but that is also removed
            // once the CSS transition has ended. This will keep the UI a lot more pleasent. This should probably be
            // a property of the VIEW rather than of the actual model seeing as it has no importance to the actual
            // model. It's purely presentational.
        }
    });

    return PageModel;
});