app.controller("CommentCtrl", ["$scope", "$http", function($scope, $http){
	var pathname = window.location.pathname.split("/");
	var book_id = pathname[pathname.length-1];
	$scope.comments = [];

	$scope.add = function(){
		$scope.comment.book_id = book_id;
		var d = new Date();
		$scope.comment.date = d.getTime();
		console.log($scope.comment);
		$http.post('/api/comment', $scope.comment).success(function(response){
			console.log(response);
		});
		$scope.comments.push($scope.comment);
		$scope.comment = "";
	};

	$scope.get = function(){
		$http.get('/api/comment/'+book_id).success(function(response){
			$scope.comments = response;
		});
	};
	$scope.get();

	$scope.remove = function(id){
		console.log(id);
		$http.delete('/contactlist/'+id).success(function(response){
			refresh();
		});
	};

	$scope.edit = function(id){
		console.log(id);
		$http.get('/contactlist/'+id).success(function(response){
			$scope.contact = response;
		});
	};

	$scope.update = function(){
		console.log($scope.contact._id);
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});
	};

	$scope.deselect = function(){
		$scope.contact = '';
	};

}]);