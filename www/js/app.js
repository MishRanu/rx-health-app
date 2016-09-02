// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material' ,'starter.services', 'starter.controllers', 'starter.dcontrollers']);

app.run(function (Http,$ionicPlatform, $state, $ionicPopup, $ionicHistory, $ionicLoading) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
 
$ionicConfigProvider.views.transition('ios');
$ionicConfigProvider.tabs.position('top'); 

    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.lists', {
        url: '/lists',
        views: {
            'menuContent': {
                templateUrl: 'templates/lists.html',
                controller: 'ListsCtrl'
            }
        }
    })

    .state('app.ink', {
        url: '/ink',
        views: {
            'menuContent': {
                templateUrl: 'templates/ink.html',
                controller: 'InkCtrl'
            }
        }
    })

    .state('app.motion', {
        url: '/motion',
        views: {
            'menuContent': {
                templateUrl: 'templates/motion.html',
                controller: 'MotionCtrl'
            }
        }
    })

    .state('app.components', {
        url: '/components',
        views: {
            'menuContent': {
                templateUrl: 'templates/components.html',
                controller: 'ComponentsCtrl'
            }
        }
    })

    .state('app.extensions', {
        url: '/extensions',
        views: {
            'menuContent': {
                templateUrl: 'templates/extensions.html',
                controller: 'ExtensionsCtrl'
            }
        }
    })

  .state('app.tabs', {
    url: "/tabs",
    views: {
      'menuContent': {
        templateUrl: "templates/tabs.html",
        controller: 'tabsController'
      }
    }
  })

    .state('app.tabs.symptify', {
        url: '/symptify', 
        views:{
            'symptify':{
                templateUrl: 'templates/symptify.html',
                controller: 'SymptifyCtrl'
            }
        }
    })

    .state('app.tabs.feed', {
        url: '/feed', 
        views:{
            'feed':{
                templateUrl: 'templates/feed.html',
                controller: 'FeedCtrl'
            }
        }
    })
    
        .state('app.tabs.groups', {
        url: '/groups', 
        views:{
            'groups':{
                templateUrl: 'templates/groups.html',
                controller: 'GroupsCtrl'
            }
        }
    })
    
        .state('app.tabs.notifications', {
        url: '/notifications', 
        views:{
            'notifications':{
                templateUrl: 'templates/notifications.html',
                controller: 'NotificationsCtrl'
            }
        }
    })
    
    .state('comments', {
        url: '/comments',
        templateUrl: 'templates/comments.html',
        controller: 'CommentsCtrl'
    })



    .state('dapp', {
        url: '/dapp',
        abstract: true,
        templateUrl: 'dtemplates/menu.html',
        controller: 'dAppCtrl'
    })

    .state('dapp.lists', {
        url: '/lists',
        views: {
            'dmenuContent': {
                templateUrl: 'dtemplates/lists.html',
                controller: 'dListsCtrl'
            }
        }
    })

    .state('dapp.ink', {
        url: '/ink',
        views: {
            'dmenuContent': {
                templateUrl: 'dtemplates/ink.html',
                controller: 'dInkCtrl'
            }
        }
    })

    .state('dapp.motion', {
        url: '/motion',
        views: {
            'dmenuContent': {
                templateUrl: 'dtemplates/motion.html',
                controller: 'dMotionCtrl'
            }
        }
    })

    .state('dapp.components', {
        url: '/components',
        views: {
            'dmenuContent': {
                templateUrl: 'dtemplates/components.html',
                controller: 'dComponentsCtrl'
            }
        }
    })

    .state('dapp.extensions', {
        url: '/extensions',
        views: {
            'dmenuContent': {
                templateUrl: 'dtemplates/extensions.html',
                controller: 'dExtensionsCtrl'
            }
        }
    })

  .state('dapp.dtabs', {
    url: "/dtabs",
    views: {
      'dmenuContent': {
        templateUrl: "dtemplates/tabs.html",
      }
    }
  })

    .state('dapp.dtabs.symptify', {
        url: '/symptify', 
        views:{
            'dsymptify':{
                templateUrl: 'dtemplates/symptify.html',
                controller: 'dSymptifyCtrl'
            }
        }
    })

    .state('dapp.dtabs.feed', {
        url: '/feed', 
        views:{
            'dfeed':{
                templateUrl: 'dtemplates/feed.html',
                controller: 'dFeedCtrl'
            }
        }
    })

    .state('dapp.dtabs.groups', {
        url: '/groups', 
        views:{
            'dgroups':{
                templateUrl: 'dtemplates/groups.html',
                controller: 'dGroupsCtrl'
            }
        }
    })

    .state('dapp.dtabs.notifications', {
        url: '/notifications', 
        views:{
            'dnotifications':{
                templateUrl: 'dtemplates/notifications.html',
                controller: 'dNotificationsCtrl'
            }
        }
    })

    .state('dapp.dtabs.profile', {
        url: '/profile',
        views: {
            'dgroups': {
                templateUrl: 'dtemplates/community.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })
    .state('dapp.dtabs.activity', {
        url: '/activity',
        views: {
            'dgroups': {
                templateUrl: 'dtemplates/activity.html',
                controller: 'ActivityCtrl'
            },
            'fabContent': {
                template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    .state('dapp.dtabs.connections', {
        url: '/connections',
        views: {
            'dgroups': {
                templateUrl: 'dtemplates/connections.html',
                controller: 'ConnectionsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })

    .state('dapp.dtabs.followers', {
        url: '/followers',
        views: {
            'dgroups': {
                templateUrl: 'dtemplates/followers.html',
                controller: 'FollowersCtrl'
            },
            'fabContent': {
                template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-gallery').classList.toggle('on');
                    }, 600);
                }
            }
        }
    })

    .state('welcome', {
        url: '/welcome', 
        templateUrl: 'templates/welcome.html', 
        controller: 'WelcomeCtrl'
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/welcome');
});
