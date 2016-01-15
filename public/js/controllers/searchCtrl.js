app.controller("SearchCtrl", ["$scope", "$cookies", "httpService", function($scope, $cookies, httpService){

	$scope.leftPane = false;
	$scope.openLeft = function(){
		if($scope.leftPane){
			$scope.leftPane = false;
			$(".left-close").animate({"margin-left":"8px"});
		} else{
			$scope.leftPane = true;
			$(".left-close").animate({"margin-left":"332px"});
		}
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
	$scope.book = {};
	
	$scope.search = function(){
		if($scope.book.name === undefined || $scope.book.name === "" || $scope.book.name.length < 1)
			return false;
		$scope.books = [];
		$scope.searched = false;
		httpService.search($scope.book.name).then(function(response){
			console.log($scope.number);
			$scope.books = response.items;
			$scope.searched = true;

			history.pushState({}, "book", "?q="+$scope.book.name);

		});
	};

	function getParameterByName(name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	function firstLoad(){
		var query = getParameterByName("q");
		if(query.length > 0){
			$scope.book.name = query;
			$scope.search();
		}
	}
	firstLoad();
	
	$scope.addBook = function(book){
		// $scope.buttons[book] = true;
		console.log(book);
		var list = {};
		list.id = $cookies.user;
		list.book = book;
		httpService.addBook(list).then(function(response){
			console.log(response);
			$scope.buttons[book] = false;
			getList();
			$(".left-close").addClass("btn-success").delay(200).queue(function(){
		    	$(this).removeClass("btn-success").dequeue();
			});
		});
	};

	$scope.removeBook = function(book){
		$scope.buttons[book] = false;
		console.log(book);
		var list = {};
		list.id = $cookies.user;
		list.book = book;
		httpService.removeBook(list).then(function(response){
			console.log(response);
			$scope.buttons[book] = true;
			getList();
			$(".left-close").addClass("btn-warning").delay(200).queue(function(){
		    	$(this).removeClass("btn-warning").dequeue();
			});
		});
	};

	$scope.isEmpty = function (obj) {
	    for (var i in obj) if (obj.hasOwnProperty(i)) return false;
	    return true;
	};

	function getList(){
		console.log($cookies.user);
		httpService.getList($cookies.user).then(function(response) {
        	if($cookies.user === undefined)	$cookies.user = response.id;
			console.log(response);
			$scope.list = response;
			$scope.buttons = {};
    	});
	}
	getList();

}]);