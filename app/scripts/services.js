angular.module('sample_app')
.factory('API', function($http) {
  return {
    search: function(keywords, callback) {
      console.log(keywords);
      $http.get('data/hotels.json', {params: {hotelName: keywords}}).
      success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        alert('failed to get data/hotels.json');
      });
    },
    find: function(id, callback) {
      $http.get('data/hotel.json').
      success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        alert('failed to get data/hotel.json');
      });
    }
  };
});
