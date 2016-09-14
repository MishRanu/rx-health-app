angular.module('starter.controllers', ['ionic', 'ionic-material'])

.controller('tabsCtrl', function($scope,$state, $ionicModal, $ionicPopover, $timeout,$rootScope) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    //$rootScope.hideTabsBar = false;
    $rootScope.$on('$ionicView.beforeEnter', function() {
      var stateName = $state.current.name;
      if (stateName === 'app.tabs.symptify' || stateName === 'app.tabs.feed' || stateName === 'app.tabs.groups' || stateName === 'app.tabs.notifications' ) {
        $rootScope.hideTabsBar = false;
      } else {
        $rootScope.hideTabsBar = true;
      }
      // if(stateName === 'tab.pmenu' && !$rootScope.IsLoggedIn){
      //   $state.go('login');
      // }
    });
    // $scope.gosymptify = function() {
    //   $state.go('dapp.dtabs.symptify');
    // }
    // $scope.gofeed = function() {
    //   $state.go('dapp.dtabs.feed');
    // }
    // $scope.gogroups = function() {
    //   $state.go('dapp.dtabs.groups');
    // }
    // $scope.gonotification = function() {
    //   $state.go('dapp.dtabs.notifications');
    // }
  // $scope.gopmenu = function() {
  //   $state.go('tab.pmenu');
  // }

    // var navIcons = document.getElementsByClassName('ion-navicon');
    // for (var i = 0; i < navIcons.length; i++) {
    //     navIcons.addEventListener('click', function() {
    //         this.classList.toggle('active');
    //     });
    // }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
      document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
      document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
      var content = document.getElementsByTagName('ion-content');
      for (var i = 0; i < content.length; i++) {
        if (content[i].classList.contains('has-header')) {
          content[i].classList.toggle('has-header');
        }
      }
    };

    $scope.setExpanded = function(bool) {
      $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
      var hasHeaderFabLeft = false;
      var hasHeaderFabRight = false;

      switch (location) {
        case 'left':
        hasHeaderFabLeft = true;
        break;
        case 'right':
        hasHeaderFabRight = true;
        break;
      }

      $scope.hasHeaderFabLeft = hasHeaderFabLeft;
      $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
      var content = document.getElementsByTagName('ion-content');
      for (var i = 0; i < content.length; i++) {
        if (!content[i].classList.contains('has-header')) {
          content[i].classList.toggle('has-header');
        }
      }

    };

    $scope.hideHeader = function() {
      $scope.hideNavBar();
      $scope.noHeader();
    };

    $scope.showHeader = function() {
      $scope.showNavBar();
      $scope.hasHeader();
    };

    $scope.clearFabs = function() {
      var fabs = document.getElementsByClassName('button-fab');
      if (fabs.length && fabs.length > 1) {
        fabs[0].remove();
      }
    };

  })

.controller('SymptifyCtrl', function($scope, $stateParams, $state, ionicMaterialInk){

	$scope.me="Jaishriram";
    ionicMaterialInk.displayEffect();
})

.controller('QRScannerCtrl', function($scope, $state, $cordovaBarcodeScanner){



 $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };


})

.controller('FeedCtrl', function(Dates ,$interval,$ionicLoading, $cordovaInAppBrowser, $ionicModal, $scope, $stateParams, $ionicPopup, $rootScope, $timeout, $state, ionicMaterialInk, $ionicPopover ,Http){
  $scope.$on('ngLastRepeat.mylist',function(e) {
  ionicMaterialInk.displayEffect();
})
	$scope.me="Jaishriram";
    ionicMaterialInk.displayEffect();

    var ptemplate = '<ion-popover-view>'  +
                    '<div class= "list no-padding"> <div class= "item" style= "padding-bottom:0px"> Save </div> <div class= "item" style= "padding-top:0px; padding-bottom:0px "> Report </div></div>' +
                   '</ion-popover-view>';

    $scope.optionpopover = $ionicPopover.fromTemplate(ptemplate, {
        scope: $scope
    });
    $scope.openPopover = function($event) {
    $scope.optionpopover.show($event);
  };

    $scope.closePopover = function () {
        $scope.optionpopover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.optionpopover.remove();
    });

})


.controller('GroupsCtrl', function($scope, $stateParams, $state,Http,$ionicLoading,$ionicModal,ionicMaterialInk, ionicMaterialMotion, $ionicPopover, $timeout){
    var communities = Http.getdata('communities').data;
    // $scope.myCommunities = communities.myCommunities;
    $scope.connectCommunities = communities.connectCommunities;
    // $scope.adminCommunities = communities.adminCommunities;
    $scope.following = communities.following;
    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);



    $scope.$on('ngLastRepeat.mylist',function(e) {
  ionicMaterialInk.displayEffect();
})

    ionicMaterialInk.displayEffect();
    $scope.me="Jaishriram";
  console.log("khujli");


    $scope.goToCommunity = function(CommuID, UserType){
        console.log(CommuID);
      $state.go('app.tabs.community', {"CommuID": CommuID, "UserType":UserType}, {reload:false});

    };
    // Http.post('getcommunities', {
    //   'UserID': 1
    // })
    // .success(function(data) {
    //   $scope.ResponseCode = data.Status.ResponseCode;
    //   $scope.ResponseMessage = data.Status.ResponseMessage;
    //   $ionicLoading.hide();
    //   if ($scope.ResponseCode == 200) {
    //     $scope.myCommunities = data.Status.myCommunities;
    //     $scope.connectCommunities = data.Status.connectCommunities;
    //
    //     $scope.adminCommunities = data.Status.adminCommunities;
    //     $scope.following = data.Status.following;
    //     console.log(data.Status);
    //     // console.dir($scope.myCommunities,$scope.following, $scope.otherCommunities);
    //   } else {
    //     alert($scope.ResponseMessage);
    //   }
    // }).error(function(data, status, headers, config) {
    //     //$scope.data.error={message: error, status: status};
    //     alert("error" + data);
    //     $ionicLoading.hide();
    //   });

    $scope.isExpanded = false;


})

.controller('CommunityCtrl', function($scope, $stateParams,$state, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    console.log("dsds");
    // $scope.showHeader();
    // $scope.$parent.clearFabs();
    // $scope.isExpanded = false;
    // $scope.$parent.setExpanded(false);
    // $scope.$parent.setHeaderFab(false);

    // Set Motion
      $scope.users = [
    { id: 1, name: 'Bob' },
    { id: 2, name: 'Alice' },
    { id: 3, name: 'Steve' }
  ];
  $scope.selectedUser = { id: 1, name: 'Bob' };



    $scope.goToActivity = function(){
      $state.go('dapp.dtabs.activity');
    }
    $scope.goToMembers = function(){
      $state.go('dapp.dtabs.connections');
    }
    $scope.goToFollowers = function(){
      $state.go('dapp.dtabs.followers');
    }
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('NotificationsCtrl', function($rootScope, Dates, $ionicPopup, Http, $scope, $stateParams, $timeout,$interval, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    // $scope.$parent.showHeader();
    // $scope.$parent.clearFabs();
    // $scope.$parent.setHeaderFab('left');

    // Delay expansion
    // $timeout(function() {
    //     $scope.isExpanded = true;
    //     $scope.$parent.setExpanded(true);
    // }, 300);

    // Set Motion
    console.log('haha');
    $scope.$on('$ionicView.beforeEnter', function(){
      var temp = Http.getdata('notifications');
      $scope.Notifications = temp.data;
      var dat = new Date()
      var l = Math.floor((dat.getTime()-temp.extras.getTime())/1000);
      var i;
      for(i=0;i < $scope.Notifications.length;i++){
        $scope.Notifications[i].NGT+= l;
      }
      $scope.stringify = Dates.getintervalstring;
    })
    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);
    $interval(function(){
      console.log('mama');
      var i = 0;
      for(i=0;i < $scope.Notifications.length;i++){
        $scope.Notifications[i].NGT+=60;
      }
    },60000);
    // Set Ink
    ionicMaterialInk.displayEffect();

})


.controller('WelcomeCtrl', function($scope, $stateParams, $state, ionicMaterialInk){

    ionicMaterialInk.displayEffect();
	$scope.me="Fuck";
})

// .controller('CommentsCtrl', function($scope, $stateParams, $state, $timeout, ionicMaterialInk, ionicMaterialMotion){

//     ionicMaterialInk.displayEffect();
// 	$scope.me="Jaishriram";
// 	    // Set Header

//     // Set Motion
//     ionicMaterialMotion.fadeSlideInRight();





// })

.controller('SearchCtrl', function($state,$scope,Http, $stateParams,$rootScope, $state, $timeout, ionicMaterialInk, ionicMaterialMotion){
    $scope.CurrentState =  $stateParams.CurrentState;
    console.log($scope.CurrentState);
    ionicMaterialInk.displayEffect();
    $scope.me="Jaishriram";

    $rootScope.goBack = function() {
      // implement custom behaviour here
      $state.go($scope.CurrentState);
    };
    $scope.gotofeeds = function(type,Id){
      console.log('haha');
      var obj;
      if(type === 'user'){
        obj = angular.toJSON({'doctorids' : Id});
      }else{
        obj = angular.toJSON({'doctorids' : Id});
      }
      $state.go('app.tabs.feed',{ Prefs : obj});
    }
    $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
      viewData.enableBack = true;
    });

    $scope.keyfunc = function(keyevent, query){
      if(query === undefined){
        query = "";
      }
      if (keyevent.which === 13) {
        $state.go($scope.CurrentState);
      } else if (keyevent.which === 8) {
        $scope.query = query.slice(0,-1);
        if(query.length === 1){
          $scope.querylist = {};
        }
      } else {
        $scope.query = query + String.fromCharCode(keyevent.which);
        var temp = String.fromCharCode(keyevent.which);
        if (query.length < 1 && keyevent.which !== 8) {
          $scope.showLoadingIcon = true;
          Http.post('search', {
            'Data': temp
          }).success(function(data) {
            if (data.Status.ResponseCode == "200") {
              $scope.querylist = data.Status.Result;
              console.dir($scope.querylist);
            }
            $scope.showLoadingIcon = false;
          }).error(function(data) {
            console.dir(data);
          });
        }
      }
    }
  })
