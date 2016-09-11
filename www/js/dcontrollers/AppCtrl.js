app.controller('dtabsController', function($scope, $ionicSideMenuDelegate, ionicMaterialInk) {

    ionicMaterialInk.displayEffect();

    $scope.showMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

})
 
 app.controller('dAppCtrl', function ($scope, $stateParams, $state, $ionicModal, $ionicPopover, $timeout, $ionicSideMenuDelegate, ionicMaterialInk) {


    // Form data for the login modal
    //console.log("menu");
    
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

    $scope.query = null;
$scope.showLoadingIcon = false;
$scope.currentCity = null;
$ionicModal.fromTemplateUrl('dtemplates/searchtemplate.html', {
  scope: $scope,
  animation: 'slide-in-up',
  focusFirstInput: true
}).then(function(modal) {
  $scope.modal = modal;
});

$scope.openSearch = function() {
    $scope.modal.show();
  // if($rootScope.lat){
  //   $scope.modal.show();
  // }else{
  //   GeoLocation.updatelocation("GPS required for search");
  // }
};
$scope.closeSearch = function() {
  $scope.modal.hide();
};

$scope.keyfunc = function(keyevent, query) {
  if (keyevent.which === 13) {
    $scope.modal.hide();
    //$scope.goToDocCards('query', query);
  } else if (keyevent.which === 8 && query.length === 1) {
    $scope.querylist = null;
  } else {
    var temp = String.fromCharCode(keyevent.which);
    if ((query == null || query.length < 1) && keyevent.which !== 8) {
      $scope.querylist = null;
      $scope.showLoadingIcon = true;
      Http.post('searchdoctor', {
        'Data': temp
      }).success(function(data) {
        if (data.Status.ResponseCode == "200") {
          $scope.querylist = data.Status.Result;
        }
        $scope.showLoadingIcon = false;
      }).error(function(data) {
        console.dir(data);
      });
    }
  }
}
});