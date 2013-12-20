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
        'title': "I'm Alex",
        'entry_content': "<p><h2>I'm Alex, a JavaScript & front-end developer from London.</h2></p> <p>I care how things look; especially the <a class='key' href='/#contact/index'>code I write</a> and the visual design of whatever it is <a class='key' href='/#work'>I'm working on</a>.</p> <p>I have an eye for design, but I'm not a designer. I'm inspired by working on <a class='key' href='/#work/zone-screens'>great-looking projects</a> that have a <a class='key' href='/#work/tesco-kitchen'>real purpose</a>.</p> <p>I'm someone who you can <a class='key' href='/#contact'>discuss ideas</a> with and get honest feedback. I really enjoy these conversations and think they're especially important in an agency. If you're not technical we can still have these discussions, and I promise you won't hear a single unknown abbreviation.</p>",
        'permalink': 'index',
        'template': 'about'
    })]);

    var pageCollection_work = new PageCollection( [ new PageModel({
        'title': 'Work',
        'entry_content': "<p><h2>Check out some of my recent projects.</h2></p> <p><ul class='work-links'> <li><a class='key' href='/#work/zone-responsive'>Zone responsive</a></li> <li><a class='key' href='/#work/scouts'>Scouts</a></li> <li><a class='key' href='/#work/zone-screens'>Zone screens</a></li>  <li><a class='key' href='/#work/tesco-kitchen'>Tesco My Kitchen</a></li> </ul></p>",
        'permalink': 'index',
        'template': 'about'
    }), 

    new PageModel({
        'title': 'Zone responsive',
        'entry_content': '',
        'permalink': 'zone-responsive',
        'project_url': 'http://thisiszone.com',
        'images': [
            '/images/work/zone-mobile.png'
        ],
        'template': 'project'
    }),

    new PageModel({
        'title': 'Scouts',
        'entry_content': '',
        'permalink': 'scouts',
        'project_url': 'http://scouts.org.uk',
        'images': [
            '/images/work/scouts-map.png'
        ],
        'template': 'project'
    }),

    new PageModel({
        'title': 'Zone screens',
        'entry_content': 'Data visualisation project',
        'permalink': 'zone-screens',
        'project_url': '',
        'images': [
            '/images/work/screens-tweets.png'
        ],
        'template': 'project'
    }), 

    new PageModel({
        'title': 'Tesco My Kitchen',
        'entry_content': 'Responsive Facebook app for Tesco',
        'permalink': 'tesco-kitchen',
        'project_url': 'https://www.facebook.com/tesco/app_475370039172995',
        'images': [
            '/images/work/tesco-desktop.png'
        ],
        'template': 'project'
    })]);

    var pageCollection_contact = new PageCollection( [ new PageModel({
        'title': 'Get in touch',
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
    var pageGroupCollection = new PageGroupCollection([
        // pageGroup_home, 
        pageGroup_about, 
        pageGroup_work, 
        pageGroup_contact, 
        // pageGroup_blog
    ]);

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