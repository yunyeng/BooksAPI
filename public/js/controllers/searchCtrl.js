app.controller("SearchCtrl", ["$scope", "$http", "$cookies", function($scope, $http, $cookies){

	$scope.cookieExists = function(){
		return $cookies.username !== undefined;
	};

	$scope.leftPane = false;
	$scope.open = function(){
		if($scope.leftPane)
			$scope.leftPane = false;
		else
			$scope.leftPane = true;
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

	$scope.searched = true;
	
	$scope.search = function(page){
		$scope.searched = false;
		if($scope.cookieExists() && $scope.book.name !== undefined) $cookies.usersearch = $scope.book.name;
		var query = 'api/search/'+$scope.book.name;
		if(page) query += '/'+page;
		else query += '/1';
		$http.get(query).success(function(response){
			$scope.total = response.totalItems;
			$scope.number = Math.ceil($scope.total / 40);
			console.log($scope.number);
			$scope.books = response.items;
		});
	};
	
	// $scope.getNumber = function(num) {
	//     return new Array(num);
	// }

	/*$scope.get = function(){
		if($scope.cookieExists() && $scope.book.name !== undefined) $cookies.usersearch = $scope.book.name;
		$http.get("https://www.googleapis.com/books/v1/volumes?q="+$scope.book.name+"&maxResults=40").success(function(response){
			//console.log(response.items);
			$scope.books = response.items;

		});
	};
	*/

	$scope.addBook = function(book){
		$scope.buttons[book] = true;
		console.log(book);
		var list = {};
		list.id = $cookies.user;
		list.book = book;
		$http.post('api/list/add/', list).success(function(response){
			$scope.buttons[book] = false;
			console.log(response);
		});
	};

	$scope.removeBook = function(book){
		$scope.buttons[book] = false;
		console.log(book);
		var list = {};
		list.id = $cookies.user;
		list.book = book;
		$http.post('api/list/remove/', list).success(function(response){
			console.log(response);
			$scope.buttons[book] = true;
			delete $scope.list.books[book];
		});
	};

	function getList(){
		console.log($cookies.user);
		$http.get('api/list/'+$cookies.user).success(function(response){
			if($cookies.user === undefined)	$cookies.user = response.id;
			console.log(response);
			$scope.list = response;
			$scope.buttons = {};
		});
	}
	getList();

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