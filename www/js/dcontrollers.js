angular.module('starter.dcontrollers', ['ionic', 'ionic-material'])



.controller('dSymptifyCtrl', function($scope, $stateParams, $state){

	$scope.me="Jaishriram";
})

.controller('dFeedCtrl', function($scope, $stateParams, $state){

	$scope.me="Jaishriram";
})

.controller('dGroupsCtrl', function($scope, $stateParams, $state,Http,$ionicLoading){

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

})

.controller('dNotificationsCtrl', function($scope, $stateParams, $state){

	$scope.me="Jaishriram";
})





.controller('dDashCtrl', function($scope, $stateParams, $state){

	$scope.me="Fuck";
})

