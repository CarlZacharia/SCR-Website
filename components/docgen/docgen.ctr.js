var qc = angular.module('authApp');
qc.controller('docsController', ['$scope', '$http',  '$location', function($scope, $http, $location) {



$scope.attys = ['', 'Carl B. Zacharia', 'Christine Brown Murphy', 'Colleen D. Bratkovich', 'Justin Ellis', 'Carrie Conboy', 'Benjamin Urso', 'Daniel T. Reimer'];

$scope.county = ['', 'Allegheny', 'Washington', 'Westmoreland', 'Beaver', 'Butler', 'Greene', 'Lawrence', 'Mercer', 'Fayette'];

$scope.fhca1name = $scope.fa1name;
$scope.fhca2name = $scope.fa2name;
$scope.pophc1 = function() {
	$scope.hca1name = $scope.a1name;
};

$scope.pophc2 = function() {
	$scope.hca2name = $scope.a2name;
};

$scope.pophc3 = function() {
	$scope.hca3name = $scope.a3name;
};

$scope.pop3hc1 = function() {
	$scope.hca1name3 = $scope.a1name3;
};

$scope.pop3hc2 = function() {
	$scope.hca2name3 = $scope.a2name3;
};

$scope.pop3hc3 = function() {
	$scope.hca3name3 = $scope.a3name3;
};

$scope.fpophc1 = function() {
	$scope.fhca1name = $scope.fa1name;
};

$scope.fpophc2 = function() {
	$scope.fhca2name = $scope.fa2name;
};
}]);