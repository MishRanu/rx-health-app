angular.module('starter.controllers', ['ionic', 'ionic-material'])

.controller('SymptifyCtrl', function($scope, $stateParams, $state){

	$scope.me="Jaishriram";
})

.controller('FeedCtrl', function($scope, $stateParams, $state){

	$scope.me="Jaishriram";
})

.controller('GroupsCtrl', function($scope, $stateParams, $state){

	$scope.me="Jaishriram";
})

.controller('NotificationsCtrl', function($scope, $stateParams, $state){

	$scope.me="Jaishriram";
})


.controller('WelcomeCtrl', function($scope, $stateParams, $state, ionicMaterialInk){

    ionicMaterialInk.displayEffect();
	
})
