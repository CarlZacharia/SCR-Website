var qc = angular.module('authApp');
qc.controller('casemainController', ['$scope', '$http',  '$location', function($scope, $http, $location) {

  var a = JSON.parse(localStorage.getItem("profile"))
  var ucat = a.user_metadata.userCat;
$scope.ucat = ucat;

if(ucat == "atty") {
 $http.get('php/getallcases.php').success(function(res) {
      $scope.cases = res;
      console.log(res);
    });	
}
else {
	 $http.get('php/getallcasescw.php').success(function(res) {
      $scope.cases = res;
      console.log(res);
    });	
}



$scope.showcase = function(cid) {
	$http.get('php/getcase.php?caseid='+cid.caseid).success(function(res) {
      $scope.case = res[0];
      console.log(res[0]);
    });
}
}]);

