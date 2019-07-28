var qc = angular.module('authApp');
  qc.controller('mapsController', ['$scope', '$http', '$location', function($scope, $http, $location) {

$scope.snfs = [];
$scope.showmap = true;	
$scope.counties;
$http.post("php/getcounties.php").success(function(datax, status) {
	$scope.counties = datax;
     });

$scope.getsnfs = function() {
	$scope.query = "";
	var x = $.get("https://data.medicare.gov/resource/hq9i-23gr.json?$where=provider_state='PA'&provider_county_name='"+$scope.county.countyname+"'").done(function (data) {
			$scope.snfs = x.responseJSON;
			$scope.snf = $scope.snfs[0];
			var lat = $scope.snf.location.latitude;
			var mo = 9;
			var lng = $scope.snf.location.longitude;

			var mapOptions = {
				zoom: mo,
				center: new google.maps.LatLng(lat, lng),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);	
			});
}			

$scope.getsinglesnf = function(info, mo) {

$scope.snf = info;

var lat = $scope.snf.location.latitude;
var lng = $scope.snf.location.longitude;

var mapOptions = {
	zoom: mo,
	center: new google.maps.LatLng(lat, lng),
	mapTypeId: google.maps.MapTypeId.ROADMAP
}
$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);	

$scope.markers = [];

var infoWindow = new google.maps.InfoWindow();

var createMarker = function(info){
	if(info.location){ 	
	var marker = new google.maps.Marker({
		map: $scope.map,
		position: new google.maps.LatLng(info.location.latitude, info.location.longitude),
		title: info.provider_name
	});
	marker.content = '<div class="infoWindowContent">'  + info.provider_address + ' <br />'+ info.provider_city + ', ' + info.provider_state + '  ' + info.provider_zip_code + '<br />'+info.provider_phone_number.phone_number+ '<br />Overall Rating '+ info.overall_rating + ' out of 5 stars </div>';

	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
		infoWindow.open($scope.map, marker);
	})
	$scope.markers.push(marker);
}
}
	for(i=0; i < $scope.snfs.length; i++) {
		createMarker($scope.snfs[i]);
	}
}


$scope.openInfoWindow = function(e, selectedMarker) {
	e.preventDefault();
	google.maps.event.trigger(selectedMarker, 'click');
}


$scope.clearf = function() {
	$scope.snfs = null;
	$scope.snf = null;
	$scope.query = "";

}
}]);

 

