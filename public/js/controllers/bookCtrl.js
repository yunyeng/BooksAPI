app.controller("BookCtrl", function($scope, $cookies, httpService){
	var pathname = window.location.pathname.split("/");
	var id = pathname[pathname.length-1];

	function getList(){		
		var now = new Date();
		now.setDate(now.getDate() + 365);
		httpService.getList($cookies.get("user")).then(function(response) {
        	if($cookies.get("user") === undefined){
        		$cookies.put("user", response.id, { expires: now });
        	}
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
			httpService.getTweets(name).then(function(response){
				console.log(response);
				$scope.book.tweets = response;
			});
		//}
	};

	$scope.preview = function(){
		window.open($scope.book.volumeInfo.previewLink,'winname','directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=1000,height=860');
	};

	$scope.search = function(id){
		httpService.getBook(id).then(function(response){
			console.log(response);
			if(response.content)	$scope.book = response.content;
			else	$scope.book = response;
		});
	};
	$scope.search(id);

	$scope.addBook = function(book){
		// $scope.buttons[book] = true;
		var list = {};
		list.id = $cookies.get("user");
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
		list.id = $cookies.get("user");
		list.book = book;
		httpService.removeBook(list).then(function(response){
			$scope.buttons[book] = true;
			getList();
			$(".left-close").addClass("btn-warning").delay(200).queue(function(){
		    	$(this).removeClass("btn-warning").dequeue();
			});
		});
	};



});