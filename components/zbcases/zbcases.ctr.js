var qc = angular.module('authApp');
qc.controller('zbcasesController', ['$scope', '$http',  '$location', '$mdDialog',  function($scope, $http, $location, $mdDialog) {

$scope.snfs = [];
$scope.prospectcases = [];
$scope.prospectcasescount = 0;
$scope.probatecases = [];
$scope.probatecasescount = 0;
$scope.elmcases = [];
$scope.elmcasescount = 0;
$scope.elscases = [];
$scope.elscasescount = 0;
$scope.statuses = ["", "Prospect", "Active", "Inactive", "Closed", "Not Retained"];
$scope.attys = ["", "CBZ", "CBM", "CDB", "JTE", "TAM", "CEC", "BWU", "DTR"];
$scope.offices = ["", "McMurray", "McKeesport", "Wexford", "Greensburg", "Bradenton"];
$scope.casetypes = ["", "Elder Law Single Application", "Elder Law Married Application", "Elder Law Single Planning", "Elder Law Married Planning", "LCP Married", "LCP Single", "Probate Pennsylvania", "Probate Florida", "Estate Planning Pennsylvania", "Estate Planning Florida", "Guardianship", "Litigation", "Other"];
$scope.assts = ["", "CC", "RB", "MI", "CM", "HW", "KK", "MK", "PM", "RV", "MT"];
$scope.showaddnew = false;
$scope.caseexists = false;  //On Save, checks to see if the case already exists
$scope.zbcasedata = {};
$scope.manos = {};


$scope.isLevel1 = function(ec) {
    return ec.status_level === "1";
};
$scope.isLevel2 = function(ec) {
    return ec.status_level === "2";
};
$scope.isLevel3 = function(ec) {
    return ec.status_level === "3";
};
$scope.isLevel4 = function(ec) {
    return ec.status_level === "4";
};
$scope.isLevel5 = function(ec) {
    return ec.status_level === "5";
};
$scope.isLevel6 = function(ec) {
    return ec.status_level === "6";
};
$scope.isLevel7 = function(ec) {
    return ec.status_level === "7";
};
$scope.isLevel8 = function(ec) {
    return ec.status_level >= "8";
};


  var a = JSON.parse(localStorage.getItem("profile"))
  var tu = a.user_metadata.inits;
  $scope.zbuser = tu;
  var ucat = a.user_metadata.userCat;
  $scope.ucat = ucat;



function getallzbcases() {
if(ucat == 'atty') {
var data = {atty: tu, ct: 'Prospects'}
    $http.post("php/zb/getallcases.php", data).success(function(data, status) {
        $scope.prospectcases = data;
        $scope.prospectcasescount = $scope.prospectcases.length;
    });

var data = {atty: tu, ct: 'Probate'}
    $http.post("php/zb/getallcases.php", data).success(function(data, status) {
        $scope.probatecases = data;
        $scope.probatecasescount = $scope.probatecases.length;
    });
var data = {atty: tu, ct: 'ELM'}
    $http.post("php/zb/getallcases.php", data).success(function(data, status) {
        $scope.elmcases = data;
        $scope.elmcasescount = $scope.elmcases.length;
    });
var data = {atty: tu, ct: 'ELS'}
    $http.post("php/zb/getallcases.php", data).success(function(data, status) {
        $scope.elscases = data;
        $scope.elscasescount = $scope.elscases.length;
    });
var data = {atty: tu, ct: 'EP'}
    $http.post("php/zb/getallcases.php", data).success(function(data, status) {
        $scope.epcases = data;
        $scope.epcasescount = $scope.epcases.length;
    });    
}
else {
  var data = {asst: tu, ct: 'Prospects'}
    $http.post("php/zb/getallcases.php", data).success(function(data, status) {
        $scope.prospectcases = data;
        $scope.prospectcasescount = $scope.prospectcases.length;
    });

var data = {asst: tu, ct: 'Probate'}
    $http.post("php/zb/getallcasescw.php", data).success(function(data, status) {
        $scope.probatecases = data;
        $scope.probatecasescount = $scope.probatecases.length;
    });
var data = {asst: tu, ct: 'ELM'}
    $http.post("php/zb/getallcasescw.php", data).success(function(data, status) {
        $scope.elmcases = data;
        $scope.elmcasescount = $scope.elmcases.length;
    });
var data = {asst: tu, ct: 'ELS'}
    $http.post("php/zb/getallcasescw.php", data).success(function(data, status) {
        $scope.elscases = data;
        $scope.elscasescount = $scope.elscases.length;
    });
var data = {asst: tu, ct: 'EP'}
    $http.post("php/zb/getallcasescw.php", data).success(function(data, status) {
        $scope.epcases = data;
        $scope.epcasescount = $scope.epcases.length;
    });    
}
};

getallzbcases();

  $scope.clearnewcases = function() {

    $scope.actions = [];
    $scope.zbcases = [];
    delete $scope.zbcase;
    $scope.casecount = 0;
   
  };



$scope.clearnewcase = function() {
$scope.zbnewcase = {};

}

$scope.findzbcase = function() {
    var f = $scope.findcase;
    var r = $scope.caseid;
    if(f.length > 2)
    {
        var data = { lname : f };

       $http.post("php/zb/zb_findacase.php", data).success(function(data, status) {
                $scope.zbcases = data;

            })
    }
  }

$scope.savenewcasecheck = function() {

  var cf = $scope.zbnewcase.cfname;
  var cl = $scope.zbnewcase.clname;
  var ct = $scope.zbnewcase.casetype;
  var continueproc = true;
   $http.post("php/zb/getcasescheck.php").success(function(data, status) {
        for(var i = 0; i < data.length; i++ ) {
          if(data[i].cfname == cf && data[i].clname == cl && data[i].casetype == ct)
          {
          $scope.caseexists = data[i];
          continueproc = false;
          alert("ALERT!  Possible Duplicate Case!");
          }
        }

        if(continueproc == true) {
        $scope.savecase();
        }
        })
}

$scope.abortsave = function() {
$scope.zbnewcase = {};
$scope.caseexists = false;
};




$scope.savecase = function() {
 var a = JSON.parse(localStorage.getItem("profile"))
  var tu = a.user_metadata.inits;
  $scope.zbnewcase.enteredby = tu;

        var t = "";
        var v = $scope.zbnewcase.casetype;

        if(v == 'Elder Law Single Application' ) {
          t = "ELApp";
        }
        if(v == 'Elder Law Married Application') {
          t = "ELApp";
        }        
        else if(v == 'Elder Law Single Planning') {
          t = "ELPlan";
        }
        else if(v == 'Elder Law Married Planning') {
          t = "ELPlan";
        }        
        else if(v == 'Estate Planning Pennsylvania') {
          t = "EPPa";
        }
        else if(v == 'Estate Planning Florida') {
          t = "EPFla";
        }
        else if(v == 'Probate Pennsylvania') {
          t = "ProbatePa";
        }
        else if(v == 'Probate Florida') {
          t = "ProbateFla";
        }
        else {
          t = "Other";
        }           
$scope.zbnewcase.case_cat = t;

  $http.post("php/zb/zb_addnewcase.php", $scope.zbnewcase);
  $scope.selectedTab = 0;
  getallzbcases();
};



$scope.getzbcase = function(ec){
 $scope.selectedTab = 1;

 if(ec.datemodified){
     var x = new Date(ec.datemodified);
      ec.datemodified = x;    
 }
 else {
  ec.datemodified = "";
 }
 if(ec.datecreated){
     var x = new Date(ec.datecreated);
      ec.datecreated = x;    
 }
 else {
  ec.datecreated = "";
 }
 if(ec.facilityadmitdate){
     var x = new Date(ec.facilityadmitdate);
      ec.facilityadmitdate = x;    
 }
 else {
  ec.facilityadmitdate = "";
 }

 if(ec.isdob){
     var x = new Date(ec.isdob);
      ec.isdob = x;    
 }
 else {  
  ec.isdob = "";
 }

 if(ec.csdob){
     var x = new Date(ec.csdob);
      ec.csdob = x;    
 }
 else {
  ec.csdob = "";
 }
  if(ec.facilityadmitdate){
     var x = new Date(ec.facilityadmitdate);
      ec.facilityadmitdate = x;    
 }
 else {  
  ec.facilityadmitdate = "";
 }

 if(ec.isage){
  ec.isage = ec.isage *1;
 }

if(ec.csage){
  ec.csage = ec.csage *1;
 }
    $scope.zbcase = ec;

    //GET NOTES

    var dc = parseInt(ec.caseid);
    var datax = {fcaseid: dc};
 
    $http.post("php/zb/getnotes.php", datax).success(function(data, status) {

    for(var i = 0; i < data.length; i++) {
      data[i].datecreated = new Date(data[i].datecreated)
    }
  $scope.actions = data;
});
  
}

  $scope.updnextaction = function(f, v, cid) {
    var data = {field: f, value: v, cid: cid};
   $http.post("php/zb/zb_updatecasedata.php", data);
 }

  $scope.updcasedata = function(f, v) {
    var cid = $scope.zbcase.caseid;
    if(v instanceof Date && f != 'dob') {v = v.toString()}
    var data = {field: f, value: v, cid: cid};
   $http.post("php/zb/zb_updatecasedata.php", data).success(function(data, status) {
            });
      if(f == 'casetype'){
        var t = "";
        if(v == 'Elder Law Single Application' || v == 'Elder Law Married Application') {
          t = "ELApp";
        }
        else if(v == 'Elder Law Single Planning' || v == 'Elder Law Married Planning') {
          t = "ELPlan";
        }
        else if(v == 'Estate Planning Pennsylvania') {
          t = "EPPa";
        }
        else if(v == 'Estate Planning Florida') {
          t = "EPFla";
        }
        else if(v == 'Probate Pennsylvania') {
          t = "ProbatePa";
        }
        else if(v == 'Probate Florida') {
          t = "ProbateFla";
        }
        else {
          t = "Other";
        }           
      }
          var data = {field: 'case_cat', value: t, cid: cid};
          $http.post("php/zb/zb_updatecasedata.php", data);
          getallzbcases();
  }



$scope.addnewnote = function() {
  $scope.showaddnew = true;
}

$scope.addnotedata = function(f, v) {
    var cid = $scope.zbcase.caseid;
    var user = $scope.zbuser;
    var data = {field: f, value: v, modifiedby: user, fcid: cid};

   $http.post("php/zb/zb_addnote.php", data).success(function(data, status) {
$scope.getactions();
            });
    $scope.showaddnew = false;


}

$scope.updactdata = function(v, id) {
    var id = id;
    var value = v;
    var data = {value: v, id: id};

   $http.post("php/zb/zb_updnote.php", data).success(function(data, status) {
$scope.getactions();
            });

}


$scope.getactions = function() {
  var dc = parseInt($scope.zbcase.caseid);
  var datax = {fcaseid: dc};  
  $http.post("php/zb/getnotes.php", datax).success(function(data, status) {

    for(var i = 0; i < data.length; i++) {
      data[i].datecreated = new Date(data[i].datecreated)
    }
  $scope.actions = data;
});
}

$scope.findasnf = function(ev) {
 $mdDialog.show({
        controller: 'snfsController',
        templateUrl: 'components/zbcases/snfsdialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        bindToConroller: true,
        locals: {zbcase: $scope.zbcase},
        clickOutsideToClose:true
      })
}

$scope.findasnfnew = function(ev) {
 $mdDialog.show({
        controller: 'snfsNewController',
        templateUrl: 'components/zbcases/snfsdialognew.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        bindToConroller: true,
        locals: {zbnewcase: $scope.zbnewcase},
        clickOutsideToClose:true
      })
} 


$scope.popsnf = function (snf){
  console.log(snf);
}


$scope.clientisselfedit = function() {
 var cs = $scope.zbcase.clientself;
 console.log(cs);
 if(cs == true){
  $scope.zbcase.fname = $scope.zbcase.cfname;
  $scope.zbcase.lname = $scope.zbcase.clname;
  $scope.zbcase.address = $scope.zbcase.caddress;
  $scope.zbcase.csz = $scope.zbcase.ccsz;
  $scope.zbcase.state = $scope.zbcase.cstate;
  $scope.zbcase.zip = $scope.zbcase.czip; 
  $scope.zbcase.relation = 'Self';         
 }
}

$scope.clientisself = function() {
 var cs = $scope.clientself;
 var xid = $scope.zbnewcase.caseid;
 if(cs == true){
  $scope.zbnewcase.fname = $scope.zbnewcase.cfname;
  $scope.zbnewcase.lname = $scope.zbnewcase.clname;
  $scope.zbnewcase.address = $scope.zbnewcase.caddress;
  $scope.zbnewcase.csz = $scope.zbnewcase.ccsz;
  $scope.zbnewcase.state = $scope.zbnewcase.cstate;
  $scope.zbnewcase.zip = $scope.zbnewcase.czip; 
  $scope.zbnewcase.relation = 'Self';   
  $scope.updcasedata('cfname', $scope.zbnewcase.cfname, xid);
  $scope.updcasedata('clname', $scope.zbnewcase.clname, xid);
  $scope.updcasedata('caddress', $scope.zbnewcase.caddress, xid);
  $scope.updcasedata('ccsz', $scope.zbnewcase.ccsz, xid);
  $scope.updcasedata('cstate', $scope.zbnewcase.cstate, xid);
  $scope.updcasedata('czip', $scope.zbnewcase.czip, xid);          
 }
}


$scope.getGiftingSheet = function() {
  $http.get("php/sheets/gifting.php");
}


$scope.calcisagenew = function() {
  var bd = new Date($scope.zbnewcase.isdob);
  var t = moment();
  $scope.zbnewcase.isage = parseInt(t.diff(bd, 'years'));  

}

$scope.calccsagenew = function() {
   var bd = new Date($scope.zbnewcase.csdob);
  var t = moment();
  $scope.zbnewcase.csage = parseInt(t.diff(bd, 'years'));  
}
$scope.calcisage = function() {
  var bd = new Date($scope.zbcase.isdob);
  var t = moment();
  $scope.zbcase.isage = parseInt(t.diff(bd, 'years'));  
}

$scope.calccsage = function() {
   var bd = new Date($scope.zbcase.csdob);
  var t = moment();
  $scope.zbcase.csage = parseInt(t.diff(bd, 'years'));  
}

$scope.getcasedata = function() {
  var dc = parseInt($scope.zbcase.caseid);
  var fcid = {fcaseid: dc};
  var cased = $http.post("php/zb/zb_getcasedata.php", fcid).success(function(data, status) {
    if(data.length < 2){
    var dc = parseInt($scope.zbcase.caseid);
    var fcid = {fcaseid: dc, ct: $scope.zbcase.casetype};
      $http.post("php/zb/zb_addcasedata.php", fcid).success(function(datax, status) {
        $scope.zbcasedata = datax;
      });
    }
    else {
      $scope.zbcasedata = data;
    }
      });
  if($scope.zbcase.facilityadmitdate){
  var yr = new Date($scope.zbcase.facilityadmitdate).getFullYear();
  var mon = new Date($scope.zbcase.facilityadmitdate).getMonth();
  if(mon <6){var yh = 'first'}
    else {var yh = 'second'};
    var yyh = {year: yr.toString(), yearhalf: yh};
      $http.post("php/getmanos.php", yyh).success(function(manos, status) {
      $scope.zbcasedata.manos = manos[0];
    })
    }
   else {$scope.manos = ""}; 
    if($scope.zbcase.csage){
 var data = {
            age: $scope.zbcase.csage,
            sex: $scope.zbcase.cssex
          }
          $http.post("php/getle.php", data).success(function(data, status) {
              $scope.zbcasedata.csle = data[0].le;
          });
      $http.post("php/getrmdj.php", data).success(function(data, status) {
              $scope.zbcasedata.csrmd = data[0].le;
          })          
      }  


console.log($scope.manos);


}


}]);









angular.module('authApp')
.controller('snfsController', function ($scope, $mdDialog, $http, zbcase) {
$http.get("php/zb/getsnfs.php").success(function(data, status) {
    $scope.snfs = data;
});


$scope.getasnf = function(snf){
console.log(snf);
      console.log(zbcase);
      zbcase.facility = snf.name;
      $mdDialog.hide();    
      updcasedata('facility', snf.name, zbcase.caseid);  
}


  });


angular.module('authApp')
.controller('snfsNewController', function ($scope, $mdDialog, $http, zbnewcase) {
$http.get("php/zb/getsnfs.php").success(function(data, status) {
    $scope.snfs = data;
});



$scope.getasnfnew = function(snf){
      zbnewcase.facility = snf.name;
      $mdDialog.hide();      
}

  });