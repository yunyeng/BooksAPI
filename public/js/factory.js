app.factory('httpService', function($http) {
  return {
    search: function(query){
      var url = 'api/search/' + query;
      return $http.get(url).then(function(result) {
        return result.data;
      });
    },
    getList: function(url) {
      var url = 'api/list/' + url;
      return $http.get(url).then(function(result) {
        return result.data;
      });
    },
    addBook: function(list) {
      var url = 'api/list/add/';
      return $http.post(url, list).then(function(result) {
        return result.data;
      });
    },
    removeBook: function(list) {
      var url = 'api/list/remove/';
      return $http.post(url, list).then(function(result) {
        return result.data;
      });
    }
  }
});