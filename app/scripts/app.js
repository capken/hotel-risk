'use strict';

angular.module('sample_app', ['ui.router', 'ui.bootstrap'])

.config(['$stateProvider', '$urlRouterProvider', 
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/hotels');

    $stateProvider
    .state('hotels', {
      url: '/hotels',
      templateUrl: 'views/default.html'
    });

    $stateProvider
    .state('hotel', {
      url: '/hotels/:id',
      templateUrl: 'views/hotel.html',
      controller: 'HotelCtrl'
    });
  }
]);
