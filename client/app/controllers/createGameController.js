(function(){
 angular.module('imgame.createGame', [])
 	.controller('CreateGameController', CreateGameController)
  .directive('googleMaps', googleMaps);

 	function CreateGameController($scope, $window, $location, GamePost, Auth){
 		$scope.game = {};

    Auth.requireAuth();

    // set today as the ealiest day user can select
    $scope.now = new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().split('T')[0];
    console.log($scope.now)
    document.getElementById('game-datetime').setAttribute('min', $scope.now + "T00:00:00");

    $scope.createGame = function(game){
      game = { 
        "game_location": game.location,
        "game": game.name,
        "gamepost_description": game.description,
        "player_count": game.numPlayers,
        "game_datetime": game.datetime
      };
      console.log("create gamepost game: ", game)
      GamePost.create(game)
        .then(function(data){
          $location.path("/my-games")
          // if user is not authrized, data = "User is not logged in!"
          console.log("create gamepost: ", data)
          console.log(data);
        })
      };
  };
  
  function googleMaps() {
    // directive link function
    var link = function(scope, element, attrs) {
      // map config function
      var geocoder;
      var marker = {};    
      function initMap() {
        // get current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
             map.setCenter(initialLocation);
          });
        }

        var mapCanvas = document.getElementById('gmap');
        console.log("mapCanvas: ", mapCanvas)
        var mapOptions = {
          center: new google.maps.LatLng(30.2500, -97.7500),
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        geocoder = new google.maps.Geocoder();
        
        var map = new google.maps.Map(mapCanvas, mapOptions);
        var GeoMarker = new GeolocationMarker(map);

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        searchBox.addListener('places_changed', function() {
          var place = searchBox.getPlaces();
          marker.setMap && marker.setMap(null);
          changeMarker(place[0].geometry.location, map);
        });

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
            var address = new google.maps.InfoWindow({
              content: marker.address
            });
            address.open(map, marker);
            document.getElementById('game-location').value =  marker.address;
            scope.game.location = marker.address;
        });
    };
    
    initMap();    
    google.maps.event.addDomListener(window, 'load', initMap);

    };

    return {
      link: link
    };
  };

})();