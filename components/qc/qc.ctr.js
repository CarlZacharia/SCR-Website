var qc = angular.module('authApp');
qc.controller('qcController', ['$scope', '$http',  '$location', function($scope, $http, $location) {

$scope.MANOS = [];
$scope.status;
$scope.ishurly = false;
$scope.csley = 0;
$scope.cslem = 0;
$scope.csrmd = 0;
$scope.csage = 0;
$scope.cssex = "";
$scope.csra = 0;
$scope.csira = 0;
$scope.isinc = 0;
$scope.csinc = 0;
$scope.medins = 0;
$scope.rent = 0;
$scope.retaxesmuni = 0;
$scope.retaxescounty = 0;
$scope.retaxessd = 0;
$scope.hoins = 0;
$scope.condofees = 0;
$scope.utils = "";
$scope.sua = 0;
$scope.isinctocs = 0;
$scope.isinctosnf = 0;
$scope.getle = function() {

    if($scope.cssex && $scope.csage){
        var data = {
            age: $scope.csage,
            sex: $scope.cssex
          }
          $http.post("php/getle.php", data).success(function(data, status) {
      $scope.csley = parseFloat(data[0].le);
      console.log($scope.csage);
      console.log(data[0]);
      $scope.cslem = parseInt($scope.csley / 12);
      $scope.getrmd();
})
        }
      }

var d = new Date();
      var y = d.getFullYear();
      var m = "first";
      var mm = d.getMonth();
      if(mm <= 5){m = "first"}
        else{m = "second"}
         $http.get('php/getmanos.php?year='+y+'&yearhalf="'+m+'"').success(function(data, status) {
         $scope.MANOS = data[0];
         });

$scope.getrmd = function() {
      if($scope.csage > 69 ) {
    var a = $scope.csage;
    $http.get('php/getrmd.php?age='+a).success(function(res) {
      $scope.csrmd = parseFloat(res[0].le);
    });
    $scope.calcexps();
}
}

$scope.calcexps = function(x) {
var d = new Date();
	var y = d.getFullYear();
	var m = "first";
	var mm = d.getMonth();
	if(mm <= 5){m = "first"}
		else(m = "second");


   var d = new Date();
      var y = d.getFullYear();
      var m = "first";
      var mm = d.getMonth();
      if(mm <= 5){m = "first"}
        else{m = "second"}
           var data = { year : y, yearhalf: m };

     $http.post("php/getmanos.php", data).success(function(datax, status) {
      $scope.MANOS = datax[0];



var tm = 0; //Total Medical Ins
var ts = 0; //total Shelters

var ss = $scope.MANOS;
var x = $scope.utils;
if(x == 'heat'){$scope.sua = ss.heat *1 }
else if(x == 'noheat'){$scope.sua = ss.noheat *1 }
else if(x == 'phoneonly'){$scope.sua = ss.phoneonly *1 }		
else{$scope.sua = 0};
ts = $scope.rent *1 + $scope.retaxesmuni *1 + $scope.retaxescounty *1 + $scope.retaxessd *1 + $scope.condofees *1 + $scope.hoins *1 + $scope.sua *1;
if($scope.partb == 0){$scope.partb = ss.partb *1}
var m = ss.minmmna *1;
$scope.overmaxmmna = 0;
$scope.mmna = m *1 + (ts *1 - ss.shelterstd *1);
if($scope.mmna > ss.maxmmna){$scope.overmaxmmna = $scope.mmna - ss.maxmmna *1};
var sstd = ss.shelterstd *1;
$scope.totalshelters = ts;
$scope.shelterstd = sstd;
$scope.excessshelters = ts *1 - sstd *1;
if($scope.excessshelters *1 < 0){$scope.excessshelters = 0};
if($scope.mmna *1 < $scope.MANOS.minmmna){$scope.mmna = $scope.MANOS.minmmna};
var a = $scope.isinc *1;
var b = $scope.MANOS.pna *1;
var c = $scope.medins *1;
var d = a - ( b + c);
if(d < 0){d = 0};
$scope.isincavail = d;
calcCSincome();
     });
}

function calcCSincome() {
var c = $scope.csra * .015 / 12;
$scope.incfromcsra = c;
var ir = $scope.csira;
var rmd = $scope.csrmd *1;
var ifi = ir / rmd / 12;
if(ir == 0 || rmd == 0){ifi = 0};
$scope.incfromira = ifi;
var gross = $scope.csinc *1 + $scope.incfromcsra *1 + $scope.incfromira *1;
$scope.csgrossinc = gross;
var mmna = $scope.mmna *1;
var csgi = $scope.csgrossinc *1;
var isa = $scope.isincavail *1;
var combinc = csgi *1 + isa *1;
$scope.mmna = mmna;
if(csgi > mmna)
{
$scope.isinctosnf = isa;
$scope.isinctocs = 0;
}
else if(csgi < mmna)
  {
$scope.isinctocs = mmna *1 - csgi *1;
$scope.isinctosnf = isa - $scope.isinctocs *1;
}
if($scope.isinctosnf *1 < 0){    
    $scope.ishurly = true;
    $scope.monthlyshortfall = Number(csgi) + Number($scope.isincavail) - Number(mmna); 
      $scope.irate = .015;
      var bott = Number(.015/12);
      var t1 = 1 + Number(bott);
      var cm = $scope.csley *12;
      var t2 = Math.pow(t1, Number(cm));
      var t3 = 1 - t2 *1;
      var h = Number(t3) / Number(bott);
      console.log(bott + " " + t1 + " " + cm + " "+ t2 + " " + t3 + " "+ h);
      var pv = $scope.monthlyshortfall * h;
      $scope.hurlyamt = pv *-1;
  }
}

$scope.goback = function() {
    $location.path("/main/");
}

    $scope.getManos = function (y, m) {
   
    };
}]);


