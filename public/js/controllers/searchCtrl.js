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

	$scope.searched = true;
	$scope.showPopular = false;
	$scope.book = {};
	
	$scope.search = function(){
		if($scope.book.name === undefined || $scope.book.name === "" || $scope.book.name.length < 1)
			return false;
		$scope.showPopular = false;
		$scope.books = [];
		$scope.searched = false;
		httpService.search($scope.book.name).then(function(response){
			$scope.books = response.items;
			$scope.searched = true;
			history.pushState({}, "book", "?q="+$scope.book.name);

		});
	};

	function getList(){		
		httpService.getList($cookies.user).then(function(response) {
        	if($cookies.user === undefined)	$cookies.user = response.id;
			$scope.list = response;
			$scope.buttons = {};
    	});
	}
	getList();

	function getPopular(){
		httpService.getPopular().then(function(response) {
			$scope.popularBooks = response;
			$scope.showPopular = true;
    	});
	}
	getPopular();

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
		var list = {};
		list.id = $cookies.user;
		list.book = book;
		httpService.addBook(list).then(function(response){
			$scope.buttons[book] = false;
			getList();
			$(".left-close").addClass("btn-success").delay(200).queue(function(){
		    	$(this).removeClass("btn-success").dequeue();
			});
		});
	};

	$scope.removeBook = function(book){
		$scope.buttons[book] = false;
		var list = {};
		list.id = $cookies.user;
		list.book = book;
		httpService.removeBook(list).then(function(response){
			$scope.buttons[book] = true;
			getList();
			$(".left-close").addClass("btn-warning").delay(200).queue(function(){
		    	$(this).removeClass("btn-warning").dequeue();
			});
		});
	};

	$scope.isEmpty = function (obj) {
	    for(var i in obj) if(obj.hasOwnProperty(i)) return false;
	    return true;
	};

}]);