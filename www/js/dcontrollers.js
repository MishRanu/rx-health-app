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



.controller('dProfileCtrl', function($scope, $rootScope, $ionicLoading, Http, $state, $ionicPopup, $ionicModal, ionicMaterialInk, ionicMaterialMotion, $ionicHistory, $ionicPlatform){


  ionicMaterialInk.displayEffect();
  $scope.showContactCard = true;
  $scope.showContactEditCard = false;
  $scope.showEditButton = true;
  $scope.showsaveButton = false;
  $scope.addressButton = true;
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
  $scope.sbg = 'A+';
  $scope.pdob = '08/18/1994'
        //$scope.showEdit

    $scope.agecalc= function(birthday) { // birthday is a date
      var Birthday = new Date(Date.parse(birthday));
      var ageDifMs = Date.now() - Birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  $scope.requestToUpdate = function(){

    $scope.contactInfo.Speciality = $scope.tempspeciality;
    $scope.contactInfo.Degree = $scope.tempdegree;
    $scope.contactInfo.Affiliation = $scope.afill;

    console.log($scope.contactInfo);
  //   Http.post('updatedoctor', {
  //   'UserID':1,
  //   'DOB': $scope.contactInfo.dob,
  //   'Email':$scope.contactInfo.emailId,
  //   'FName':$scope.contactInfo.Fname,
  //   'LName':$scope.contactInfo.Lname,
  //   'Phone':$scope.contactInfo.mobile,
  //   'Sex':($scope.contactInfo.gender=="Male")?0:1,
  //   'Summary': $scope.contactInfo.Summary,
  //   'Experience': $scope.contactInfo.Experience,
  //   'RegNo': $scope.contactInfo.RegNo,
  //   'RegYear': $scope.contactInfo.RegYear,
  //   'RegAssoc': $scope.contactInfo.RegAssoc,
  //   'Speciality': $scope.contactInfo.Speciality,
  //   'Degree': $scope.contactInfo.Degree,
  //   'Affiliation': $scope.contactInfo.Affiliation,
  //   'Pic': $scope.contactInfo.pic,
  //   'ExStart': $scope.contactInfo.ExStart
  // })
};


$scope.$on('$ionicView.beforeEnter', function() {
  $rootScope.UserID = 1;
  console.log('bitch');
  $ionicLoading.show({
    template: 'Loading...',
    noBackdrop: true
  });
  Http.post('getdoctorprofile', {
    "DID": 1
  })
  .success(function(data) {
    $scope.ResponseCode = data.Status.ResponseCode;
    $scope.ResponseMessage = data.Status.ResponseMessage;
                //console.log($scope.ResponseMessage);
                console.log('fuck');
                $ionicLoading.hide();
                if ($scope.ResponseCode == 200) {
                  $scope.Info = {};
                  $scope.full = data.Status.DoctorData;
                  console.log('fucking');
                  console.log($scope.full);
                  $scope.contactInfo = {
                    'Name': $scope.full.Name,
                    'Fname': $scope.full.FName,
                    'Lname': $scope.full.LName,
                    'emailId': $scope.full.Email,
                    'mobile': $scope.full.Phone,
                    'gender': ($scope.full.Sex)?"Male":"Female",
                    'dob': $scope.full.DOB,
                    'Summary': $scope.full.Summary,
                    'Experience': $scope.full.Experience,
                    'RegNo': $scope.full.RegNo,
                    'RegYear': $scope.full.RegYear,
                    'RegAssoc': $scope.full.RegAssoc,
                    'Speciality': $scope.full.Speciality,
                    'Degree': $scope.full.Degree,
                    'Affiliation': $scope.full.Affiliation,
                    'pic':$scope.full.Pic,
                    'ExStart': $scope.full.ExStart

                  };

                  $scope.tempdegree = $scope.contactInfo.Degree;
                  $scope.tempspeciality = $scope.contactInfo.Speciality;
                  $scope.tempaffil = $scope.contactInfo.Affiliation;
                  $scope.drage = $scope.agecalc($scope.contactInfo.dob);
                  console.log($scope.drage);
                  console.log($scope.contactInfo);
                  // if ($scope.contactInfo.address.flatNo == 'NA' && $scope.contactInfo.address.locality == 'NA' && $scope.contactInfo.address.city == 'NA' && $scope.contactInfo.address.pinCode == 'NA') {
                  //   $scope.addressButton = true;
                  // }
                  // else{
                  //   $scope.addressButton = false;
                  //   $scope.addressContent = true;
                  //   $scope.addressEditMode = true;
                  // }
                  // console.dir($scope.full);
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



        // }
        $scope.cityList = [{
          "name": "Pune",
          "id": "1"
        }, {
          "name": "Mumbai",
          "id": "2"
        }];
        $scope.bg = ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'];
        $scope.pgender = ['male','female'];
        $scope.w = [];
        for (i = 2016; i >= 1950; i--) {
          $scope.w.push(i);
        }


        $scope.onDegreeDelete = function(item) {
          $scope.tempdegree.splice($scope.tempdegree.indexOf(item), 1);
        };


        $scope.onSpecialityDelete = function(item) {
          $scope.tempspeciality.splice($scope.tempspeciality.indexOf(item), 1);
        };

        $scope.onAffilDelete = function(item) {
          $scope.tempaffil.splice($scope.tempafill.indexOf(item), 1);
        };


        $scope.addDegree= function(degs){
          $scope.tempdegree.push({name:degs});
        };

        $scope.addSpeciality= function(specs){
          $scope.tempspeciality.push({name:specs});
        };

        $scope.addCouncil= function(councs){
          $scope.tempaffil.push({name:councs});
        };



        Http.get('degree')
        .success(function(data){
          $scope.degree = data.Status.Degree;
        }).error(function(data, status, headers, config) {
        //$scope.data.error={message: error, status: status};
        alert("error" + data);
      });


        Http.get('speciality')

        .success(function(data) {
          $scope.Speciality = data.Status.Speciality;
        //return data
      }).error(function(data, status, headers, config) {
        //$scope.data.error={message: error, status: status};
        alert("error" + data);
      });


      Http.get('council')

      .success(function(data) {
        $scope.assoc = data.Status.Council;
        //return data
      }).error(function(data, status, headers, config) {
        //$scope.data.error={message: error, status: status};
        alert("error" + data);
      });


      $ionicModal.fromTemplateUrl('templates/modalppic.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });




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

      $scope.patientProfile = function(){

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
        $scope.addAddress = function(){
          $scope.addressButton = false;
          $scope.addressInputContent = true;
          $scope.showEditButton = false;

        };
        $scope.saveAddress = function(){
          $scope.showEditButton = true;
          $scope.addressInputContent = false;
    //console.log(document.getElementById('patientAddress'));


    // var flatNo = document.getElementById('flatNo').value;
    // var locality = document.getElementById('locality').value;
    // var city = document.getElementById('city').value;
    // var pinCode = document.getElementById('pinCode').value;
    // console.log(flatNo);
    // if(flatNo=='' && locality=='' && city=='' && pinCode==''){
    //     $scope.addressButton = true;
    // }
    // else{
    //     $scope.addressContent = true;
    //     $scope.addressEditMode = true;
    //     $scope.contactInfo.address.flatNo = flatNo;
    //     $scope.contactInfo.address.locality = locality;
    //     $scope.contactInfo.address.city = city;
    //     $scope.contactInfo.address.pinCode = pinCode;
    // };
    // console.log($scope.contactInfo.address.flatNo);
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

      $scope.regyear;
      $scope.regassoc;
      $scope.affcoun;
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
            // var flatNo = document.getElementById('eflatNo').value;
            // var locality = document.getElementById('elocality').value;
            // var city = document.getElementById('ecity').value;
            // var pinCode = document.getElementById('epinCode').value;
            // //console.log(flatNo);
            // if (flatNo == '' && locality == '' && city == '' && pinCode == '') {
            //     $scope.addressButton = true;
            //     $scope.addressContent = false;
            // } else {
            //     $scope.addressContent = true;
            //     $scope.addressEditMode = true;
            //     $scope.contactInfo.address.flatNo = flatNo;
            //     $scope.contactInfo.address.locality = locality;
            //     $scope.contactInfo.address.city = city;
            //     $scope.contactInfo.address.pinCode = pinCode;
            // };
          };
          if (id == 2) {
            $scope.showBasicCard = true;
            $scope.showBasicEditCard = false;
            $scope.contactInfo.dob = document.getElementById('pdob').value;
            $scope.contactInfo.gender = document.getElementById('editgender').value;
            $scope.contactInfo.RegNo = document.getElementById('editregno').value;
            $scope.contactInfo.RegYear = document.getElementById('editregyear').value;
            $scope.contactInfo.RegAssoc = document.getElementById('editregassoc').value;
            $scope.contactInfo.ExStart = document.getElementById('editExStart').value;
          };
          if (id == 3) {
            $scope.showMedicalCard = true;
            $scope.showMedicalEditCard = false;
            $scope.contactInfo.Summary = document.getElementById('editsummary').value;
            // console.log(document.getElementById('bloodgroup'));
            // $scope.contactInfo.sbg = document.getElementById('bloodgroup').value;
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

        $scope.requestToUpdate();
      };
})


.controller('dPreferencesCtrl', function($scope, $state, $stateParams, ionicMaterialInk){

  ionicMaterialInk.displayEffect();

})


.controller('dBookmarkCtrl', function($scope, $state, $stateParams, ionicMaterialInk){

  ionicMaterialInk.displayEffect();

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


.controller('CommunityCtrl', function($scope, Http, $stateParams,$state,  $cordovaImagePicker, $ionicPlatform, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicPopover, $ionicPopup, $cordovaFileTransfer, $ionicLoading) {
    // Set Header


  // .fromTemplate() method
//   var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

//  $scope.popover = $ionicPopover.fromTemplate(template, { 
//   scope: $scope
// })
 
// $ionicPopover.fromTemplateUrl('pic-upload.html', { 
//   scope: $scope
// }).then(function(popover){ 
//   $scope.popover= popover; 

// }); 


//   $scope.openPopover = function($event) {
//     $scope.popover.show($event);
//   };
//   $scope.closePopover = function() {
//     $scope.popover.hide();
//   };
//   //Cleanup the popover when we're done with it!
//   $scope.$on('$destroy', function() {
//     $scope.popover.remove();
//   });
//   // Execute action on hide popover
//   $scope.$on('popover.hidden', function() {
//     // Execute action
//   });
//   // Execute action on remove popover
//   $scope.$on('popover.removed', function() {
//     // Execute action
//   });






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
    $scope.uploadPhoto = function(){
    // $ionicPlatform.ready(function() {

    document.addEventListener('deviceready', function(){
       
        // Image picker will load images according to these settings
    var options = {
        maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
        width: 800,
        height: 800,
        quality: 80            // Higher is better
    };
 
    $cordovaImagePicker.getPictures(options).then(function(results) {
                // Loop through acquired images
        for (var i = 0; i < results.length; i++) {
            console.log('Image URI: ' + results[i]);   // Print image URI
            $scope.uploadpic(results[i]);   
         }
        }, function(error) {
        console.log('Error: ' + JSON.stringify(error));    // In case of error
    });
  })
// });
}
  $scope.posttext; 


  $scope.uploadpic = function(images){ 

    console.log(images);
    document.addEventListener('deviceready', function(){


            var s3URI = encodeURI("anurag-misra.s3-website.ap-south-1.amazonaws.com"),
                policyBase64 = "policyBase64_file",
                signature = "signature",
                awsKey = 'AKIAII7UYQMWMRXJAEQQ',
                acl = "public-read";

              var timeStamp = Math.floor(Date.now() / 1000);
              var timeStamp = timeStamp.toString() + '.jpeg'; 
              console.log(timeStamp);
              var Poptions = {
              fileKey: "file",
              fileName: timeStamp, 
              mimeType: "image/jpeg",
              params: {
                // "key": date+'_'+fileURL.substr(fileURL.lastIndexOf('/') + 1),
                "key": timeStamp, 
                "AWSAccessKeyId": awsKey,
                "acl": acl,
                "policy": policyBase64,
                "signature": signature,
                "Content-Type": "image"
              },  
              chunkedMode: true
              };

      $cordovaFileTransfer.upload(encodeURI("anurag-misra.s3-website.ap-south-1.amazonaws.com"), images, Poptions)
      .then(function(result){


        $scope.awsimage = result;
        console.log(result); 
        $ionicPopup.alert({
          title: 'Success', 
          template: 'Your article has been posted successfully'
        });

      }, function(err){

        $ionicPopup.alert({
          title: 'Failure', 
          template: 'Your article could not be posted'
        }); 
          console.log("ERROR: " + JSON.stringify(err));

      }, function(progress){

      })
    })

    // Http.post('sharearticle', {
    //   'CommuID': $scope.CommuID, 
    //   'UserID': $scope.UserID, 
    //   'Text': $scope.posttext, 
    //   'Image': $scope.awsimage
    // })
    // .success(function(data) {
    //   $scope.ResponseCode = data.Status.ResponseCode;
    //   $scope.ResponseMessage = data.Status.ResponseMessage;
    //   $ionicLoading.hide();
    //   if ($scope.ResponseCode == 200) {
    //     $scope.connections = data.Status.ConnectionData.Connection;
        
    //     console.log($scope.connections);
    //     // console.dir($scope.myCommunities,$scope.following, $scope.otherCommunities);
    //   } else {
    //     alert($scope.ResponseMessage);
    //   }
    // }).error(function(data, status, headers, config) {
    //     //$scope.data.error={message: error, status: status};
    //     alert("error" + data);
    //     $ionicLoading.hide();
    //   });



}




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

