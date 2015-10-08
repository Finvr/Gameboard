(function(){
	angular.module('imgame.createReview', [])
	.controller('CreateReviewController', CreateReviewController);

	function CreateReviewController($scope, $window, $location, Auth, Review){
		$scope.review = {};

		$scope.createReview = function (review){
			review = {
				"showed_up": $scope.review.showed_up,
				"rating": $scope.review.rating,
				"reviewee_id": $scope.review.reviewee_id,
				"reviewer_id": $scope.review.reviewer_id,
				"gamepost_id": $scope.review.gamepost_id
			}
			console.log("create review: ", $scope.review)
			Review.createReview(review)
			.then(function (data){
				
			})
		}
	}
	return {
    createReview: createReview
  } 
})