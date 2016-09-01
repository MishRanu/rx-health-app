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

.controller('dGroupsCtrl', function($scope, $stateParams, $state, ionicMaterialInk){

	$scope.me="Jaishriram";
    ionicMaterialInk.displayEffect();
})

.controller('dNotificationsCtrl', function($scope, $stateParams, $state, ionicMaterialInk){

	$scope.me="Jaishriram";
    ionicMaterialInk.displayEffect();
})


.controller('dCommentsCtrl', function($scope, $stateParams, $state, $timeout, ionicMaterialInk, ionicMaterialMotion){

    ionicMaterialInk.displayEffect();
	$scope.me="Jaishriram";
	    // Set Header

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();




})

