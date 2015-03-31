var app = angular.module("app", ["ngCookies"]);

app.controller("SearchCtrl", ["$scope", "$http", "$cookies", function($scope, $http, $cookies){

	$scope.cookieExists = function(){
		return $cookies.username !== undefined;
	};

	$scope.login = function(){
		//console.log($scope.username);
		 // Retrieving a cookie
		 //var favoriteCookie = $cookies.myFavorite;
		 // Setting a cookie
		 $cookies.username = $scope.username;
	};

	$scope.logout = function(){
    	$cookies.username = undefined;
    	$cookies.usersearch = undefined;
    	$scope.username = '';
    	$scope.book.name = '';
	};


	$scope.getTweets = function(name, index){
		$http.get("/tweets?q="+name).success(function(response){
			console.log(response);
			$scope.books[index].tweets = response;
		});
	};

	$scope.get = function(){
		if($scope.cookieExists() && $scope.book.name !== undefined) $cookies.usersearch = $scope.book.name;
		$http.get("https://www.googleapis.com/books/v1/volumes?q="+$scope.book.name+"&maxResults=40").success(function(response){
			//console.log(response.items);
			$scope.books = response.items;

		});
	};

	/* BE CAREFUL!!! MUST BE MOST BOTTOM FUNCTION */
	function cookieCheck(){
		if($scope.cookieExists())	$scope.username = $cookies.username;
		if($cookies.usersearch !== undefined){
			$scope.book = {};
			$scope.book.name = $cookies.usersearch;
			$scope.get();
		}
	}
	cookieCheck();
	/* BE CAREFUL!!! MUST BE MOST BOTTOM FUNCTION */

	
/*
	function refresh(){
		// get all serviceClients from backend
		$http.get("/serviceClients").success(function(response){
			$scope.serviceClients = response;
		});
	}

	refresh();

	$scope.create = function(){
		console.log($scope.serviceClient);
		$http.post("/serviceClients", $scope.serviceClient).success(function(response){
			console.log(response);
			$scope.serviceClients.push($scope.serviceClient);
			$scope.serviceClient = '';
		});
	};

	$scope.remove = function(id){
		console.log(id);
		$http.delete("/serviceClients/"+id).success(function(response){
			refresh();
		});
	};
	*/

}]);