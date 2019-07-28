var qc = angular.module('authApp');
qc.controller('homeController', ['$scope', '$http', 'store', '$location', '$mdDialog', '$timeout', '$window', 'userService', function($scope, $http, store, $location, $mdDialog, $timeout, $window, userService) {


$scope.tempuser = "";
$scope.todos;
$scope.reminders;
$scope.isAuthenticated = false;





$scope.today = moment(new Date()).format("MMMM D, YYYY");
  $scope.profile;

  $scope.login = function(e, p) {
   var data = {
          email: e,
          pw: p
        }
    $http.post('php/login.php', data).success(function(res) {
        if(res.length > 0){
            $scope.user = function(){
             commonService.setUser(res[0]);
            };
              $scope.isAuthenticated = true;
              $scope.profile = res[0];
              $window.localStorage['profile'] = JSON.stringify(res[0]);
                $location.path("/scrcases");
                localStorage.setItem('auth', true);
      }
          else {
              alert("ERROR - BAD LOGIN");
          }
  });
}

$scope.logout = function () {
      console.log($scope.isAuthenticated);
      $scope.isAuthenticated = false;
      localStorage.setItem('auth', false);
  $location.path('/home');
    }
    



//ENTER AN IF STATEMENT GETTING ALL ZB DATA TODOS HERE




  }]);