var app = angular.module("app", ["ngRoute", "ngCookies", "pageslide-directive"]);


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

app.filter('orderByTime', function() {
  return function(items, field) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {    
      return (moment(a.time) < moment(b.time) ? 1 : -1);
    });
    return filtered;
  };
});