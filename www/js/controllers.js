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


.controller('ProfileCtrl', function($scope, $rootScope, $ionicLoading, Http, $state, $ionicPopup, $ionicModal, ionicMaterialInk, ionicMaterialMotion, $ionicHistory, $ionicPlatform) {
  ionicMaterialInk.displayEffect();
  $scope.showContactCard = true;
  $scope.showContactEditCard = false;
  $scope.showEditButton = true;
  $scope.showsaveButton = false;

  $scope.addressContent = false;
  $scope.addressInputContent = false;
  $scope.showPtopInfo = true;
  $scope.editModePtopInfo = false;
  $scope.addressEditMode = false;
  $scope.showEditModeAddress = false;
  $scope.showBasicCard = true;
  $scope.showBasicEditCard = false;
  $scope.showMedicalCard = true;
  $scope.showMedicalEditCard = false;

  $scope.requestToUpdate = function() {
    Http.post('edit_patientfullprofile', {
      'UserID': $rootScope.UserID,
      'DOB': $scope.contactInfo.dob,
      'Email': $scope.contactInfo.emailId,
      'FName': $scope.contactInfo.Fname,
      'LName': $scope.contactInfo.Lname,
      'Phone': $scope.contactInfo.mobile,
      'Gender': $scope.contactInfo.gender,
      'BloodGroup': $scope.contactInfo.sbg,
      'Address1': $scope.contactInfo.address.flatNo,
      'Address2': $scope.contactInfo.address.locality,
      'City': $scope.contactInfo.address.city,
      'PinCode': $scope.contactInfo.address.pinCode,
      'Height': $scope.contactInfo.heights,
      'Weight': $scope.contactInfo.weight,
      'Allergies': $scope.contactInfo.allergies,
      'Hereditory': $scope.contactInfo.hereditory
    }) .success(function(data){
      $scope.ResponseCode = data.Status.ResponseCode;
      $scope.ResponseMessage = data.Status.ResponseMessage;

        if($scope.ResponseCode==200){
          console.log('Success'); }
         else {
          alert($scope.ResponseMessage);
        }
      }).error(function(data) {
        //$scope.data.error={message: error, status: status};
        console.log("error" + data);
        // $ionicLoading.hide();
      });
}

  $scope.$on('$ionicView.beforeEnter', function() {
   // $rootScope.UserID = 1;
   $ionicLoading.show({
    template: 'Loading...',
    noBackdrop: true
  });
   Http.post('getpatientprofile2', {
    "UserID": '2'
  })
   .success(function(data) {
    $scope.ResponseCode = data.Status.ResponseCode;
    $scope.ResponseMessage = data.Status.ResponseMessage;
        //console.log($scope.ResponseMessage);
        $ionicLoading.hide();
        if ($scope.ResponseCode == 200) {
          $scope.full = data.Status;
          $scope.contactInfo = {
            'Fname': $scope.full.FName,
            'Lname': $scope.full.LName,
            'emailId': $scope.full.Email,
            'mobile': $scope.full.Phone,
            'address': {
              'flatNo': $scope.full.Address1,
              'locality': $scope.full.Address2,
              'city': $scope.full.City,
              'pinCode': $scope.full.PinCode
            },
            'gender': $scope.full.Gender,
            'sbg': $scope.full.BloodGroup,
            'dob': $scope.full.DOB,
            'heights': $scope.full.Height,
            'weight': $scope.full.Weight,
            'allergies': $scope.full.Allergies,
            'hereditory': $scope.full.Hereditory,
            'pic': $scope.full.Pic
          }
          console.log($scope.contactInfo);
          if ($scope.contactInfo.address.flatNo == 'NA' && $scope.contactInfo.address.locality == 'NA' && $scope.contactInfo.address.city == 'NA' && $scope.contactInfo.address.pinCode == 'NA') {
            $scope.addressButton = true;
          } else {
            $scope.addressButton = false;
            $scope.addressContent = true;
            $scope.addressEditMode = true;
          }
          console.dir($scope.full);
        } else {
          alert($scope.ResponseMessage);
        }
      }).error(function(data, status, headers, config) {
        //$scope.data.error={message: error, status: status};
        alert("error" + data);
        $ionicLoading.hide();
      });
    });
  //$scope.showEdit


  $scope.cityList = [{
    "name": "Pune",
    "id": "1"
  }, {
    "name": "Mumbai",
    "id": "2"
  }];
  $scope.bg = ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'];
  $scope.pgender = ['male', 'female'];
  $ionicModal.fromTemplateUrl('templates/modalppic.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.fucking = function() {
    console.log("hi");
  };

  //console.log($scope.contactInfo.mobile);
  $scope.showAlert = function(message) {

    var alertPopup = $ionicPopup.alert({
      title: 'Title',
      template: message
    });
  };


  $scope.takePhoto = function() {
    var options = {
      fileKey: "avatar",
      fileName: "image.png",
      chunkedMode: "false",
      mimeType: "false",
      quality: 75,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.imgdata = imageData;
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
      $scope.uploadpic();
    }, function(err) {
      // An error occured. Show a message to the user
    });
  };

  $scope.selectPicture = function() {
    var options = {
      fileKey: "file",
      fileName: "image.png",
      chunkedMode: "false",
      mimeType: "false",
      quality: 75,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.imgdata = imageData;
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
      $scope.uploadpic();
    }, function(err) {
      // An error occured. Show a message to the user
    });
  };
  $scope.uploadpic = function() {
    //console.log(imageData);
    //console.log(options);
    $ionicLoading.show({
      template: 'Loading...',
      noBackdrop: true
    });

  }

  $scope.patientProfile = function() {

    var date = new Date();

    var options = {
      fileKey: "image",
      fileName: "image.jpg",
      chunkedMode: false,
      params: {
        'UserID': $rootScope.UserID
      },
      mimeType: "image/jpg"
    };

    $cordovaFileTransfer.upload(server, filePath, options).then(function(result) {

      alert("Pic Uploaded");
      $ionicLoading.hide();
      $scope.modal.hide();
      //$ionicHistory.clearCache();
      //$state.go($state.current, {}, {reload: true});
    }, function(err) {
      console.log("ERROR: " + JSON.stringify(err));
      $ionicLoading.hide();
      alert("Some error occured.. Please try again.");
      //alert(JSON.stringify(err));
    }, function(progress) {
      // constant progress updates
    });

  }


  $scope.cancelInfo = function(id) {
    $scope.showEditButton = true;
    if (id == 1) {
      $scope.showContactCard = true;
      $scope.showContactEditCard = false;
    };
    if (id == 2) {
      $scope.showBasicCard = true;
      $scope.showBasicEditCard = false;
    };
    if (id == 3) {
      $scope.showMedicalCard = true;
      $scope.showMedicalEditCard = false;
    };
    //document.getElementById("contactInfo").reset();
  };
  // $scope.saveInfo = function(id) {
  //   $scope.showEditButton = true;

  // };
  $scope.goBack = function() {
    $state.go('tab.pmenu');
    //$ionicHistory.goBack();

  };
  $scope.editPtopInfo = function() {
    $scope.showPtopInfo = false;
    $scope.editModePtopInfo = true;
  };
  $scope.editInfo = function(id) {
    $scope.showEditButton = false;
    if (id == 1) {
      $scope.showContactCard = false;
      $scope.showContactEditCard = true;
      if ($scope.addressEditMode) {
        $scope.showEditModeAddress = true;
      };
    };
    if (id == 2) {
      $scope.showBasicCard = false;
      $scope.showBasicEditCard = true;
      //alert("2");
    };
    if (id == 3) {
      $scope.showMedicalCard = false;
      $scope.showMedicalEditCard = true;
    }

  };
  $scope.addAddress = function() {
    $scope.addressButton = false;
    $scope.addressInputContent = true;
    $scope.showEditButton = false;

  };
  $scope.saveAddress = function() {
    $scope.showEditButton = true;
    $scope.addressInputContent = false;
    //console.log(document.getElementById('patientAddress'));


    var flatNo = document.getElementById('flatNo').value;
    var locality = document.getElementById('locality').value;
    var city = document.getElementById('city').value;
    var pinCode = document.getElementById('pinCode').value;
    console.log(flatNo);
    if (flatNo == '' && locality == '' && city == '' && pinCode == '') {
      $scope.addressButton = true;
    } else {
      $scope.addressContent = true;
      $scope.addressEditMode = true;
      $scope.contactInfo.address.flatNo = flatNo;
      $scope.contactInfo.address.locality = locality;
      $scope.contactInfo.address.city = city;
      $scope.contactInfo.address.pinCode = pinCode;
    };
    console.log($scope.contactInfo.address.flatNo);
  };

  $scope.cancelInfo = function(id) {
    $scope.showEditButton = true;
    if (id == 1) {
      $scope.showContactCard = true;
      $scope.showContactEditCard = false;
    };
    if (id == 2) {
      $scope.showBasicCard = true;
      $scope.showBasicEditCard = false;
    };
    if (id == 3) {
      $scope.showMedicalCard = true;
      $scope.showMedicalEditCard = false;
    };
    //document.getElementById("contactInfo").reset();
  };
  $scope.saveInfo = function(id) {
    $scope.showEditButton = true;

    if (id == 1) {
      $scope.showContactCard = true;
      $scope.showContactEditCard = false;
      //$scope.mobile = document.getElementsByName('mobile').value;
      //var email = document.getElementsByName('email').value;
      var editMobile = document.getElementById('editMobile').value;
      var editEmail = document.getElementById('editEmail').value;
      //console.log(editMobile.length);
      if (editMobile.length == 10) {
        $scope.contactInfo.mobile = editMobile;
      } else {
        $scope.showAlert('Phone number should contain 10 digits');
      }
      var atpos = editEmail.indexOf("@");
      var dotpos = editEmail.lastIndexOf(".");
      if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= editEmail.length) {
        $scope.showAlert('Not a valid Email Address');
        //return false;
      } else {
        $scope.contactInfo.emailId = editEmail;
      }
      var flatNo = document.getElementById('eflatNo').value;
      var locality = document.getElementById('elocality').value;
      var city = document.getElementById('ecity').value;
      var pinCode = document.getElementById('epinCode').value;
      //console.log(flatNo);
      if (flatNo == '' && locality == '' && city == '' && pinCode == '') {
        $scope.addressButton = true;
        $scope.addressContent = false;
      } else {
        $scope.addressContent = true;
        $scope.addressEditMode = true;
        $scope.contactInfo.address.flatNo = flatNo;
        $scope.contactInfo.address.locality = locality;
        $scope.contactInfo.address.city = city;
        $scope.contactInfo.address.pinCode = pinCode;
      };
    };
    if (id == 2) {
      $scope.showBasicCard = true;
      $scope.showBasicEditCard = false;
      $scope.contactInfo.dob = document.getElementById('pdob').value;
      $scope.contactInfo.gender = document.getElementById('pgender').value;
    };
    if (id == 3) {
      $scope.showMedicalCard = true;
      $scope.showMedicalEditCard = false;
      console.log(document.getElementById('bloodgroup'));
      $scope.contactInfo.sbg = document.getElementById('bloodgroup').value;
    };
    $scope.requestToUpdate();


  };
  $scope.addAddress = function() {
    $scope.addressButton = false;
    $scope.addressInputContent = true;
    $scope.showEditButton = false;

  };
  $scope.saveAddress = function() {
    $scope.showEditButton = true;
    $scope.addressInputContent = false;
    var flatNo = document.getElementById('flatNo').value;
    var locality = document.getElementById('locality').value;
    var city = document.getElementById('city').value;
    var pinCode = document.getElementById('pinCode').value;
    console.log(flatNo);
    if (flatNo == '' && locality == '' && city == '' && pinCode == '') {
      $scope.addressButton = true;
    } else {
      $scope.addressContent = true;
      $scope.addressEditMode = true;
      $scope.contactInfo.address.flatNo = flatNo;
      $scope.contactInfo.address.locality = locality;
      $scope.contactInfo.address.city = city;
      $scope.contactInfo.address.pinCode = pinCode;
    };
    $scope.requestToUpdate();
  };
})


.controller('PreferencesCtrl', function($scope, $state, $stateParams, ionicMaterialInk){

  ionicMaterialInk.displayEffect();

})


.controller('BookmarkCtrl', function($scope, $state, $stateParams, ionicMaterialInk){

  ionicMaterialInk.displayEffect();

})


.controller('FeedCtrl', function(Dates ,$interval,$ionicLoading, $cordovaInAppBrowser, $ionicModal, $scope, $stateParams, $ionicPopup, $rootScope, $timeout, $state, ionicMaterialInk, $ionicPopover ,Http){
  if($stateParams.Prefs){
    $scope.Prefs = JSON.parse($stateParams.Prefs);
  }
  $scope.CommuID = $stateParams.CommuID;
  $scope.ShrID = $stateParams.ShrID;
  console.log($scope.ShrID);
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

.controller('NotificationsCtrl', function($rootScope, Dates, $ionicPopup, $state, Http, $scope, $stateParams, $timeout,$interval, ionicMaterialInk, ionicMaterialMotion) {
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

    $scope.doit = function(notification){
      console.log(notification.Type);
      switch(notification.Type){
        case "11":

        break;
        case "12":

        break;
        case "13":

        break;
        case "14":
        console.log("sad");
        console.dir(notification);
        $state.go('app.tabs.feed',{ShrID : notification.Extra.ShrID});

        break;
        case "15":
        $state.go('app.tabs.feed',{ShrID : notification.Extra.ShrID});
        break;
        case "16":
        console.dir(notification);
        $state.go('app.tabs.feed',{ShrID : notification.Extra.ShrID});
        break;
      }
    }

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

.controller('pSearchCtrl', function($state,$scope,Http, $stateParams,$rootScope, $state, $timeout, ionicMaterialInk, ionicMaterialMotion){
    $scope.CurrentState =  $stateParams.CurrentState;
    console.log("cf");
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
        obj = JSON.stringify({'doctorids' : Id});
      }else{
        obj = JSON.stringify({'tagids' : Id});
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
