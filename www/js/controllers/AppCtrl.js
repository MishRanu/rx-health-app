app.controller('tabsController', function($scope, $ionicSideMenuDelegate, ionicMaterialInk) {
    ionicMaterialInk.displayEffect();


  $scope.showMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

})
 

 app.controller('AppCtrl', function ($scope, $ionicLoading, Http, $stateParams, $state, $ionicModal, $ionicPopover, $timeout, $ionicSideMenuDelegate, ionicMaterialInk) {



    // Form data for the login modal
    $scope.loginData = {};
    ionicMaterialInk.displayEffect();
    // var navIcons = document.getElementsByClassName('ion-navicon');
    // for (var i = 0; i < navIcons.length; i++) {
    //     navIcons.addEventListener('click', function () {
    //         this.classList.toggle('active');
    //     });
    // }

    $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };

    // var fab = document.getElementById('fab');
    // fab.addEventListener('click', function () {
    //     //location.href = 'https://twitter.com/satish_vr2011';
    //     window.open('https://twitter.com/satish_vr2011', '_blank');
    // });

    // .fromTemplate() method
    var template = '<ion-popover-view>' +
                    '   <ion-header-bar>' +
                    '       <h1 class="title">My Popover Title</h1>' +
                    '   </ion-header-bar>' +
                    '   <ion-content class="padding">' +
                    '       My Popover Contents' +
                    '   </ion-content>' +
                    '</ion-popover-view>';


      //$scope.$on('$ionicView.beforeEnter', function() {
        $ionicLoading.show({
          template: 'Loading...',
          noBackdrop: true
        });
        Http.post('pmenutab', {
          "UserID": '2'
        })
        .success(function(data) {
          $scope.ResponseCode = data.Status.ResponseCode;
          $scope.ResponseMessage = data.Status.ResponseMessage;
          //console.log($scope.ResponseMessage);
          $ionicLoading.hide();
          if ($scope.ResponseCode == 200) {
            $scope.full = data.Status;

            console.dir($scope.full);
          } else {
            alert($scope.ResponseMessage);
          }
        }).error(function(data, status, headers, config) {
          //$scope.data.error={message: error, status: status};
          alert("error" + data);
          $ionicLoading.hide();
        });
      // });


    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
    $scope.openSearch = function() {
    //$scope.modal.show();
    var cstateName = $state.current.name;
    //console.log(stateName);
    $state.go('search1',{'CurrentState': cstateName}, {reload:false});
  // if($rootScope.lat){
  //   $scope.modal.show();
  // }else{
  //   GeoLocation.updatelocation("GPS required for search");
  // }
};
});