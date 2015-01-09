angular.module('sample_app')
.controller('MainCtrl', function($scope, API) {

  $scope.search = function() {
    if($scope.keywords !== '') {
      API.search($scope.keywords, function(data) {
        $scope.hotels = data;
      });
    }
  };
  
})

.controller('HotelCtrl', function($scope, $state, $stateParams, $modal, API) {
  $scope.hotelId = $stateParams.id;
  API.find($scope.hotelId, function(data) {
    $scope.hotel = data;
  });

  $scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
        controller: 'HotelRiskScoreCtrl',
        size: size,
        resolve: {
        hotel: function () {
          return $scope.hotel;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
    }, function () {
    });
  };
})

.controller('HotelRiskScoreCtrl', function($scope, $modalInstance, hotel) {
  $scope.ok = function () {
    $modalInstance.close(hotel.id);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
