/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/page-view',
    'views/pages/contact-page-view',
    'views/pages/project-page-view',
    'views/pages/blog-page-view',
    'views/pages/about-page-view',
    'views/pages/home-page-view',
], function ($, _, Backbone, JST, PageView, ContactPageView, ProjectPageView, BlogPageView, AboutPageView, HomePageView) {
    'use strict';

    var PageCollectionView = Backbone.View.extend({

    	tagName: 'ul',

    	className: 'page-collection-list list',

        render: function () {

            var that = this,
                pageView;

            this.collection.each(function (page){

                /* ---------------------------------------------------------------------- */
                // Build the correct page view (All belong to master PageView)
                /* ---------------------------------------------------------------------- */
                switch (page.get('template')) {

                    case 'contact': {

                        pageView = new ContactPageView({ model: page });
                        break;
                    }
                    case 'project': {

                        pageView = new ProjectPageView({ model: page });
                        break;
                    }
                    case 'blog': {

                        pageView = new BlogPageView({ model: page });
                        break;
                    }
                    case 'about': {

                        pageView = new AboutPageView({ model: page });
                        break;
                    }
                    case 'home': {

                        pageView = new HomePageView({ model: page });
                        break;
                    }
                    default: {

                        pageView = new PageView({ model: page });
                    }
                }

                that.$el.append( pageView.render().el );
            });

            return this;
        }
    });

    return PageCollectionView;
});