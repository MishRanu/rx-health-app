// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material' ,'starter.services', 'starter.directives', 'starter.controllers', 'starter.dcontrollers', 'ngCordova']);

app.run(function (Http,$ionicPlatform, $state, $ionicPopup, $ionicHistory, $ionicLoading, $cordovaSplashscreen, $rootScope) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        //$cordovaSplashscreen.show();
        $rootScope.UserID = 1;

        Http.post('getcommunities', {
          'UserID': $rootScope.UserID
        })
        .success(function(data) {
          $ionicLoading.hide();
          if (data.Status.ResponseCode == 200) {
            var communities = {};
            communities.myCommunities = data.Status.myCommunities;
            communities.connectCommunities = data.Status.connectCommunities;
            communities.adminCommunities = data.Status.adminCommunities;
            communities.following = data.Status.following;
            Http.setdata(communities,'communities');
            // console.dir($scope.myCommunities,$scope.following, $scope.otherCommunities);
            //$cordovaSplashscreen.hide();
          } else {
            alert(data.Status.ResponseMessage);
          }
        }).error(function(data, status, headers, config) {
            //$scope.data.error={message: error, status: status};
            alert("error" + data);
            $ionicLoading.hide();
          });
          Http.post('getnotifications',{UserID : $rootScope.UserID})
          .success(function(data){
            if(data.Status.ResponseCode == 200){
              Http.setdata(data.Status.Notifications,'notifications',new Date());
            }else{
              $ionicPopup.alert({
                title: 'Message',
                template: $scope.ResponseMessage
              });
            }
          })
          .error(function(data){
            console.log("error" + data);
          });
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


    .state('app.QRScanner', {
        url: '/QRScanner',
        views: {
            'menuContent': {
                templateUrl: 'templates/QRScanner.html',
                controller: 'QRScannerCtrl'
            }
        }
    })
    

    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            }
        }
    })

    .state('app.bookmarks', {
        url: '/bookmarks',
        views: {
            'menuContent': {
                templateUrl: 'templates/bookmarks.html',
                controller: 'BookmarkCtrl'
            }
        }
    })

    .state('app.preferences', {
        url: '/preferences',
        views: {
            'menuContent': {
                templateUrl: 'templates/preferences.html',
                controller: 'PreferencesCtrl'
            }
        }
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
        templateUrl: "templates/tabs.html"
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
        url: '/feed/:Prefs',
        views:{
            'feed':{
                templateUrl: 'templates/feed.html',
                controller: 'FeedCtrl',
                params : {Prefs : null}
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


        .state('app.tabs.community', {
        url: '/pcommunity',
        views: {
            'groups': {
                templateUrl: 'templates/community.html',
                controller: 'CommunityCtrl'
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


        .state('app.tabs.notifications', {
        url: '/notifications',
        views:{
            'notifications':{
                templateUrl: 'templates/notifications.html',
                controller: 'NotificationsCtrl'
            }
        }
    })

    .state('search', {
        url: '/search/:CurrentState',
        templateUrl: 'dtemplates/searchtemplate.html',
        controller: 'SearchCtrl'
    })
     .state('search1', {
        url: '/search/:CurrentState',
        templateUrl: 'templates/searchtemplate.html',
        controller: 'pSearchCtrl'
    })




    .state('dapp', {
        url: '/dapp',
        abstract: true,
        templateUrl: 'dtemplates/menu.html',
        controller: 'dAppCtrl'
    })

    .state('dapp.profile', {
        url: '/profile',
        views: {
            'dmenuContent': {
                templateUrl: 'dtemplates/profile.html',
                controller: 'dProfileCtrl'
            }
        }
    })

    .state('dapp.bookmarks', {
        url: '/bookmarks',
        views: {
            'dmenuContent': {
                templateUrl: 'dtemplates/bookmarks.html',
                controller: 'dBookmarkCtrl'
            }
        }
    })

    .state('dapp.preferences', {
        url: '/preferences',
        views: {
            'dmenuContent': {
                templateUrl: 'dtemplates/preferences.html',
                controller: 'dPreferencesCtrl'
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

    .state('dapp.people', {
        url: '/people/:UserID',
        views: {
            'dmenuContent': {
                templateUrl: 'dtemplates/personprofile.html',
                controller: 'dPersonProfileCtrl'
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
   
    .state('dapp.dtabs.community', {
        url: '/groups/:CommuID/:UserType',
        views: {
            'dgroups': {
                templateUrl: 'dtemplates/community.html',
                controller: 'dCommunityCtrl'
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

        .state('dapp.dtabs.community1', {
        url: '/groups/:CommuID/:UserType',
        views: {
            'dgroups': {
                templateUrl: 'dtemplates/community1.html',
                controller: 'dCommunity1Ctrl'
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
        url: '/community/activity/:CommuID',
        views: {
            'dgroups': {
                templateUrl: 'dtemplates/activity.html',
                controller: 'dActivityCtrl'
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
        url: '/community/connections/:CommuID',
        views: {
            'dgroups': {
                templateUrl: 'dtemplates/connections.html',
                controller: 'dConnectionsCtrl'
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
        url: '/community/followers/:CommuID',
        views: {
            'dgroups': {
                templateUrl: 'dtemplates/followers.html',
                controller: 'dFollowersCtrl'
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
})

app.controller('UploadController', function ($scope, $ionicLoading, $rootScope){
  var imageUploader = new ImageUploader();
  $scope.result = {};
  $scope.file = {};
  $scope.upload = function() {
    $ionicLoading.show({
      template: 'Uploading...'
    });
    imageUploader.push($scope.file)
      .then(function(data) {
        console.log('Upload complete. Data:', data);
        $ionicLoading.hide();
        $scope.result.url = data.url;
        $rootScope.imgurl = $scope.result.url
        $scope.$digest();
      }, function(err) {
        // console.error(err);
        $ionicLoading.hide();
        $scope.result.error = err;
      });
  };

});
