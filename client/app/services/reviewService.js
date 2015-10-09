(function(){
	angular.module('imgame.service')
	.factory('Review', function Review($http){
		function createReview(reviews){
			return $http({
        method: 'POST',
        url: '/me/reviews',
        data: reviews
      })
      .then(function(resp){
        return resp.data;
      })
      .catch(function(err){
        console.log("createReview service Error: ", err)
      });
		};
		
    return {
				createReview: createReview
			}
	  });

})();