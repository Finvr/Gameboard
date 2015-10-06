(function(){
angular.module('imgame.profile', [])
	.controller('ProfileController', ProfileController);

	function ProfileController($scope, Profile){
		$scope.name = "Ignacio Prado"
;	};

})();