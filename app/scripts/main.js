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
        'entry_content': '<a class="key tour" href="#">Take the tour</a>',
        'permalink': 'index',
        'template': 'home'
    })]);

    var pageCollection_about = new PageCollection( [ new PageModel({
        'title': 'About',
        'entry_content': 'My name is <span class="key">Alex Coady</span>. I\'m a Javascript developer from London, UK.',
        'permalink': 'index',
        'template': 'about'
    }), new PageModel({
        'title': 'What I love',
        'entry_content': 'I\'m obsessed with indentation-perfect, <span class="key">terse</span> and powerful code. ',
        'permalink': 'what-i-love',
        'template': 'about'
    }), new PageModel({
        'title': 'What I do',
        'entry_content': 'I write applications using <span class="key">Backbone.js</span>; use build tools like <span class="key">Grunt</span>; and share as much as possible on <span class="key">GitHub</span>.',
        'permalink': 'what-i-do',
        'template': 'about'
    })]);

    var pageCollection_work = new PageCollection( [ new PageModel({
        'title': 'Work',
        'entry_content': 'Check out some of my recent projects, including work for Coca-Cola, Scouts and BT.',
        'permalink': 'index',
    }), new PageModel({
        'title': 'Scouts',
        'entry_content': 'I created a map for the new Scouts website.',
        'permalink': 'scouts',
        'project_url': 'http://scouts.com',
        'template': 'project'
    }), new PageModel({
        'title': 'CokeZone',
        'entry_content': 'Work I did for CokeZone in the form of a thousand emails.',
        'permalink': 'cokezone',
        'project_url': 'http://cokezone.com',
        'template': 'project'
    }),
        new PageModel({
        'title': 'CPSU',
        'entry_content': 'NSPCC\'s Child Protection in Sport Unit website.',
        'permalink': 'cpsu',
        'project_url': 'http://thecpsu.org',
        'template': 'project'
    })]);

    var pageCollection_contact = new PageCollection( [ new PageModel({
        'title': 'Contact',
        'entry_content': 'I\'d really like to hear from you, whether it\'s for a quote or just to discuss your next project.',
        'permalink': 'index',
        'template': 'contact'
    })]);

    var pageCollection_blog = new PageCollection( [ new PageModel({
        'title': 'Blog',
        'entry_content': 'Read all about how awesome I am',
        'permalink': 'index',
    }), new PageModel({
        'title': 'Leaving FTP in the past',
        'entry_content': 'Lorum ipsum dolor sit amet....',
        'permalink': 'leaving-ftp-in-the-past',
        'template': 'blog'
    }), new PageModel({
        'title': 'Getting good with Git',
        'entry_content': 'Lorum ipsum dolor sit amet....',
        'permalink': 'getting-goog-with-git',
        'template': 'blog'
    })]);

    // Define our dummy PAGE GROUPS
    var pageGroup_home = new PageGroupModel({ 'title': 'home', 'permalink':'home', 'pageCollection': pageCollection_home });
    var pageGroup_about = new PageGroupModel({ 'title': 'about', 'permalink':'about', 'pageCollection': pageCollection_about });
    var pageGroup_work = new PageGroupModel({ 'title': 'work', 'permalink':'work', 'pageCollection': pageCollection_work });
    var pageGroup_contact = new PageGroupModel({ 'title': 'contact', 'permalink':'contact', 'pageCollection': pageCollection_contact });
    var pageGroup_blog = new PageGroupModel({ 'title': 'blog', 'permalink':'blog', 'pageCollection': pageCollection_blog });

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