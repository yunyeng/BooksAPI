app.controller("SearchCtrl", ["$scope", "$http", "$cookies", function($scope, $http, $cookies){

	$scope.cookieExists = function(){
		return $cookies.username !== undefined;
	};

	$scope.login = function(){
		// Retrieving a cookie
		//var favoriteCookie = $cookies.myFavorite;
		// Setting a cookie
		if($scope.username !== undefined)	$cookies.username = $scope.username;
		console.log($scope.username);
	};

	$scope.logout = function(){
    	delete $cookies.username;
    	delete $cookies.usersearch;
    	$scope.username = '';
    	$scope.book.name = '';
	};

	// TODO tweet button brings tweets that belong to book one before !!!
	$scope.getTweets = function(name, index){
		//if($scope.books[index].tweets === undefined || $scope.books[index].tweets.length === 0){
			$http.get("/tweets?q="+name).success(function(response){
				console.log(response);
				$scope.books[index].tweets = response;
			});
		//}
	};

	
	$scope.search = function(page){
		if($scope.cookieExists() && $scope.book.name !== undefined) $cookies.usersearch = $scope.book.name;
		var query = '/search/'+$scope.book.name;
		if(page) query += '/'+page;
		else query += '/1';
		$http.get(query).success(function(response){
			console.log(response.items);
			$scope.total = response.totalItems;
			$scope.number = Math.ceil($scope.total / 40);
			console.log($scope.number);
			$scope.books = response.items;
		});
	};
	
	$scope.getNumber = function(num) {
	    return new Array(num);
	}

	/*$scope.get = function(){
		if($scope.cookieExists() && $scope.book.name !== undefined) $cookies.usersearch = $scope.book.name;
		$http.get("https://www.googleapis.com/books/v1/volumes?q="+$scope.book.name+"&maxResults=40").success(function(response){
			//console.log(response.items);
			$scope.books = response.items;

		});
	};
	*/

	/* BE CAREFUL!!! MUST BE MOST BOTTOM FUNCTION */
	function cookieCheck(){
		if($scope.cookieExists())	$scope.username = $cookies.username;
		if($cookies.usersearch !== undefined){
			$scope.book = {};
			$scope.book.name = $cookies.usersearch;
			$scope.search();
		}
	}
	cookieCheck();
	/* BE CAREFUL!!! MUST BE MOST BOTTOM FUNCTION */

}]);