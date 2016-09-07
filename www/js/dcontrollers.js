 angular.module('starter.dcontrollers', ['ionic', 'ionic-material'])


 .controller('dtabsCtrl', function($scope,$state, $ionicModal, $ionicPopover, $timeout,$rootScope) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    //$rootScope.hideTabsBar = false;
    $rootScope.$on('$ionicView.beforeEnter', function() {
      var stateName = $state.current.name;
      if (stateName === 'dapp.dtabs.symptify' || stateName === 'dapp.dtabs.feed' || stateName === 'dapp.dtabs.groups' || stateName === 'dapp.dtabs.notifications' ) {
        $rootScope.hideTabsBar = false;
      } else {
        $rootScope.hideTabsBar = true;
      }
      // if(stateName === 'tab.pmenu' && !$rootScope.IsLoggedIn){
      //   $state.go('login');
      // }
    });
    $scope.gosymptify = function() {
      $state.go('dapp.dtabs.symptify');
    }
    $scope.gofeed = function() {
      $state.go('dapp.dtabs.feed');
    }
    $scope.gogroups = function() {
      $state.go('dapp.dtabs.groups');
    }
    $scope.gonotification = function() {
      $state.go('dapp.dtabs.notifications');
    }
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


 .controller('dSymptifyCtrl', function($scope, $stateParams, $state, ionicMaterialInk){

   $scope.me="Jaishriram";
   ionicMaterialInk.displayEffect();
 })


.controller('dFeedCtrl', function($scope, $stateParams, $ionicPopup, $timeout, $state, ionicMaterialInk, $ionicPopover){

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


    $scope.showPopup = function() {
        var alertPopup = $ionicPopup.show({
            template: '<select> <option>Blue</option> <option selected>Green</option> <option>Red</option> </select> <select> <option>Only Connections</option> <option selected>Followers</option> </select>',
            title: 'Share',
            subTitle: 'Select one of your groups to share', 
            scope: $scope, 
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Share</b>', 
                    type: 'button-positive',
                    onTap: function(e) {
                    if (!$scope.data.wifi) {
             //don't allow the user to close unless he enters wifi password
                        e.preventDefault();
                    } else {
                    return $scope.data.wifi;
                    }
                }
            },
            ]
        });

        $timeout(function() {
            //ionic.material.ink.displayEffect();
            ionicMaterialInk.displayEffect();
          }, 0);
};

})

.controller('dGroupsCtrl', function($scope, $stateParams, $state,Http,$ionicLoading,$ionicModal,ionicMaterialInk, ionicMaterialMotion, $ionicPopover, $timeout){

  $timeout(function() {
    ionicMaterialMotion.fadeSlideInRight({
      startVelocity: 3000
    });
  }, 700);

  var template = '<ion-popover-view>' +
                    '   <ion-header-bar>' +
                    '       <h1 class="title">My Popover Title1</h1>' +
                    '   </ion-header-bar>' +
                    '   <ion-content class="padding">' +
                    '       My Popover Contents' +
                    '   </ion-content>' +
                    '</ion-popover-view>';

    $scope.popover1 = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function () {
        $scope.popover1.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover1.remove();
    });


	$scope.$on('ngLastRepeat.mylist',function(e) {
  ionicMaterialInk.displayEffect();
})

    ionicMaterialInk.displayEffect();
	$scope.me="Jaishriram";
  console.log("khujli");
 
    $scope.goToCommunity1 = function(CommuID, UserType){
        console.log(CommuID);
      $state.go('dapp.dtabs.community1', {"CommuID": CommuID, "UserType":UserType}, {reload:false});
    };
    $scope.goToCommunity = function(CommuID, UserType){
        console.log(CommuID);
      $state.go('dapp.dtabs.community', {"CommuID": CommuID, "UserType":UserType}, {reload:false});
    };
	Http.post('getcommunities', {
      'UserID': 1
    })
    .success(function(data) {
      $scope.ResponseCode = data.Status.ResponseCode;
      $scope.ResponseMessage = data.Status.ResponseMessage;
      $ionicLoading.hide();
      if ($scope.ResponseCode == 200) {
        $scope.myCommunities = data.Status.myCommunities;
        $scope.connectCommunities = data.Status.connectCommunities;

        $scope.adminCommunities = data.Status.adminCommunities;
        $scope.following = data.Status.following;
        console.log(data.Status);
        // console.dir($scope.myCommunities,$scope.following, $scope.otherCommunities);
      } else {
        alert($scope.ResponseMessage);
      }
    }).error(function(data, status, headers, config) {
        //$scope.data.error={message: error, status: status};
        alert("error" + data);
        $ionicLoading.hide();
      });

  $scope.isExpanded = false;


})


.controller('CommunityCtrl', function($scope, $stateParams,$state, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header

    $scope.$on('ngLastRepeat.mylist',function(e) {
  ionicMaterialInk.displayEffect();
})


    $scope.CommuID =  $stateParams.CommuID; 
    $scope.UserType = $stateParams.UserType; 
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
      $state.go('dapp.dtabs.activity', {'CommuID': $scope.CommuID}, {reload: false});
    }
    $scope.goToMembers = function(){
      $state.go('dapp.dtabs.connections', {'CommuID': $scope.CommuID}, {reload: false});
    }
    $scope.goToFollowers = function(){
      $state.go('dapp.dtabs.followers', {'CommuID': $scope.CommuID}, {reload: false});
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

 .controller('Community1Ctrl', function($scope, $stateParams,$state, $timeout, ionicMaterialMotion, ionicMaterialInk) {
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


 .controller('ActivityCtrl', function($scope,$rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

    // $scope.$parent.showHeader();
    // $scope.$parent.clearFabs();
    // $scope.isExpanded = true;
    // $scope.$parent.setExpanded(true);
    // $scope.$parent.setHeaderFab('right');
   // $rootScope.hideTabsBar = true;
    $scope.CommuID =  $stateParams.CommuID;  

    $scope.$on('ngLastRepeat.mylist',function(e) {
  ionicMaterialInk.displayEffect();
})

   $timeout(function() {
    ionicMaterialMotion.fadeSlideIn({
      selector: '.animate-fade-slide-in .item'
    });
  }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
  })
 .controller('ConnectionsCtrl', function($scope,$rootScope,Http,$ionicLoading, $stateParams, $timeout, ionicMaterialInk,$ionicPopover, ionicMaterialMotion) {
   // $rootScope.hideTabsBar = true;
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
    $scope.CommuID =  $stateParams.CommuID; 

    Http.post('getconnections', {
      'CommuID': $scope.CommuID
    })
    .success(function(data) {
      $scope.ResponseCode = data.Status.ResponseCode;
      $scope.ResponseMessage = data.Status.ResponseMessage;
      $ionicLoading.hide();
      if ($scope.ResponseCode == 200) {
        $scope.connections = data.Status.ConnectionData.Connection;
        
        console.log($scope.connections);
        // console.dir($scope.myCommunities,$scope.following, $scope.otherCommunities);
      } else {
        alert($scope.ResponseMessage);
      }
    }).error(function(data, status, headers, config) {
        //$scope.data.error={message: error, status: status};
        alert("error" + data);
        $ionicLoading.hide();
      });

    $timeout(function() {
      ionicMaterialMotion.fadeSlideInRight({
        startVelocity: 3000
      });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
  })
 .controller('FollowersCtrl', function($scope,$rootScope, $stateParams,Http,$ionicLoading, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    //$rootScope.hideTabsBar = true;
    // $scope.$parent.showHeader();
    // $scope.$parent.clearFabs();
    // $scope.isExpanded = true;
    // $scope.$parent.setExpanded(true);
    // $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    $scope.CommuID =  $stateParams.CommuID;
    ionicMaterialInk.displayEffect();
    $scope.CommuID =  $stateParams.CommuID; 
    $scope.UserType = $stateParams.UserType; 

    $scope.$on('ngLastRepeat.mylist',function(e) {
  ionicMaterialInk.displayEffect();
})

    // ionicMaterialMotion.pushDown({
    //   selector: '.push-down'
    // });
    // ionicMaterialMotion.fadeSlideInRight({
    //   selector: '.animate-fade-slide-in .item'
    // });
     Http.post('getconnections', {
      'CommuID': $scope.CommuID
    })
    .success(function(data) {
      $scope.ResponseCode = data.Status.ResponseCode;
      $scope.ResponseMessage = data.Status.ResponseMessage;
      $ionicLoading.hide();
      if ($scope.ResponseCode == 200) {
        $scope.followers = data.Status.ConnectionData.Followers;
        
        console.log($scope.followers);
        // console.dir($scope.myCommunities,$scope.following, $scope.otherCommunities);
      } else {
        alert($scope.ResponseMessage);
      }
    }).error(function(data, status, headers, config) {
        //$scope.data.error={message: error, status: status};
        alert("error" + data);
        $ionicLoading.hide();
      });
    $timeout(function() {
      ionicMaterialMotion.fadeSlideInRight({
        startVelocity: 3000
      });
    }, 700);

  })



 .controller('dNotificationsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {

    // Delay expansion
    // $timeout(function() {
    //     $scope.isExpanded = true;
    //     $scope.$parent.setExpanded(true);
    // }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
  })

 .controller('dCommentsCtrl', function($scope, $stateParams, $state, $timeout, ionicMaterialInk, ionicMaterialMotion){

  ionicMaterialInk.displayEffect();
  $scope.me="Jaishriram";
	    // Set Header

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();




  })

