(function(){
 angular.module('imgame.createGame')
  .directive('googleMaps', ['$rootScope', googleMaps]);

  function googleMaps($rootScope) {
    // directive link function
    var link = function(scope, element, attrs) {      
      // map config function
      var geocoder = new google.maps.Geocoder();
      var service = new google.maps.DistanceMatrixService;
      var infoWindow = {};    
      var currInfoMarker;
      var searchMarkers = [];
      var clickMarker = null;
      var GeoMarker;
      var mapOptions = {
        center: {lat: 30.2500, lng: -97.7500},
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      var map;

      var currIcon = {
        url: 'assets/gpsloc.png',
        size: new google.maps.Size(34, 34),
        scaledSize:new google.maps.Size(17,17)
      };
      // Create the search box and link it to the UI element.
      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);

      function initMap() {
        console.log("scope: ", $rootScope.currentLocation)
        var bounds;
        scope.currentLocation = $rootScope.currentLocation;
        console.log('scope.currentLocation', scope.currentLocation)
        map = new google.maps.Map(document.getElementById('gmap'), mapOptions);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        
        // In case rootscope did not get current location, request current location and set current location on map
        if (!scope.currentLocation && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            // add current location dot
            $('#pac-input').show(); 
            // store currentLocation and center map around it and pop up info window
            scope.currentLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
            $rootScope.currentLocation = scope.currentLocation;
            // center current location and also make sure current location always show on map
            map.setCenter(scope.currentLocation);
            bounds = new google.maps.LatLngBounds(scope.currentLocation);
            // add current location dot
            new google.maps.Marker({
              position: scope.currentLocation,
              map: map,
              icon: currIcon
            });
           
            // needs to be deleted in production
            console.log("Current Location: ", position)
          });
        } else {
          $('#pac-input').show();
          // center current location and also make sure current location always show on map
          new google.maps.Marker({
            position: scope.currentLocation,
            map: map,
            icon: currIcon
          });
          map.setCenter(scope.currentLocation);
          bounds = new google.maps.LatLngBounds(scope.currentLocation);
        }                

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });
        
        // searchbox listener, place marker on map and listen to clicks
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();
          if (places.length === 0) return;

          // clear all the current markers on the map
          searchMarkers.forEach(function(marker){
            marker.setMap(null);
          });
          clickMarker && clickMarker.setMap(null);          

          // add places the match the search ont the map
          places.forEach(function(place) {
            console.log("place", place)
            var newMark = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });
            searchMarkers.push(newMark);

            // bounds view based on seach
            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }

            // add listener to show info window of the marker that was clicked
            google.maps.event.addListener(newMark, 'click', function(){
              console.log("newMark", newMark)
              infoWindow && infoWindow.close();
              showInfoWindow([place.geometry.location], place, newMark);
            })
          })

          map.fitBounds(bounds);
          map.panToBounds(bounds); 
        });

        // event listener that set the marker as the clicked point on the map
        google.maps.event.addListener(map, 'click', function(event) { 
          searchMarkers.forEach(function(marker){
            marker.setMap(null);
          });
          clickMarker && clickMarker.setMap(null);
          changeMarker(event.latLng, map);
          document.getElementById('pac-input').value = "";
        });
      };
      // initMap func complete
      
      // make the inforWindow html template
      function makeInfoHtml (name, distance) {
        var nameTag = name || '';
        console.log("name: ", scope.currentAddress)
        if (name !== 'name' || name == undefined) {
          nameTag = '<div><strong>'+nameTag+'</strong></div>';
        }
        return nameTag + '<div><strong>Distance:</strong> ' + distance + '</div>' +
          '<a href="https://www.google.com/maps/dir/' + scope.currentAddress.split(" ").join("+") + "/" + scope.game.location.split(" ").join("+")  +'">more info' + '</a>';
      };

      /////////////
      // get the distance between current location and marker, and initiate infoWindow
      // destinations is an array of locations with latLng
      // makerPlace is an object with name and formatted_address
      // marker is the marker that the infoWindow attached to 
      function showInfoWindow(destinations, markerPlace, marker) {
        // populate the game location form on location input
        document.getElementById('game-location').value =  markerPlace.formatted_address;  
        scope.game.location = markerPlace.formatted_address;  

        // send request to get distance between current location and destination    
        service.getDistanceMatrix({
          origins: [scope.currentLocation],
          destinations: destinations,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL
        }, function(res, status){
          if (status !== google.maps.DistanceMatrixStatus.OK) {
            alert('Error was: ' + status);
          } else {
            scope.currentAddress = res.originAddresses[0];
            var distanceObj = res.rows[0].elements[0];
            console.log("google distance response: ", distanceObj);
            var info = makeInfoHtml(markerPlace.name, distanceObj.distance.text);
            // add info window with distance and time for each pin drop on map
            infoWindow = new google.maps.InfoWindow({
                content: info
              });
            currInfoMarker = marker;
            infoWindow.open(map, marker);
            // add info window complete
          }

        });
      };

      // this is for clickMarker only, when click on the map, erase all other markers and only show clicked location with an infoWindow
      function changeMarker (location, map) {
        // clean the previous clicked marker
        clickMarker && clickMarker.setMap(null);

        // Add the marker at the clicked location, and add the next-available label
        // from the array of alphabetical characters.
        geocoder.geocode({'latLng': location}, function(results, status) {
          console.log("Results from getLocation from latLng: ", results)       
          clickMarker = new google.maps.Marker({
            position: location,
            map: map
          });

          if(status == google.maps.GeocoderStatus.OK) {
            if(results[0]) {
              var markerPlace = results[0];
            }
          }
          showInfoWindow([location], markerPlace, clickMarker);
        });
      };

      /////////////////////////
      // listen DOM to init MAP;
      // if (document.getElementById('gmap') && document.getElementById('pac-input')) {
      //   console.log("document.getElementById('pac-input')", document.getElementById('pac-input'))
      //   initMap();    
      //     //google.maps.event.addDomListener(window, 'load', initMap);                       
      // }

      initMap();              

    };

    return {
      link: link
    };
  };

})();