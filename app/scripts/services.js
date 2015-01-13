angular.module('sample_app')
.factory('API', function($http) {

  return {
    search: function(keywords, callback) {
      $http.get('data/hotels.json', {params: {hotelName: keywords}}).
      //$http.get('hotel/listing.do', {params: {hotelName: keywords}}).
      success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        alert('failed to get search results');
      });
    },

    find: function(id, callback) {
      $http.get('data/hotel.json').
      //$http.get('hotel/'+id+'/details.do').
      success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        alert('failed to find hotel info.');
      });
    },

    rate: function(id, callback) {
      $http.get('data/rating.json').
        success(function(data) {
          callback(data);
        }).error(function(data) {
          alert('failed to get rating results');
        });
    }
  };
});
