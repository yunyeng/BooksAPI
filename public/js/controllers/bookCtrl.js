app.controller("BookCtrl", ["$scope", "$http", function($scope, $http){	
	var pathname = window.location.pathname.split("/");
	var id = pathname[pathname.length-1];

	$scope.getNumber=function(n){
		return new Array(Math.floor(n));
	};

	// TODO tweet button brings tweets that belong to book one before !!!
	$scope.getTweets = function(name){
		//if($scope.books[index].tweets === undefined || $scope.books[index].tweets.length === 0){
			$http.get("/tweets?q="+name).success(function(response){
				console.log(response);
				$scope.book.tweets = response;
			});
		//}
	};

	$scope.search = function(id){
		var query = '/api/book/'+id;
		$http.get(query).success(function(response){
			console.log(response);
			if(response.content)	$scope.book = response.content;
			else	$scope.book = response;
		});
	};
	$scope.search(id);

}]);