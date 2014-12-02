'use strict';

angular.module('mapclipper', ['ui.router', 'ui.bootstrap'])

.config(['$stateProvider', '$urlRouterProvider', 
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/google_maps');

    $stateProvider
    .state('map', {
      url: '/google_maps',
      templateUrl: 'views/google_maps.html'
    })
    .state('privacy', {
      url: '/privacy_policy',
      templateUrl: 'views/privacy_policy.html'
    });
  }
]);
