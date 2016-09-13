angular.module('starter.services', [])

.directive('ngLastRepeat', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngLastRepeat'+ (attr.ngLastRepeat ? '.'+attr.ngLastRepeat : ''));
                });
            }
        }
    }
})


.directive('file', function() {
  return {
    restrict: 'AE',
    scope: {
      file: '@'
    },
    link: function(scope, el, attrs){
      el.bind('change', function(event){
        var files = event.target.files;
        var file = files[0];
        if(file.size>0){
          scope.file = file;
          scope.$parent.file = file;
        } else {
          scope.file = {};
          scope.$parent.file = {};
        }
        scope.$apply();
      });
    }
  };
})


.directive('hideTabs', function($rootScope) {
    return {
      restrict: 'A',
      link: function($scope, $el) {
        $rootScope.hideTabs = true;
        $scope.$on('$destroy', function() {
          $rootScope.hideTabs = false;
        });
      }
    };
  })
  .directive('focusMe', function($timeout) {
    return {
      link: function(scope, element, attrs) {
        scope.$watch(attrs.focusMe, function(value) {
          if (value === true) {
            console.log('value=', value);
            //$timeout(function() {
            element[0].focus();
            scope[attrs.focusMe] = false;
            //});
          }
        });
      }
    };
  })

  .directive('elastic',
    function() {
        return {
            restrict: 'A',
            link: function($scope, element) {
                element.css({
                  'resize' : 'none',
                  'width' : '100%',
                  'height' : '36px'
                });
                $scope.initialHeight = $scope.initialHeight || element[0].style.height;
                var resize = function() {
                    element[0].style.height = $scope.initialHeight;
                    element[0].style.height = "" + element[0].scrollHeight + "px";
                };
                element.on("input change", resize);
            }
        };
    })



.factory('Http', function($http) {
  var rooturl = "http://dxhealth.esy.es/RxHealth0.1/";
  return {
    get: function(url) {
      return $http({
        method: 'GET',
        url: rooturl + url + ".php",
        headers: {
          'Content-Type': 'application/json'
        }
      });
    },
    post: function(url, params) {
      return $http({
        method: 'POST',
        url: rooturl + url + ".php",
        headers: {
          'Content-Type': 'application/json'
        },
        data: params
      });
    },
    data: {}
  };
})

.factory('ConnectivityMonitor', function($rootScope, $cordovaNetwork) {

  return {
    isOnline: function() {

      if (ionic.Platform.isWebView()) {
        return $cordovaNetwork.isOnline();
      } else {
        return navigator.onLine;
      }

    },
    ifOffline: function() {

      if (ionic.Platform.isWebView()) {
        return !$cordovaNetwork.isOnline();
      } else {
        return !navigator.onLine;
      }

    }
  };
})

.factory('GoogleMaps', function($cordovaGeolocation, $ionicLoading,
  $rootScope, $cordovaNetwork, ConnectivityMonitor) {

  var apiKey = false;
  var map = null;
  var id = null;

  function initMap() {

    var options = {
      timeout: 10000,
      enableHighAccuracy: true
    };

    $cordovaGeolocation.getCurrentPosition(options)
      .then(function(position) {

        var latLng = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);

        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById(id), mapOptions);

        //Wait until the map is loaded
        google.maps.event.addListenerOnce(map, 'idle', function() {
          var marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: latLng
          });

          var mapcircle = new google.maps.Circle({
            strokeColor: '#F933FF',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#F933FF',
            fillOpacity: 0.35,
            map: map,
            center: mapOptions.center,
            radius: 500,
            editable: true,
            draggable: true,
            geodesic: true
          });

          google.maps.event.addListener(mapcircle, 'radius_changed', function() {
            console.log(mapcircle.getRadius());
          });

          google.maps.event.addListener(mapcircle, 'center_changed', function() {
            console.log(mapcircle.getCenter());
          });

          var infoWindow = new google.maps.InfoWindow({
            content: "Here I am!"
          });

          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open($map, marker);
          });
          //loadMarkers();
          enableMap();
        });

      }, function(error) {
        console.log("Could not get location");
      });

  }

  function enableMap() {
    $ionicLoading.hide();
  }

  function disableMap() {
    $ionicLoading.show({
      template: 'You must be connected to the Internet to view this map.'
    });
  }

  function loadGoogleMaps() {

    $ionicLoading.show({
      template: 'Loading Google Maps'
    });

    //This function will be called once the SDK has been loaded
    window.mapInit = function() {
      initMap();
    };

    //Create a script element to insert into the page
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "googleMaps";

    //Note the callback function in the URL is the one we created above
    if (apiKey) {
      script.src = 'http://maps.google.com/maps/api/js?key=' + apiKey +
        '&callback=mapInit';
      console.log(script.src);
    } else {
      script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
    }

    document.body.appendChild(script);

  }

  function checkLoaded() {
    if (typeof google == "undefined" || typeof google.maps == "undefined") {
      loadGoogleMaps();
    } else {
      enableMap();
    }
  }

  /*function loadMarkers(){

      //Get all of the markers from our Markers factory
      Markers.getMarkers().then(function(markers){

        console.log("Markers: ", markers);

        var records = markers.data.result;

        for (var i = 0; i < records.length; i++) {

          var record = records[i];
          var markerPos = new google.maps.LatLng(record.lat, record.lng);

          // Add the markerto the map
          var marker = new google.maps.Marker({
              map: map,
              animation: google.maps.Animation.DROP,
              position: markerPos
          });

          var infoWindowContent = "<h4>" + record.name + "</h4>";

          addInfoWindow(marker, infoWindowContent, record);

        }

      });

  }

  function addInfoWindow(marker, message, record) {

      var infoWindow = new google.maps.InfoWindow({
          content: message
      });

      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open(map, marker);
      });

}*/

  function addConnectivityListeners() {

    if (ionic.Platform.isWebView()) {

      // Check if the map is already loaded when the user comes online,
      //if not, load it
      $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
        checkLoaded();
      });

      // Disable the map when the user goes offline
      $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
        disableMap();
      });

    } else {

      //Same as above but for when we are not running on a device
      window.addEventListener("online", function(e) {
        checkLoaded();
      }, false);

      window.addEventListener("offline", function(e) {
        disableMap();
      }, false);
    }

  }

  return {
    init: function(key, identity) {
      id = identity;
      if (typeof key != "undefined") {
        apiKey = key;
      }

      if (typeof google == "undefined" || typeof google.maps == "undefined") {

        console.warn("Google Maps SDK needs to be loaded");

        disableMap();

        if (ConnectivityMonitor.isOnline()) {
          loadGoogleMaps();
        }
      } else {
        if (ConnectivityMonitor.isOnline()) {
          initMap();
          enableMap();
        } else {
          disableMap();
        }
      }
      addConnectivityListeners();
    }
  }
})

.factory('GeoLocation', function($cordovaGeolocation, $rootScope, $ionicPopup){
  var posOptions = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 0
  };

  return {
    updatelocation : function(message){
      count = 0;
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        $rootScope.lat  = position.coords.latitude;
        $rootScope.long = position.coords.longitude;

      }, function(err) {
        console.log(err);
        switch(err.code){
          case 1:
          $ionicPopup.confirm({
            title: 'GPS Required',
            template: message,
            cancelText : "Not Now",
            okText : "GPS ON!"
          }).then(function(res) {
            if (res) {
              if(window.cordova){
                if(typeof cordova.plugins.settings.openSetting != undefined){
                  cordova.plugins.settings.openSetting("location_source", function(){
                    console.log("opened nfc settings");
                  },
                  function(){
                    console.log("failed to open nfc settings");
                  });
                }
              }
            }
          });
          break;
          case 0:
          var alertPopup = $ionicPopup.alert({
            title: "Location not found",
            template: "Booking services cannot be used without location"
          });
          break;
        }
      });
    }
  };
})

.directive('checkStrength', function() {
  return {
    replace: false,
    restrict: 'EACM',
    link: function(scope, iElement, iAttrs) {

      var strengths = {
        colors: ['#F00', '#F90', '#FF0', '#9F0', '#0F0'],
        mesureStrength: function(pwd) {
          var nScore = 0,
            nLength = 0,
            nAlphaUC = 0,
            nAlphaLC = 0,
            nNumber = 0,
            nSymbol = 0,
            nMidChar = 0,
            nRequirements = 0,
            nUnqChar = 0,
            nRepChar = 0,
            nRepInc = 0,
            nConsecAlphaUC = 0,
            nConsecAlphaLC = 0,
            nConsecNumber = 0,
            nConsecSymbol = 0,
            nConsecCharType = 0,
            nSeqAlpha = 0,
            nSeqNumber = 0,
            nSeqSymbol = 0,
            nSeqChar = 0,
            nReqChar = 0;
            var strReverse = function(s){
              return s.split("").reverse().join("");
            };
          var nTmpAlphaUC = "",
            nTmpAlphaLC = "",
            nTmpNumber = "",
            nTmpSymbol = "";
          var sAlphas = "abcdefghijklmnopqrstuvwxyz";
          var sNumerics = "01234567890";
          var sSymbols = ")!@#$%^&*()";
          var sComplexity = "Too Short";
          if (pwd) {
            nScore = parseInt(pwd.length * 4);
            nLength = pwd.length;
            var arrPwd = pwd.replace(/\s+/g, "").split(/\s*/);
            var arrPwdLen = arrPwd.length;

            /* Loop through password to check for Symbol, Numeric, Lowercase and Uppercase pattern matches */
            for (var a = 0; a < arrPwdLen; a++) {
              if (arrPwd[a].match(/[A-Z]/g)) {
                if (nTmpAlphaUC !== "") {
                  if ((nTmpAlphaUC + 1) == a) {
                    nConsecAlphaUC++;
                    nConsecCharType++;
                  }
                }
                nTmpAlphaUC = a;
                nAlphaUC++;
              } else if (arrPwd[a].match(/[a-z]/g)) {
                if (nTmpAlphaLC !== "") {
                  if ((nTmpAlphaLC + 1) == a) {
                    nConsecAlphaLC++;
                    nConsecCharType++;
                  }
                }
                nTmpAlphaLC = a;
                nAlphaLC++;
              } else if (arrPwd[a].match(/[0-9]/g)) {
                if (a > 0 && a < (arrPwdLen - 1)) {
                  nMidChar++;
                }
                if (nTmpNumber !== "") {
                  if ((nTmpNumber + 1) == a) {
                    nConsecNumber++;
                    nConsecCharType++;
                  }
                }
                nTmpNumber = a;
                nNumber++;
              } else if (arrPwd[a].match(/[^a-zA-Z0-9_]/g)) {
                if (a > 0 && a < (arrPwdLen - 1)) {
                  nMidChar++;
                }
                if (nTmpSymbol !== "") {
                  if ((nTmpSymbol + 1) == a) {
                    nConsecSymbol++;
                    nConsecCharType++;
                  }
                }
                nTmpSymbol = a;
                nSymbol++;
              }
              /* Internal loop through password to check for repeat characters */
              var bCharExists = false;
              for (var b = 0; b < arrPwdLen; b++) {
                if (arrPwd[a] == arrPwd[b] && a != b) { /* repeat character exists */
                  bCharExists = true;
                  /*
                  Calculate icrement deduction based on proximity to identical characters
                  Deduction is incremented each time a new match is discovered
                  Deduction amount is based on total password length divided by the
                  difference of distance between currently selected match
                  */
                  nRepInc += Math.abs(arrPwdLen / (b - a));
                }
              }
              if (bCharExists) {
                nRepChar++;
                nUnqChar = arrPwdLen - nRepChar;
                nRepInc = (nUnqChar) ? Math.ceil(nRepInc / nUnqChar) : Math.ceil(nRepInc);
              }
            }

            /* Check for sequential alpha string patterns (forward and reverse) */
            for (var s = 0; s < 23; s++) {
              var sFwd = sAlphas.substring(s, parseInt(s + 3));
              var sRev = strReverse(sFwd);
              if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) {
                nSeqAlpha++;
                nSeqChar++;
              }
            }

            /* Check for sequential numeric string patterns (forward and reverse) */
            for (var s = 0; s < 8; s++) {
              var sFwd = sNumerics.substring(s, parseInt(s + 3));
              var sRev = strReverse(sFwd);
              if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) {
                nSeqNumber++;
                nSeqChar++;
              }
            }

            /* Check for sequential symbol string patterns (forward and reverse) */
            for (var s = 0; s < 8; s++) {
              var sFwd = sSymbols.substring(s, parseInt(s + 3));
              var sRev = strReverse(sFwd);
              if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) {
                nSeqSymbol++;
                nSeqChar++;
              }
            }

            /* Modify overall score value based on usage vs requirements */

            /* General point assignment */
            if (nAlphaUC > 0 && nAlphaUC < nLength) {
              nScore = parseInt(nScore + ((nLength - nAlphaUC) * 2));
            }
            if (nAlphaLC > 0 && nAlphaLC < nLength) {
              nScore = parseInt(nScore + ((nLength - nAlphaLC) * 2));
            }
            if (nNumber > 0 && nNumber < nLength) {
              nScore = parseInt(nScore + (nNumber * 4));
            }
            if (nSymbol > 0) {
              nScore = parseInt(nScore + (nSymbol * 6));
            }
            if (nMidChar > 0) {
              nScore = parseInt(nScore + (nMidChar * 2));
            }

            /* Point deductions for poor practices */
            if ((nAlphaLC > 0 || nAlphaUC > 0) && nSymbol === 0 && nNumber === 0) { // Only Letters
              nScore = parseInt(nScore - nLength);
            }
            if (nAlphaLC === 0 && nAlphaUC === 0 && nSymbol === 0 && nNumber > 0) { // Only Numbers
              nScore = parseInt(nScore - nLength);
            }
            if (nRepChar > 0) { // Same character exists more than once
              nScore = parseInt(nScore - nRepInc);
            }
            if (nConsecAlphaUC > 0) { // Consecutive Uppercase Letters exist
              nScore = parseInt(nScore - (nConsecAlphaUC * 2));
            }
            if (nConsecAlphaLC > 0) { // Consecutive Lowercase Letters exist
              nScore = parseInt(nScore - (nConsecAlphaLC * 2));
            }
            if (nConsecNumber > 0) { // Consecutive Numbers exist
              nScore = parseInt(nScore - (nConsecNumber * 2));
            }
            if (nSeqAlpha > 0) { // Sequential alpha strings exist (3 characters or more)
              nScore = parseInt(nScore - (nSeqAlpha * 3));
            }
            if (nSeqNumber > 0) { // Sequential numeric strings exist (3 characters or more)
              nScore = parseInt(nScore - (nSeqNumber * 3));
            }
            if (nSeqSymbol > 0) { // Sequential symbol strings exist (3 characters or more)
              nScore = parseInt(nScore - (nSeqSymbol * 3));
            }

            /* Determine if mandatory requirements have been met and set image indicators accordingly */
            var arrChars = [nLength, nAlphaUC, nAlphaLC, nNumber, nSymbol];
            var arrCharsIds = ["nLength", "nAlphaUC", "nAlphaLC", "nNumber", "nSymbol"];
            var arrCharsLen = arrChars.length;
            for (var c = 0; c < arrCharsLen; c++) {
              if (arrCharsIds[c] == "nLength") {
                var minVal = parseInt(7);
              } else {
                var minVal = 0;
              }
              if (arrChars[c] == parseInt(minVal + 1)) {
                nReqChar++;
              } else if (arrChars[c] > parseInt(minVal + 1)) {
                nReqChar++;
              }
            }
            nRequirements = nReqChar;
            if (pwd.length >= 8) {
              var nMinReqChars = 3;
            } else {
              var nMinReqChars = 4;
            }
            if (nRequirements > nMinReqChars) { // One or more required characters exist
              nScore = parseInt(nScore + (nRequirements * 2));
            }

            /* Determine complexity based on overall score */
            if (nScore > 100) {
              nScore = 100;
            } else if (nScore < 0) {
              nScore = 0;
            }
            return nScore;
          } else {
            /* Display default score criteria to client */
            return 0;
          }

        },
        getColor: function(s) {
          var idx = 0;
          if (s <= 10) {
            idx = 0;
          } else if (s <= 20) {
            idx = 1;
          } else if (s <= 30) {
            idx = 2;
          } else if (s <= 40) {
            idx = 3;
          } else {
            idx = 4;
          }

          return {
            idx: idx + 1,
            col: this.colors[idx]
          };
        }
      };

      scope.$watch(iAttrs.checkStrength, function() {
        if (scope.pw === '') {
          iElement.css({
            "display": "none"
          });
        } else {
          var strength = strengths.mesureStrength(scope.pw);
          var c = strengths.getColor(strength);
          iElement.css({
            "display": "inline"
          });
          var elements = iElement.children('li');
          var i;
          for(i =0; i < elements.length;i++){
            if( i < c.idx){
              elements[i].style.background = c.col;
            }else{
              elements[i].style.background = "#DDD";
            }
          }
        }
      });

    },
    template: '<li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li>'
  };
})

.factory('Dates', function(){
  return {
    getintervalstring : function(date) {
      date = Date.parse(date);
      var seconds = Math.floor((new Date() - date) / 1000);
      var interval = Math.floor(seconds / 31536000);
      if (interval > 1) {
          return interval + " years";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
          return interval + " months";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
          return interval + " days";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
          return interval + " hours";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
          return interval + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    }
  }
})
