angular.module('starter.controllers', ['ionic', 'ionic-material'])

.controller('SymptifyCtrl', function($scope, $stateParams, $state, ionicMaterialInk){

	$scope.me="Jaishriram";
    ionicMaterialInk.displayEffect();
})

.controller('FeedCtrl', function($ionicModal, $ionicLoading, $scope, $stateParams, $ionicPopup, $rootScope, $timeout, $state, ionicMaterialInk, $ionicPopover ,Http ){
    $rootScope.UserID = 1;
		$scope.comments = null;
		$ionicModal.fromTemplateUrl('templates/comments.html', {
		  scope: $scope,
		  animation: 'slide-in-up'
		}).then(function(modal) {
		  $scope.commentmodal = modal;
		});


    $scope.$on("$ionicView.beforeEnter", function(){
        $ionicLoading.show({
        template: 'Loading...',
        noBackdrop: true
        });
        Http.post('getfeeds',{UserID : $rootScope.UserID})
         .success(function(data) {
        $scope.ResponseCode = data.Status.ResponseCode;
        $scope.ResponseMessage = data.Status.ResponseMessage;
        $ionicLoading.hide();
        if ($scope.ResponseCode == 200) {
            $scope.feeds = data.Status.Articles;
        }
          else {
            $ionicPopup.alert({
              title: 'Message',
              template: $scope.ResponseMessage
            });
          }
        }).error(function(data) {
          //$scope.data.error={message: error, status: status};
          console.log("error" + data);
          $ionicLoading.hide();
        });
    });

		$scope.openCommentModal = function(item){
			$ionicLoading.show({
			template: 'Loading...',
			noBackdrop: true
			});
			Http.post('getcomments',{ShrID : item})
			 .success(function(data) {
			$scope.ResponseCode = data.Status.ResponseCode;
			$scope.ResponseMessage = data.Status.ResponseMessage;
			$ionicLoading.hide();
			if ($scope.ResponseCode == 200) {
					$scope.comments = data.Status.Comments;
			}else{
				$ionicPopup.alert({
					title: 'Message',
					template: $scope.ResponseMessage
				});
			}
			}).error(function(data) {
				//$scope.data.error={message: error, status: status};
				console.log("error" + data);
				$ionicLoading.hide();
			});
			$scope.commentmodal.show();
		}

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



.controller('GroupsCtrl', function($scope, $stateParams, $state,Http,$ionicLoading,$ionicModal,ionicMaterialInk, ionicMaterialMotion, $ionicPopover, $timeout){


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

    $scope.goToProfile = function(){
      console.log("hello");
      $state.go('app.tabs.community');
    };
    Http.post('getcommunities', {
      'UserID': 4
    })
    .success(function(data) {
      $scope.ResponseCode = data.Status.ResponseCode;
      $scope.ResponseMessage = data.Status.ResponseMessage;
      $ionicLoading.hide();
      if ($scope.ResponseCode == 200) {
        $scope.myCommunities = data.Status.myCommunities;
        $scope.otherCommunities = data.Status.otherCommunities;
        $scope.following = data.Status.following;
        console.dir($scope.myCommunities,$scope.following);
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

.controller('NotificationsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
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
    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})


.controller('WelcomeCtrl', function($scope, $stateParams, $state, ionicMaterialInk){

    ionicMaterialInk.displayEffect();
	$scope.me="Fuck";
})

.controller('CommentsCtrl', function($scope, $stateParams, $state, $timeout, ionicMaterialInk, ionicMaterialMotion){

    ionicMaterialInk.displayEffect();
	$scope.me="Jaishriram";
	    // Set Header

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();




})
