'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone-amd/backbone',
        underscore: '../bower_components/underscore-amd/underscore'
    }
});

require([
    'backbone',
    'models/page-model',
    'models/page-group-model',
    'collections/page-collection',
    'collections/page-group-collection',
    'views/page-group-collection-view',
    'routes/navigation-router',
    'models/view-helper-model',
    'views/navigation-page-group-collection-view',
    'views/keyboard-device-view'
], function (Backbone, PageModel, PageGroupModel, PageCollection, PageGroupCollection, PageGroupCollectionView, NavigationRouter, ViewHelper, NavigationPageGroupCollectionView, KeyboardDevice) {

    // Define our dummy PAGES automatically in PAGE COLLECTIONS 
    // TODO: Sync with Wordpress back-end
    var pageCollection_home = new PageCollection( [ new PageModel({
        'title': 'Home',
        'description': 'Welcome to the portfolio website of Alex Coady.',
        'permalink': 'index',
        'template': 'home'
    })]);

    var pageCollection_about = new PageCollection( [ new PageModel({
        'title': 'About',
        'description': 'My name is Alex Coady. I\'m a front-end & Javascript developer from London, UK.',
        'permalink': 'index',
        'template': 'about'
    })]);

    var pageCollection_work = new PageCollection( [ new PageModel({
        'title': 'Work',
        'description': 'Check out some of my recent projects, including work for Coca-Cola, Scouts and BT.',
        'permalink': 'index',
    }), new PageModel({
        'title': 'Scouts',
        'description': 'I created a map for the new Scouts website.',
        'permalink': 'scouts',
        'project_url': 'http://scouts.com',
        'template': 'project'
    }), new PageModel({
        'title': 'CokeZone',
        'description': 'Work I did for CokeZone in the form of a thousand emails.',
        'permalink': 'cokezone',
        'project_url': 'http://cokezone.com',
        'template': 'project'
    }),
        new PageModel({
        'title': 'CPSU',
        'description': 'NSPCC\'s Child Protection in Sport Unit website.',
        'permalink': 'cpsu',
        'project_url': 'http://thecpsu.org',
        'template': 'project'
    })]);

    var pageCollection_contact = new PageCollection( [ new PageModel({
        'title': 'Contact',
        'description': 'I\'d really like to hear from you, whether it\'s for a quote or just to discuss your next project.',
        'permalink': 'index',
        'template': 'contact'
    })]);

    var pageCollection_blog = new PageCollection( [ new PageModel({
        'title': 'Blog',
        'description': 'Read all about how awesome I am',
        'permalink': 'index',
    }), new PageModel({
        'title': 'Leaving FTP in the past',
        'description': 'Lorum ipsum dolor sit amet....',
        'permalink': 'leaving-ftp-in-the-past',
        'template': 'blog'
    }), new PageModel({
        'title': 'Getting good with Git',
        'description': 'Lorum ipsum dolor sit amet....',
        'permalink': 'getting-goog-with-git',
        'template': 'blog'
    })]);

    // Define our dummy PAGE GROUPS
    var pageGroup_home = new PageGroupModel({ 'class': 'group-home', 'permalink':'home', 'key_colour': '#e74c3c', 'pageCollection': pageCollection_home });
    var pageGroup_about = new PageGroupModel({ 'class': 'group-about', 'permalink':'about', 'key_colour': '#e67e22', 'pageCollection': pageCollection_about });
    var pageGroup_work = new PageGroupModel({ 'class': 'group-work', 'permalink':'work', 'key_colour': '#16a085', 'pageCollection': pageCollection_work });
    var pageGroup_contact = new PageGroupModel({ 'class': 'group-contact', 'permalink':'contact', 'key_colour': '#2980b9', 'pageCollection': pageCollection_contact });
    var pageGroup_blog = new PageGroupModel({ 'class': 'group-blog', 'permalink':'blog', 'key_colour': '#2c3e50', 'pageCollection': pageCollection_blog });

    // Add our dummy PAGE GROUPS to a collection
    var pageGroupCollection = new PageGroupCollection([pageGroup_home, pageGroup_about, pageGroup_work, pageGroup_contact, pageGroup_blog]);

    // Set the global instance of all the page data so we can access it anywhere in the system
    PageGroupCollection.setInstance(pageGroupCollection);

    // Create a view for our PAGE GROUP COLLECTION
    var pageGroupColectionView = new PageGroupCollectionView({ collection: pageGroupCollection });

    // Render the panels to the stage
    $('#container').html(pageGroupColectionView.render().el);

    // NAVIGATION
    // 1. Build view for navigation
    var navigationPageGroupCollectionView = new NavigationPageGroupCollectionView({ collection: pageGroupCollection });

    $('#navigation').html(navigationPageGroupCollectionView.render().el);

    $('#keyboard-device').html(KeyboardDevice.getInstance().render().el);

    // Start the router
    NavigationRouter.getInstance(); // Don't have to assign it anything. Just initialize and it's up and running
    Backbone.history.start({pushState: false});
});