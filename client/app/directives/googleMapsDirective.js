(function(){
 angular.module('imgame.createGame')
  .directive('googleMaps', googleMaps);

  function googleMaps() {
    // directive link function
    var link = function(scope, element, attrs) {
      // map config function
      var geocoder = new google.maps.Geocoder();
      var marker = {};    
      var service = new google.maps.DistanceMatrixService;

      var mapCanvas = document.getElementById('gmap');
      var mapOptions = {
        center: {lat: 30.2500, lng: -97.7500},
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      var map = new google.maps.Map(mapCanvas, mapOptions);
      // Create the search box and link it to the UI element.
      var input = document.getElementById('pac-input');
      console.log("currPosition2: ", input)
      var searchBox = new google.maps.places.SearchBox(input);

      function initMap() {

        if (navigator.geolocation) {
            // get current location
          navigator.geolocation.getCurrentPosition(function (position) {
            // store currentLocation and center map around it and pop up info window
            scope.currentLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
            map.setCenter(scope.currentLocation);

            // add current location dot
            var GeoMarker = new GeolocationMarker(map);

            // needs to be deleted in production
            console.log("Current Location: ", position)
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          handleLocationError(false, infoWindow, map.getCenter())
        }; 

            
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          map.setCenter(scope.currentLocation);
          searchBox.setBounds(map.getBounds());
        });
        
        var searchMarkers = [];
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length === 0) {
            return;
          }

          searchMarkers.forEach(function(marker){
            marker.setMap(null);
          });

          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            var newMark = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });
            searchMarkers.push(newMark);

            // add listener to show info window
            google.maps.event.addListener(newMark, 'click', function(){
              var content = "hi";
              console.log('content', content)
              scope.infoWindow = new google.maps.InfoWindow({
                content : content            
              })
              scope.infoWindow.open(map, this)
            })
          })
          //marker.setMap && marker.setMap(null);
          //changeMarker(places[0].geometry.location, map);
        });




        // Bias the SearchBox results towards current map's viewport.

        google.maps.event.addListener(map, 'click', function(event) { 
          searchMarkers.forEach(function(marker){
            marker.setMap(null);
          });
          marker.setMap && marker.setMap(null);
          changeMarker(event.latLng, map);
          document.getElementById('pac-input').value = "";
        });
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      };
      

      function changeMarker (location, map) {
        // Add the marker at the clicked location, and add the next-available label
        // from the array of alphabetical characters.
        geocoder.geocode({'latLng': location},
          function(results, status) {
            marker = new google.maps.Marker({
              position: location,
              map: map
            });
            marker.address = "Unknown location!";
            if(status == google.maps.GeocoderStatus.OK) {
              if(results[0]) {
                marker.address = results[0].formatted_address;
              }
            }
            
            document.getElementById('game-location').value =  marker.address;
              
            service.getDistanceMatrix({
              origins: [scope.currentLocation],
              destinations: [location],
              travelMode: google.maps.TravelMode.DRIVING,
              unitSystem: google.maps.UnitSystem.IMPERIAL
            }, function(res, status){
              if (status !== google.maps.DistanceMatrixStatus.OK) {
                alert('Error was: ' + status);
              } else {
                var distanceObj = res.rows[0].elements[0];
                console.log("google distance response: ", distanceObj)

                // add info window with distance and time for each pin drop on map
                var info = '<div><strong>Distance:</strong> ' + distanceObj.distance.text + '</div>' + 
                           '<div><strong>Drivetime:</strong> ' + distanceObj.duration.text + '</div>' + 
                           '<a href="https://www.google.com/maps/dir/' + scope.currentLocation + "/" + marker.address.split(" ").join("+") + '">more info' + '</a>';
                var address = new google.maps.InfoWindow({
                    content: info
                  });
                address.open(map, marker);
                // add info window complete
              }
            })
        });
      };

      if (document.getElementById('gmap') && document.getElementById('pac-input')) {
        console.log("document.getElementById('pac-input')", document.getElementById('pac-input'))
        element.ready(function(){
          initMap();    
          google.maps.event.addDomListener(window, 'load', initMap);          
        })      
      }
      
    };

    return {
      //restrict: 'AEC',
      //templateUrl: 'app/templates/createGameTemplate.html',
      link: link
    };
  };

})();