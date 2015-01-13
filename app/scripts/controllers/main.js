angular.module('sample_app')
.controller('MainCtrl', function($scope, API) {

  $scope.mapImageURL = function(hotel) {
    var address = encodeURIComponent(hotel.city + hotel.address);
    return 'http://apis.map.qq.com/ws/staticmap/v2/?' + 
      'center=' + address  +
      '&zoom=16&size=200*150&maptype=roadmap&scale=2' +
      '&markers=size:large|' + address +
      '&key=NJQBZ-QHURR-2K4WP-WOACV-QMWOE-DVBBX';
  };

  $scope.search = function() {
    console.log('keywords = ' + $scope.keywords);
    if(angular.isDefined($scope.keywords)) {
      API.search($scope.keywords, function(data) {
        $scope.hotels = data;
      });
    }
  };
  
})

.controller('HotelCtrl', function($scope, $state, $stateParams, $modal, API) {

  var streetView = new qq.maps.Panorama(document.getElementById('streetView'));
  streetView.setPov({
    heading: 1,
    pitch: 0
  });
  streetView.setZoom(1);

  var map = new qq.maps.Map(document.getElementById("map"));
  map.panTo(new qq.maps.LatLng(31.22, 121.48));
  map.zoomTo(8);

  var panoService = new qq.maps.PanoramaService();

  //var geocoder = new qq.maps.Geocoder({
  //  complete: function(results) {
  //    console.log(JSON.stringify(results));
  //    var loc = results.detail.location;
  //    map.setCenter(loc);
  //    map.zoomTo(13);
  //    new qq.maps.Marker({
  //      map:map,
  //      position: loc
  //    });
  //  }
  //});


  $scope.hotelId = $stateParams.id;
  API.find($scope.hotelId, function(data) {
    $scope.hotel = data;

    var loc = new qq.maps.LatLng($scope.hotel.lng, $scope.hotel.lat);

    map.setCenter(loc);
    map.zoomTo(17);
    new qq.maps.Marker({
      map:map,
      position: loc
    });

    panoService.getPano(loc, 1000, function(panoInfo) {
      if(panoInfo !== null) {
        streetView.setPano(panoInfo.id);
      }
    });


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

.controller('HotelRiskScoreCtrl', function($scope, $modalInstance, hotel, API) {

  $scope.hotel = hotel;

  API.rate(hotel.id, function(data) {
    $scope.rating = data;
  });

  $scope.ok = function () {
    $modalInstance.close(hotel.id);
  };
});
