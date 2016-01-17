app.controller("BookCtrl", function($scope, coreService){
	var pathname = window.location.pathname.split("/");
	var id = pathname[pathname.length-1];

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

	function getList(){
		coreService.getList(coreService.getUser()).then(function(response) {
        	if(coreService.getUser() === undefined)
        		coreService.setUser(response.id);
			$scope.list = response;
			$scope.buttons = {};
    	});
	}
	getList();

	$scope.getNumber=function(n){
		return new Array(Math.floor(n));
	};

	// TODO tweet button brings tweets that belong to book one before !!!
	$scope.getTweets = function(name){
		//if($scope.books[index].tweets === undefined || $scope.books[index].tweets.length === 0){
			coreService.getTweets(name).then(function(response){
				$scope.book.tweets = response;
			});
		//}
	};

	$scope.preview = function(){
		window.open($scope.book.volumeInfo.previewLink,'winname','directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=1000,height=860');
	};

	$scope.search = function(id){
		coreService.getBook(id).then(function(response){
			if(response.content)	$scope.book = response.content;
			else	$scope.book = response;
		});
	};
	$scope.search(id);

	$scope.addBook = function(book){
		// $scope.buttons[book] = true;
		var list = {};
		list.id = coreService.getUser();
		list.book = book;
		coreService.addBook(list).then(function(response){
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
		list.id = coreService.getUser();
		list.book = book;
		coreService.removeBook(list).then(function(response){
			$scope.buttons[book] = true;
			getList();
			$(".left-close").addClass("btn-warning").delay(200).queue(function(){
		    	$(this).removeClass("btn-warning").dequeue();
			});
		});
	};



});