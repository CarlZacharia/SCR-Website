(function()	{
'use strict';
angular
.module('authApp')
.controller('csiController', csiController);

function csiController($http, store, $scope) {
	

	$scope.calccsi = function() {
		if($scope.sex && $scope.age){
        var data = {
            age: $scope.age,
            sex: $scope.sex
        	}
	        $http.post("php/getle.php", data).success(function(data, status) {
	            $scope.le = data[0].le;
    	    })
    	}  
	}
}
})();