(function(){
 angular.module('imgame.createGame')
  .directive('googleMaps', googleMaps);

  function googleMaps() {
    // directive link function
    var link = function(scope, element, attrs) {
      // map config function
      var geocoder;
      var marker = {};    
      var service = new google.maps.DistanceMatrixService;
      var searchBox;

      function initMap() {
        if (navigator.geolocation) {
            // get current location
          navigator.geolocation.getCurrentPosition(function (position) {
            var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(initialLocation);
            console.log("currPosition: ", position)
            scope.currentLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
            
            // add current location dot
            var GeoMarker = new GeolocationMarker(map);

            // Create the search box and link it to the UI element.
            var input = document.getElementById('pac-input');
            console.log("currPosition2: ", input)
            searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            searchBox.addListener('places_changed', function() {
              var place = searchBox.getPlaces();
              marker.setMap && marker.setMap(null);
              changeMarker(place[0].geometry.location, map);
            });
          });
        }

        var mapCanvas = document.getElementById('gmap');
        var mapOptions = {
          center: new google.maps.LatLng(30.2500, -97.7500),
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        geocoder = new google.maps.Geocoder();
        
        var map = new google.maps.Map(mapCanvas, mapOptions);

        google.maps.event.addListener(map, 'click', function(event) { 
          marker.setMap && marker.setMap(null);
          changeMarker(event.latLng, map);
          document.getElementById('pac-input').value = "";
        });
      }
      
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

      scope.$watch(
        function(){return Boolean(document.getElementById('gmap')); },
        function(){
          if (document.getElementById('gmap') && document.getElementById('pac-input')) {
            console.log("document.getElementById('pac-input')", document.getElementById('pac-input'))
            $(document.getElementById('pac-input')).show();
            element.ready(function(){
              initMap();    
              google.maps.event.addDomListener(window, 'load', initMap);          
            })      
          }
          
        }
      )
      

    };

    return {
      //restrict: 'AEC',
      //templateUrl: 'app/templates/createGameTemplate.html',
      link: link
    };
  };

})();