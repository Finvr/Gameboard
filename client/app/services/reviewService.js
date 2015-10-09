(function(){
	angular.module('imgame.service')
	.factory('Review', function Review($http){
		function createReview(reviews){
			return $http({
        method: 'POST',
        url: '/me/reviews',
        data: reviews
      }).then(function(resp){
      	console.log("response from review service: ", resp)
        return resp.data;
      });
		};
		
    return {
				createReview: createReview
			}
	  });

})();