var qc = angular.module('authApp');
qc.controller('authsController', ['$scope', '$http',  '$location', '$mdDialog', function($scope, $http, $location, $mdDialog) {

$scope.auths = [];
$scope.ma = [];
$scope.va = [];
$scope.ep = [];
$scope.probate = [];
$scope.ssa = [];
$scope.forms = [];
$scope.scr = [];
$scope.zb = [];
$scope.florida = [];
$scope.other = [];

$http.get('php/getauths.php').success(function(res) {
      $scope.auths = res;
      for(var i = 0; i < res.length; i++){
        if($scope.auths[i].area == "Medicaid"){$scope.ma.push($scope.auths[i])}
        else if($scope.auths[i].area == "VA"){$scope.va.push($scope.auths[i])}
        else if($scope.auths[i].area == "Probate"){$scope.probate.push($scope.auths[i])}
        else if($scope.auths[i].area == "SSA"){$scope.ssa.push($scope.auths[i])}
        else if($scope.auths[i].area == "Guardianships"){$scope.guard.push($scope.auths[i])}
        else if($scope.auths[i].area == "scr"){$scope.scr.push($scope.auths[i])}
        else if($scope.auths[i].area == "zb"){$scope.zb.push($scope.auths[i])}              
        else if($scope.auths[i].area == "Florida"){$scope.florida.push($scope.auths[i])}
        else if($scope.auths[i].area == "EP"){$scope.ep.push($scope.auths[i])}
        else {$scope.other.push($scope.auths[i])};
      }
    });

$scope.addnewauthority = function() {


 var req = $http({
        method: "post",
        url: "php/addnewauthority.php",
        data: {
      aarea: $scope.aarea,  
      akeywords: $scope.akeywords, 
      atype: $scope.atype,
      adesc: $scope.adesc,
      alink: $scope.alink
        },
     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
      req.success(function(data, status, headers, config)
      {
$http.get('php/getauths.php').success(function(res) {
      $scope.auths = res;
      for(var i = 0; i < res.length; i++){
        if($scope.auths[i].area == "Medicaid"){$scope.ma.push($scope.auths[i])}
        else if($scope.auths[i].area == "VA"){$scope.va.push($scope.auths[i])}
        else if($scope.auths[i].area == "Probate"){$scope.probate.push($scope.auths[i])}
        else if($scope.auths[i].area == "SSA"){$scope.ssa.push($scope.auths[i])}
        else if($scope.auths[i].area == "Guardianships"){$scope.guard.push($scope.auths[i])}
        else if($scope.auths[i].area == "scr"){$scope.scr.push($scope.auths[i])}
        else if($scope.auths[i].area == "zb"){$scope.zb.push($scope.auths[i])}              
        else if($scope.auths[i].area == "EP"){$scope.ep.push($scope.auths[i])}
        else if($scope.auths[i].area == "Florida"){$scope.florida.push($scope.auths[i])}        
        else if($scope.auths[i].area == "Other"){$scope.other.push($scope.auths[i])};
      }
      })
      .error(function(data, status, headers, config)
      {
        console.log('error');
      }); 
  })
alert("Successfully Added " + $scope.adesc);
$scope.selectedTab = 0;
}
}]);