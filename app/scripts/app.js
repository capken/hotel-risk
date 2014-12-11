'use strict';

angular.module('sample_app', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', 
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/default');

    $stateProvider
    .state('default', {
      url: '/default',
      templateUrl: 'views/default.html'
    });
  }
]);
