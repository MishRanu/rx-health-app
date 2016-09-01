 angular.module('starter.dcontrollers', ['ionic', 'ionic-material'])

.controller('dSymptifyCtrl', function($scope, $stateParams, $state, ionicMaterialInk){

	$scope.me="Jaishriram";
    ionicMaterialInk.displayEffect();
})

.controller('dFeedCtrl', function($scope, $stateParams, $ionicPopup, $timeout, $state, ionicMaterialInk){

	$scope.me="Jaishriram";
    ionicMaterialInk.displayEffect();

// var myPopup = $ionicPopup.show({
//      template: '<input type="password" ng-model="data.wifi">',
//      title: 'Enter Wi-Fi Password',
//      subTitle: 'Please use normal things',
//      scope: $scope,
//      buttons: [
//        { text: 'Cancel' },
//        {
//          text: '<b>Save</b>',
//          type: 'button-positive',
//          onTap: function(e) {
//            if (!$scope.data.wifi) {
//              //don't allow the user to close unless he enters wifi password
//              e.preventDefault();
//            } else {
//              return $scope.data.wifi;
//            }
//          }
//        },
//      ]
//    });

//    myPopup.then(function(res) {
//      console.log('Tapped!', res);
//    });


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

.controller('dGroupsCtrl', function($scope, $stateParams,$timeout, $state,Http,$ionicLoading, ionicMaterialInk, ionicMaterialMotion){

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

.controller('dNotificationsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
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

.controller('dCommentsCtrl', function($scope, $stateParams, $state, $timeout, ionicMaterialInk, ionicMaterialMotion){

    ionicMaterialInk.displayEffect();
	$scope.me="Jaishriram";
	    // Set Header

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();




})

