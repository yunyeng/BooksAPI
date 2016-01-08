var app = angular.module("app", ["ngCookies", "ngRoute"]);
app.service('middleService', function() {
	var savedData = {}
	function set(data){
		//$cookies.book = data;
		savedData = data;
	}
	function get(){
		//savedData = $cookies.book;
		return savedData;
	}
	return{
		set: set,
		get: get
	}
});