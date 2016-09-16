angular.module('starter.services', [])

.factory('Http', function($http) {
  var rooturl = "http://dxhealth.esy.es/RxHealth0.1/";
  var datam = {};
  var extras = {};
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
    setdata: function(dat,Name,extra=null){
      datam[Name] = dat;
      if(extra){
        extras[Name] = extra;
      }
    },
    getdata : function(Name){
      var result = {'data' : datam[Name], 'extras' : extras[Name]};
      return result;
    }
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

.factory('Dates', function(){
  return {
    getintervalstring : function(seconds) {
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
