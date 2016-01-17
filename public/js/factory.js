app.factory('coreService', function($http, $cookies) {
  return {
    getUser: function(){
      return $cookies.get("user");
    },
    setUser: function(value, expiration){
      if(time === undefined){
        var now = new Date();
        now.setDate(now.getDate() + 365);
        expiration = now;
      }
      $cookies.put("user", value, { expires: expiration });
    },
    search: function(query){
      var url = '/api/search/' + query;
      return $http.get(url).then(function(result) {
        return result.data;
      });
    },
    getList: function(url) {
      var url = '/api/list/' + url;
      return $http.get(url).then(function(result) {
        return result.data;
      });
    },
    getPopular: function(){
      var url = '/api/popular';
      return $http.get(url).then(function(result) {
        return result.data;
      });
    },
    addBook: function(list) {
      var url = '/api/list/add/';
      return $http.post(url, list).then(function(result) {
        console.log(result.data);
        return result.data;
      });
    },
    removeBook: function(list) {
      var url = '/api/list/remove/';
      return $http.post(url, list).then(function(result) {
        return result.data;
      });
    },
    getBook: function(id){
      var url = '/api/book/'+id;
      return $http.get(url).then(function(result) {
        return result.data;
      });
    },
    getTweets: function(name){
      var url = "/tweets?q="+name;
      return $http.get(url).then(function(result) {
        return result.data;
      });
    }
  }
});