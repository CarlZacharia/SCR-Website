(function()	{
'use strict';
angular
.module('authApp')
.controller('manosController', manosController);

function manosController($http, store, $scope) {
	

	$scope.getle = function() {
		if($scope.sex && $scope.age){
        var data = {
            age: $scope.age,
            sex: $scope.sex
        	}
	        $http.post("php/getle.php", data).success(function(data, status) {
	            $scope.le = data[0].le;
    	    });
 			$http.post("php/getrmdj.php", data).success(function(data, status) {
	            $scope.rmd = data[0].le;
    	    })    	    
    	}  
	}


	$scope.getmanos = function() {
		var d = new Date();
		if(!$scope.month) 
			{
				var m = d.getMonth();
				$scope.month = m;
		} 
		if(!$scope.year){
			var y = d.getFullYear();
			$scope.year = y;
		}
			var y = $scope.year;
			var m = $scope.month;
			var yh = "second";
			if(m < 6) {var yh = "first"}
        var data = {
            year: y,
            yearhalf: yh
        	}
	        $http.post("php/getmanos.php", data).success(function(data, status) {
	            $scope.manos = data[0];
	            $scope.npna = $scope.manos.pna *1;
				$scope.npartb = $scope.manos.partb *1;
    	    })
    	};
	
$scope.getmanos();

$scope.pencalc = function() {
	console.log($scope.penday);
	if($scope.manos.penday && $scope.giftamt && $scope.startdate){
	var gift = $scope.giftamt *1;
	var sd = moment($scope.startdate);
	var pdivd = $scope.manos.penday *1;
	var pdivm = $scope.manos.penmon *1;
	var pdays = gift / pdivd;
	var pmon = gift / pdivm;
	$scope.pendays = parseInt(pdays);
	$scope.penmonths = pmon.toFixed(2);
	var ed =  moment(sd).add($scope.pendays, 'days');
	console.log(ed);
	$scope.enddate = new Date(ed);
	}
}

$scope.savecalc = function() {
var snfdr = $scope.snfdr *1;
var minc = $scope.monthlyinc *1;
var medins = $scope.medins *1;
var netincome = minc - medins;
var dailyincome = netincome *12 / 365;
var penday = $scope.manos.penday *1;
var pdays = $scope.pendays *1;
console.log($scope);
if($scope.monthlyinc && $scope.manos.penday && $scope.snfdr) {
	$scope.netincome = netincome;
	$scope.paytosnf = (snfdr - dailyincome) * pdays;
	$scope.savings = $scope.giftamt - $scope.paytosnf;
}
};


$scope.calcsingleincome = function() {
	var ss = $scope.ssinc ? $scope.ssinc *1 : 0;
	var pen = $scope.peninc ? $scope.peninc *1 : 0;
	var va = $scope.vainc ? $scope.vainc *1 : 0;
	var oth = $scope.othinc ? $scope.othinc *1 : 0;
	var medins = $scope.medins ? $scope.medins *1 : 0;
	var partb = $scope.manos.partb ? $scope.npartb *1 : 0;
	var partd = $scope.partd ? $scope.partd *1 : 0;
	var pna = $scope.manos.pna ? $scope.pna *1 : 0;

	$scope.grossincome = ss + pen + va *1 + oth;
	$scope.grossmedins = partb *1 + partd + medins;
	$scope.inctosnf = $scope.grossincome - ($scope.grossmedins + $scope.npna *1);
	console.log($scope.grossmedins);
	console.log($scope.inctosnf);
}

}
})();