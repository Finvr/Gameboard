(function(){
 angular.module('imgame.createGame', [])
 	.controller('CreateGameController', CreateGameController);

 	function CreateGameController($scope, $window, $location, GamePost, Auth){
 		$scope.game = {};

    Auth.requireAuth();

    // google map
    var geocoder;
    $scope.initialize = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
           map.setCenter(initialLocation);
        });
      }
      var mapCanvas = document.getElementById('map');
      var mapOptions = {
        center: new google.maps.LatLng(30.2500, -97.7500),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      geocoder = new google.maps.Geocoder();
      
      var map = new google.maps.Map(mapCanvas, mapOptions);
      var GeoMarker = new GeolocationMarker(map);


      google.maps.event.addListener(map, 'click', function(event) { 
        marker.setMap && marker.setMap(null);
        $scope.changeMarker(event.latLng, map);
      });
    }
    var marker = {};
    
    $scope.changeMarker =  function (location, map) {
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
          $scope.game.location = marker.address;
      });

    };
    
    $scope.initialize();
    
    google.maps.event.addDomListener(window, 'load', $scope.initialize);
    // google map over

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
          // if user is not authrized, data = "User is not logged in!"
          console.log("create gamepost: ", data)
 					console.log(data);
 				})
      };
 	};

})();