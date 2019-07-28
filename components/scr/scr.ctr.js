      var qc = angular.module('authApp');
  qc.controller('scrController', ['$scope', '$http',  '$location', '$mdDialog', 'fileUpload', 'todosService', '$timeout', function($scope, $http, $location, $mdDialog, fileUpload, todosService, $timeout) {

  $scope.cases = [];
  $scope.cws = [];
  $scope.exts = ["", "Sr", "Jr", "II", "III", "IV", "V", "VI"];
  $scope.scrsnfs = [{"name": "Kane McKeesport", "provider_id": "395640"}, {"name": "Kane Glen Hazel", "provider_id": "395643"}, {"name": "Kane Ross", "provider_id": "395606"}, {"name": "Kane Scott", "provider_id": "395617"}, {"name": "Southwestern", "provider_id": "395742"}]
  $scope.statuslevels = [{"statuslevel": "New Case not filed", "sl": 1}, {"statuslevel": "Submitted", "sl": 2}, {"statuslevel": "Pending", "sl": 3}, {"statuslevel": "Initial Determination", "sl": 4}, {"statuslevel": "Post Determination", "sl": 5}]
  $scope.cases = [];
  $scope.listcases = [];
  $scope.cal;
  $scope.todos = [];
$scope.dtypes = ["Application", "Medins", "Cards", "Income", "IBR",  "Banks", "Investments", "Vehicles", "Life Ins.", "Realty", "CAODocs", "Shelters", "POAs", "ZBDocs", "Other"];

$scope.docs = [];
$scope.appdocs = [];
$scope.medinsdocs = [];
$scope.cardsdocs = [];
$scope.incomedocs = [];
$scope.ibrdocs = [];
$scope.banksdocs = [];
$scope.investmentsdocs = [];
$scope.lifeinsdocs = [];
$scope.vehiclesdocs = [];
$scope.realtydocs = [];
$scope.caodocs = [];
$scope.sheltersdocs = [];
$scope.poasdocs = [];
$scope.zbdocs = [];
$scope.otherdocs = [];

  var a = JSON.parse(localStorage.getItem("profile"))
  var tu = a.inits;
  $scope.tempuser = tu;



  $scope.uploadFile = function(){
    console.log($scope.case.myFile.name);
        var file = $scope.case.myFile;
        var cid = $scope.case.resident_id;

        var uploadUrl = "php/storedocs.php";
//        var text = $scope.name;
        fileUpload.uploadFileToUrl(file, uploadUrl, cid);
        $scope.adduploaddoc(cid);
   };



$scope.adduploaddoc = function(cid) {
  if(!cid){
    cid = $scope.case.resident_id;
  }

  var datax = { 
    cid: cid,
    dtype: $scope.case.dtype,
    uploadedby: $scope.tempuser,
    comments: $scope.case.comments,
    filename: $scope.case.myFile.name
  };
   $http.post("php/adduploaddoc.php", datax).success(function(data, status) {
  
   });
   console.log($scope.case.myFile);
   $scope.case.myFile.name = "";
   $scope.case.dtype = "";
   $scope.case.comments = "";
   $scope.processing = true;
    $timeout(function(){
   $scope.getuploads();
    }, 3000);
    $scope.processing = false;
}

$scope.getuploads = function() {
$scope.case.myFile = "";
$scope.docs = [];
$scope.appdocs = [];
$scope.medinsdocs = [];
$scope.cardsdocs = [];
$scope.incomedocs = [];
$scope.ibrdocs = [];
$scope.banksdocs = [];
$scope.investmentsdocs = [];
$scope.lifeinsdocs = [];
$scope.vehiclesdocs = [];
$scope.realtydocs = [];
$scope.caodocs = [];
$scope.sheltersdocs = [];
$scope.poasdocs = [];
$scope.zbdocs = [];
$scope.otherdocs = [];
  var cid = $scope.case.resident_id;
  var datac = {cid: cid};
   $http.post("php/getdownloaddocs.php", datac).success(function(data, status) {
     $scope.docs = data;
    for(var i = 0; i < data.length; i++){
      if(data[i].dtype == 'Application'){
        $scope.appdocs.push(data[i]);
      }
      else if (data[i].dtype == 'Medins'){
        $scope.medinsdocs.push(data[i]);
      }
      else if (data[i].dtype == 'Cards'){
        $scope.cardsdocs.push(data[i]);
      }      
      else if (data[i].dtype == 'Income'){
        $scope.incomedocs.push(data[i]);
      }
      else if (data[i].dtype == 'IBR'){
        $scope.ibrdocs.push(data[i]);
      }
      else if (data[i].dtype == 'Banks'){
        $scope.banksdocs.push(data[i]);
      }
      else if (data[i].dtype == 'Investments'){
        $scope.investmentsdocs.push(data[i]);
      }      
      else if (data[i].dtype == 'Vehicles'){
        $scope.vehiclesdocs.push(data[i]);
      }
      else if (data[i].dtype == 'Life Ins.'){
        $scope.lifeinsdocs.push(data[i]);
      }
      else if (data[i].dtype == 'Realty'){
        $scope.realtydocs.push(data[i]);
      }
      else if (data[i].dtype == 'CAODocs'){
        $scope.caodocs.push(data[i]);
      }
      else if (data[i].dtype == 'Shelters'){
        $scope.sheltersdocs.push(data[i]);
      }      
      else if (data[i].dtype == 'POAs'){
        $scope.poasdocs.push(data[i]);
      }
      else if (data[i].dtype == 'ZBDocs'){
        $scope.zbdocs.push(data[i]);
      }
      else{
        $scope.otherdocs.push(data[i]);
      }      
    }
   
   });
}

//ADD NEW CASE


//END ADD NEW CASE

//Save Client Data from Add Form
$scope.saveclientdata = function() {
var data = {
            first_name: $scope.dcase.first_name,
            middle_name: $scope.dcase.middle_name,
            last_name: $scope.dcase.last_name,
            ssn: $scope.dcase.ssn,
            dob: $scope.dcase.dob,
            res_age: $scope.dcase.res_age,
            snfname: $scope.selectedsnf,
            admit_date: $scope.dcase.admit_date.toString(),
            date_assigned: $scope.dcase.date_assigned.toString(),
            current_status: $scope.dcase.current_status,
            caseworker: $scope.cwsi,
            caseworker_cao: $scope.dcase.caseworker_cao,
            plan: $scope.dcase.plan,
            issues: $scope.dcase.issues,
            contact_poa: $scope.dcase.contact_poa,
            contact_relation: $scope.dcase.contact_relation,
            contact_address: $scope.dcase.contact_address,
            contact_csz: $scope.dcase.contact_csz,
            contact_phone: $scope.dcase.contact_phone,
            contact_email: $scope.dcase.contact_email,
            resident_id: $scope.dcase.resident_id
              };

console.log(data);
   $http.post("php/scr/scr_saveclientdata.php", data).success(function(data, status) {
    console.log(data);
    $scope.hide();
   });

}

//End Save new Client


  $scope.catcases = function() {
    $scope.actions = [];
    $scope.cases = [];
    delete $scope.case;
    $scope.casecount = 0;
    $scope.listcases = [];
    $scope.allcases = [];
  var userd = JSON.parse(localStorage.getItem("profile"));
  var user = userd.inits.toString();
  var tempuser = $scope.tempuser;

    var data = {
              caseworker: tempuser
                };

      $http.post("php/scr/scr_getcatcases.php", data).success(function(data, status) {
          $scope.cases = data;
      $scope.casescount = $scope.cases.length;  

    $scope.newcases = [];
    $scope.filedcases = [];
    $scope.pendingcases = [];
    $scope.appealledcases = [];
    $scope.rejectedcases = [];
    $scope.approvedcases = [];
    $scope.problemcases = [];
    $scope.penaltycases = [];
    $scope.withdrawncases = [];
    $scope.allcases = data;
    for(var i =0; i < $scope.cases.length; i++){
    var c = $scope.cases[i].current_status;

            switch(c) {

              case "New Case":
              $scope.cases[i].date_assigned = new Date($scope.cases[i].date_assigned);
                $scope.newcases.push($scope.cases[i]);
              if($scope.cases[i].problem == "Yes") {
                $scope.problemcases.push($scope.cases[i]);
              }             
              break;
              case "Signed and Submitted":
                $scope.filedcases.push($scope.cases[i]);
              if($scope.cases[i].problem == "Yes") {
                $scope.problemcases.push($scope.cases[i]);
              }
              break;
              case "Pending":
                $scope.pendingcases.push($scope.cases[i]);
              if($scope.cases[i].problem == "Yes") {
                $scope.problemcases.push($scope.cases[i]);
              }
              break;
              case "Rejected":
                $scope.rejectedcases.push($scope.cases[i]);
              if($scope.cases[i].problem == "Yes") {
                $scope.problemcases.push($scope.cases[i]);
              }
              break;
              case "Appealed":
                $scope.appealedcases.push($scope.cases[i]);
              if($scope.cases[i].problem == "Yes") {
                $scope.problemcases.push($scope.cases[i]);
              }
              break;  
              case "Approved":
                $scope.approvedcases.push($scope.cases[i]);
              if($scope.cases[i].problem == "Yes") {
                $scope.problemcases.push($scope.cases[i]);
              }
              break;        
              case "Withdrawn":
                $scope.withdrawncases.push($scope.cases[i]);
              if($scope.cases[i].problem == "Yes") {
                $scope.problemcases.push($scope.cases[i]);
              }
              break;        
              case "Penalty":
                $scope.penaltycases.push($scope.cases[i]);
              if($scope.cases[i].problem == "Yes") {
                $scope.problemcases.push($scope.cases[i]);
              }
              break;                                            
            }
    }
    $scope.listcases = $scope.newcases;
    $scope.listtype = 'New Cases';
    })
  };


  $scope.catcases();

   $http.get('php/scr/scr_getcws.php').success(function(res) {
        $scope.cws = res;
        $scope.snfname = "All";
        $scope.slmodel = "1";
      });

    $scope.getlistcases = function(cw, fac, sl) {
      console.log("CW " + cw);
      $scope.cases = [];
          var data = {
              facility: fac,
              statuslevel : sl
            }
            sl = Number(sl);
            switch(sl) {
              case 1:
              $scope.caselevel = "New Cases - Unfiled";
              break;
          case 2:
              $scope.caselevel = "Submitted";
          break;
          case 3:
              $scope.caselevel = "Pending";
          break;
          case 4:
              $scope.caselevel = "Initial Determined";
          break;
          case 5:
              $scope.caselevel = "Post Determined";
          break;

            }
        

            $http.post("php/scr/scr_getcases.php", data).success(function(data, status) {
                $scope.listcases = data;
                $scope.listcasescount = $scope.listcases.length;
            });
    }

  $scope.findacase = function() {
    var f = $scope.findcase;
    var r = $scope.resident_id;
    if(f.length > 2)
    {
        var data = { last_name : f };

       $http.post("php/scr/scr_findacase.php", data).success(function(data, status) {
                $scope.listcases = data;
                $scope.listcasescount = $scope.listcases.length;
            })
       var dataa = {resident_id : r };
       $http.post("php/scr/scr_getactions.php", dataa).success(function(data, status) {
                $scope.actions = data;
            })     
    }
  }


  $scope.getcase = function(cid) {

       var data = {
              cid: cid
            }
     $http.post('php/scr/scr_getcase.php', data).success(function(res) {
        $scope.case = res[0];
        $scope.case.admit_date = new Date(res[0].admit_date);
        $scope.momentadmitdate = moment($scope.case.admit_date).format('MM/DD/YYYY');      
        $scope.momentdateassigned = moment(res[0].date_assigned).format('MM/DD/YYYY');
        $scope.momentdateappfiled = moment(res[0].date_appfiled).format('MM/DD/YYYY'); 
        $scope.momentdatepending = moment(res[0].date_pending).format('MM/DD/YYYY'); 

        $scope.momentdateappealled = moment(res[0].date_appealled).format('MM/DD/YYYY'); 
        $scope.momentdaterejected = moment(res[0].date_rejected).format('MM/DD/YYYY');         
        $scope.momentdateapproved = moment(res[0].approved_date).format('MM/DD/YYYY');   
        $scope.momentdatehearing = moment(res[0].date_hearing).format('MM/DD/YYYY');   
        $scope.momentdatefinal = moment(res[0].date_final).format('MM/DD/YYYY');     
        $scope.case.problem = res[0].problem;

        var da = moment($scope.case.admit_date);
        var dass = moment($scope.case.date_assigned);
        var td = moment();
        var da_diff = td.diff(da, 'days');
        var dass_diff = dass.diff(da, 'days');
        $scope.mad = da_diff;
        $scope.madss = dass_diff;


     var dataa = {cid: cid };
       $http.post("php/scr/scr_getactions.php", dataa).success(function(data, status) {
              $scope.actions = data;
            })     
  });
  };

  $scope.clearnewcases = function() {
    $scope.actions = [];
    $scope.cases = [];
    delete $scope.case;
    $scope.casecount = 0;
   
  };

  $scope.updissuesplan = function(plan, iss, cid) {

    var data = {plan: plan, issues: iss, cid: cid};
   $http.post("php/scr/scr_updplanissues.php", data).success(function(data, status) {
    console.log("Success");
            })
  }

 
  $scope.addanote = function() {

if($scope.case.noteadd.length > 3){
    var now = new Date();
    var yyyy = now.getFullYear().toString();
    var mm = (now.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = now.getDate().toString();
    var nowx = yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]);
    var nowt = (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]) + "-" + yyyy;
    var notedata = nowt + " - " + $scope.case.noteadd;
    var data = { note: notedata,  cid: Number($scope.case.resident_id), nowx: nowx};
    var cid =  $scope.case.resident_id;


   var req = $http({
          method: "post",
          url: "php/scr/scr_addanote.php",
          data: {
        note: notedata,  
        cid: cid, 
        nowx: nowx
          },
       headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });
        req.success(function(data, status, headers, config)
        {
          $scope.actions = [];
     var dataa = {cid:  $scope.case.resident_id};
       $http.post("php/scr/scr_getactions.php", dataa).success(function(data, status) {
              $scope.actions = data;
                 $scope.noteadd = "";
            });   
        })
        .error(function(data, status, headers, config)
        {
          console.log('error');
        }); 

  $scope.case.noteadd = "";
}

      }


  $scope.cal = function() {
    var url = "https://www.googleapis.com/calendar/v3/calendars/primary/events?key=AIzaSyBz5_UG3W0v9-OQad5VKaSpqUXIU56DOcY";
  $http.get(url).success(function(data, status) {
    console.log(data);
            })
  }

  $scope.shownew = function() {
    delete $scope.case;
    $scope.casecount = 0;
    $scope.listtype = "New Cases";
    $scope.listcases = [];
    $scope.listcases = $scope.newcases;
  }
  $scope.showfiled = function() {
    delete $scope.case;
    $scope.casecount = 0;
    $scope.listtype = "Filed Cases";
    $scope.listcases = [];
    $scope.listcases = $scope.filedcases;
  }

  $scope.showpending = function() {
    delete $scope.case;
    $scope.casecount = 0;
    $scope.listtype = "Pending Rec'd";
    $scope.listcases = [];
    $scope.listcases = $scope.pendingcases;
  }
    $scope.showwithdrawn = function() {
    $scope.actions = [];
    delete $scope.case;
    $scope.casecount = 0;
    $scope.listtype = "Withdrawn";
    $scope.listcases = [];
    $scope.listcases = $scope.withdrawncases;
  }
  $scope.showrejected = function() {
    $scope.actions = [];
    delete $scope.case;
    $scope.casecount = 0;
    $scope.listtype = "Rejected";
    $scope.listcases = [];
    $scope.listcases = $scope.rejectedcases;
  }
  $scope.showapproved = function() {
    delete $scope.case;
    $scope.casecount = 0;
    $scope.listtype = "Approved";
    $scope.listcases = [];
    $scope.listcases = $scope.approvedcases;
  }
  $scope.showappealled = function() {
    delete $scope.case;
    $scope.casecount = 0;
    $scope.listtype = "Appealled";
    $scope.listcases = [];
    $scope.listcases = $scope.appealledcases;
  }
  $scope.showproblem = function() {
    delete $scope.case;
    $scope.casecount = 0;
    $scope.listtype = "Problem";
    $scope.listcases = [];
    $scope.listcases = $scope.problemcases;
  }
  $scope.showpenalty = function() {
    delete $scope.case;
    $scope.casecount = 0;
    $scope.listtype = "Penalty";
    $scope.listcases = [];
    $scope.listcases = $scope.penaltycases;
  }  
 $scope.showall = function() {
    delete $scope.case;
    $scope.casecount = 0;
    $scope.listtype = "All";
    $scope.listcases = [];
    $scope.listcases = $scope.allcases;
  }

    $scope.cancel = function() {
      $mdDialog.hide();
    };


    $scope.showCatCaseinDialog = function(ev) {
      var cid = this.c.resident_id;
    var data = {
              cid: cid
            }
        $http.post('php/scr/scr_getcase.php', data).success(function(res) {
          $scope.dcase = res[0];
          $scope.dcase.admit_date = new Date(res[0].admit_date);
          $scope.dcase.date_assigned = new Date(res[0].date_assigned);      
          $scope.momentadmitdate = moment(res[0].admit_date).format('MM/DD/YYYY');      
          $scope.momentdateassigned = moment(res[0].date_assigned).format('MM/DD/YYYY');
          $scope.momentdateappfiled = moment(res[0].date_appfiled).format('MM/DD/YYYY'); 
          $scope.momentdatepending = moment(res[0].date_pending).format('MM/DD/YYYY'); 
          $scope.momentdateappealled = moment(res[0].date_appealled).format('MM/DD/YYYY'); 
          $scope.momentdateapproved = moment(res[0].approved_date).format('MM/DD/YYYY');   
          $scope.momentdatehearing = moment(res[0].date_hearing).format('MM/DD/YYYY');   
          $scope.momentdateappapp = moment(res[0].date_appapp).format('MM/DD/YYYY');                
          var intake = moment(res[0].admit_date);
          $scope.dcase.dob = new Date(res[0].dob);
          var bd = moment(res[0].dob)
          var age = intake.diff(bd, 'years');  
          $scope.dcase.res_age = parseInt(age); 
                   
      var da = moment($scope.dcase.admit_date);
      var dass = moment($scope.dcase.date_assigned);
      var td = moment();
      var da_diff = td.diff(da, 'days');
      var dass_diff = dass.diff(da, 'days');
      $scope.mad = da_diff;
      $scope.madss = dass_diff;
        var data = {cid: cid };
        $http.post("php/scr/scr_getactions.php", data).success(function(datax, status) {
                  $scope.dactions = datax;
              })  
var panelAnimation = $mdPanelAnimation
        .targetEvent($event)
        .defaultAnimation('md-panel-animate-fly')
        .closeTo('.show-button');
          $mdDialog.show({
            controller: 'DialogController',
            templateUrl: 'components/scr/clientdialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            animation: panelAnimation,
            locals : {
                dcase : $scope.dcase,
                dactions: $scope.actions,
                dcws: $scope.cws,
                dexts: $scope.exts,
                dsnfs: $scope.scrsnfs
                      },      
            clickOutsideToClose:true
          })
              .then(function() {
                $scope.dcase = $scope.case;
              });   

   });    
  }

  $scope.getcasedata = function(cid) {

    var data = {
              cid: cid
            }
        $http.post('php/scr/scr_getcase.php', data).success(function(res) {
          var today = new Date();
          $scope.case = res[0];
          $scope.case.status_level = parseInt(res[0].status_level);
          $scope.case.admit_date = new Date(res[0].admit_date);
          $scope.momentadmitdate = moment(res[0].admit_date).format('MM/DD/YYYY');
          $scope.case.date_assigned = new Date(res[0].date_assigned); 
          $scope.momentdateassigned = moment(res[0].date_assigned).format('MM/DD/YYYY');
          var drejected = moment(res[0].date_rejected);
          $scope.mdappealdeadline =  new Date(drejected.add(30, 'days'));          
          $scope.case.penaltydays = parseInt(res[0].penaltydays);
if(res[0].date_appfiled != null)
{
    $scope.case.date_appfiled = new Date(res[0].date_appfiled);  
    $scope.momentdateappfiled = moment(res[0].date_appfiled).format('MM/DD/YYYY');            
} else $scope.case.date_appfiled = "";


if(res[0].date_pending != null)
{
    $scope.case.date_pending = new Date(res[0].date_pending);                                
    $scope.momentdatepending = moment(res[0].date_pending).format('MM/DD/YYYY'); 
} else $scope.case.date_pending = "";

if(res[0].admit_date != null)
{
    $scope.case.admit_date = new Date(res[0].admit_date);                                
    $scope.momentadmitdate = moment(res[0].admit_date).format('MM/DD/YYYY'); 
} else $scope.case.admit_date = "";

if(res[0].date_assigned != null)
{
    $scope.case.date_assigned = new Date(res[0].date_assigned);                                
    $scope.momentdateassigned = moment(res[0].date_assigned).format('MM/DD/YYYY'); 
} else $scope.case.date_assigned = "";

if(res[0].eligible_date != null){
    $scope.case.eligible_date = new Date(res[0].eligible_date);                              
    $scope.momenteligible = moment(res[0].eligible_date).format('MM/DD/YYYY');               
} else $scope.case.eligible_date = "";

if(res[0].date_maneed != null)
{
    $scope.case.date_maneed = new Date(res[0].date_maneed);                                
    $scope.momentmaneed = moment(res[0].date_maneed).format('MM/DD/YYYY'); 
} else $scope.case.date_maneed = "";


if(res[0].date_rejected != null)
{
    $scope.case.date_rejected = new Date(res[0].date_rejected);                                
    $scope.momentdaterejected = moment(res[0].date_rejected).format('MM/DD/YYYY'); 
} else $scope.case.date_rejected = "";



if(res[0].date_appealled != null){
    $scope.case.date_appealled = new Date(res[0].date_appealled);                                
    $scope.momentdateappealled = moment(res[0].date_appealled).format('MM/DD/YYYY'); 
} else $scope.case.date_appealled = "";

if(res[0].approved_date != null){
    $scope.case.approved_date = new Date(res[0].approved_date);                              
    $scope.momentdateapproved = moment(res[0].approved_date).format('MM/DD/YYYY');               
} else $scope.case.approved_date = "";

if(res[0].date_hearing != null){
    $scope.case.date_hearing = new Date(res[0].date_hearing);                              
    $scope.momentdatehearing = moment(res[0].date_hearing).format('MM/DD/YYYY');               
} else $scope.case.date_hearing = "";
if(res[0].date_ourresponse != null){
    $scope.case.date_ourresponse = new Date(res[0].date_ourresponse);                              
} else $scope.case.date_hearing = "";
if(res[0].date_caoresponse != null){
    $scope.case.date_caoresponse = new Date(res[0].date_caoresponse);                              
} else $scope.case.date_hearing = "";
if(res[0].date_appapp != null){
    $scope.case.date_appapp = new Date(res[0].date_appapp);                              
    $scope.momentdateappapp = moment(res[0].date_appapp).format('MM/DD/YYYY');               
} else $scope.case.date_appapp = "";

if(res[0].date_withdrawn != null){
    $scope.case.date_withdrawn = new Date(res[0].date_withdrawn);                              
    $scope.momentdatewithdrawn = moment(res[0].date_withdrawn).format('MM/DD/YYYY');               
} else $scope.case.date_withdrawn = "";

if(res[0].date_penalty_start != null){
    $scope.case.date_penalty_start = new Date(res[0].date_penalty_start);                              
    $scope.momentdatepenaltystart = moment(res[0].date_penalty_start).format('MM/DD/YYYY');               
} else $scope.case.date_penalty_start = "";

if(res[0].date_penalty_end != null){
    $scope.case.date_penalty_end = new Date(res[0].date_penalty_end);                              
    $scope.momentdatepenaltyend = moment(res[0].date_penalty_end).format('MM/DD/YYYY');               
} else $scope.case.date_penalty_end = "";

    $scope.momentdatefinal = moment(res[0].date_final).format('MM/DD/YYYY');                
          var intake = moment(res[0].admit_date);
          $scope.case.dob = new Date(res[0].dob);
          var bd = moment(res[0].dob)
   //       $scope.case.date_appfiled = new Date(res[0].date_appfiled);           
          var age = intake.diff(bd, 'years');  
          $scope.case.res_age = parseInt(age);

      var dadmit = moment($scope.case.admit_date);
      var dass = moment($scope.case.date_assigned);
      var dapp = moment($scope.case.date_appfiled);
      var dpend = moment($scope.case.date_pending);
      var drej = moment($scope.case.date_rejected);

      var dappeal = moment($scope.case.date_appealled);
      var dhearing = moment($scope.case.date_hearing);
      var dapproved = moment($scope.case.date_approved); 
      var deligible = moment($scope.case.eligible_date);
      var dmaneed = moment($scope.case.date_maneed);
      var dappapp = moment($scope.case.date_appapp);
      var td = moment();

var cw = $scope.case.caseworker;

var sn = $scope.case.snfname;
for(var i = 0; i < $scope.scrsnfs.length; i++){
  if(sn == $scope.scrsnfs[i].name)
  {
     $scope.selectedsnf = $scope.scrsnfs[i];
  } 
}

for(var i = 0; i < $scope.cws.length; i++){
  if(cw == $scope.cws[i].initials)
  {
     $scope.selectedcw = $scope.cws[i];
  } 
}
      $scope.mdadmit = td.diff(dadmit, 'days');
      $scope.mdass = td.diff( dass, 'days');
      $scope.mdapp = td.diff( dapp, 'days');
      $scope.mdappdays = td.diff(drej, 'days');        
      $scope.mdpend = td.diff( dpend, 'days');
      $scope.mdappeal = td.diff( dappeal, 'days');

      $scope.mdhearing = td.diff(dhearing, 'days');
      $scope.mdapproved = td.diff(dapproved, 'days');
      $scope.mdappapp = td.diff(dappapp, 'days');
        var data = {cid: cid };

        $http.post("php/scr/scr_getactions.php", data).success(function(datax, status) {
                  $scope.actions = datax;
              })  
var datax = { 
  caseID: $scope.case.resident_id
};

  $http.post('php/scr/scr_gettodos.php', datax).success(function(res) {
        $scope.todos = res;
        for(var i =0; i < $scope.todos.length; i++)
        {
          var t = new Date($scope.todos[i].duedate);
          $scope.todos[i].duedate = t;
        }
      });



   });    

  }


  $scope.recalcdays = function(type, field, id) {
    if($scope.case){
      var dadmit = moment($scope.case.admit_date);
      var dass = moment($scope.case.date_assigned);
      var dapp = moment($scope.case.date_appfiled);
      var dpend = moment($scope.case.date_pending);
      var drejected = moment($scope.case.date_rejected);
      var dappeal = moment($scope.case.date_appealled);
      var dhearing = moment($scope.case.date_hearing);
      var dapproved = moment($scope.case.approved_date); 
      var deligible = moment($scope.case.eligible_date); 
      var dmaneed = moment($scope.case.date_maneed);                
       var td = moment()
      var tdd = moment(td).format('MM/DD/YYYY');;

      $scope.mdadmit = td.diff(dadmit, 'days');
      $scope.mdass = td.diff( dass, 'days');
      $scope.mdapp = td.diff( dapp, 'days');
      $scope.mdpend = td.diff( dpend, 'days');
      $scope.mdappeal = td.diff( dappeal, 'days');
      $scope.mdappdays = td.diff(drejected, 'days');  
      $scope.mdappealdeadline =  new Date(drejected.add(30, 'days'));
      $scope.mdhearing = td.diff(dhearing, 'days');
      $scope.mdapproved = td.diff(dapproved, 'days');
      $scope.mdeligdiff = deligible.diff(dmaneed, 'days');
      $scope.mdappappeligdiff = deligible.diff(dmaneed, 'days');      
  var admd = moment($scope.case.admit_date);
  var bd = moment($scope.case.dob)
  var age = admd.diff(bd, 'years');
  $scope.case.res_age = age;    
}
}

$scope.calcpendays = function() {
var d = $scope.case.penaltydays *1;
var s = moment($scope.case.date_penalty_start);
var x = moment(s.add(d, 'days'));
$scope.case.date_penalty_end = new Date(x);
};

  $scope.updcasedata = function(f, v) {
    var cid = $scope.case.resident_id;
    if(v instanceof Date && f != 'dob') {v = v.toString()}
    var data = {field: f, value: v, cid: cid};
   $http.post("php/scr/scr_updcasedata.php", data).success(function(data, status) {
    $scope.recalcdays();
            });

  }

  $scope.updcasenotes = function(f, v) {
    var cid = $scope.case.resident_id;
    var data = {field: f, value: v, cid: cid};
   $http.post("php/scr/scr_updcasedata.php", data).success(function(data, status) {
    console.log("Success");
            })
  }


  $scope.updclosed = function(f, v) {
    if($scope.case.closednotes.length >2){
    var p = localStorage.getItem('profile');
    var u = JSON.parse(p);
    var em = u.email;
    

    var cid = $scope.case.resident_id;
    var dd = {field: 'closed', value: v, cid: cid};
    var data = {field: 'closedby', value: em, cid: cid};
$http.post("php/scr/scr_updcasedata.php", dd);
   $http.post("php/scr/scr_updcasedata.php", data).success(function(data, status) {
$scope.catcases();
            })
 }
 else {
  alert("Please Enter Case Notes Before Closing this case.");
}
}



  $scope.editnote = function(id, note) {
    var today = new Date();
    var data = {note: note, nid: id }
  $http.post("php/scr/scr_saveeditednote.php", data).success(function(data, status) {
      console.log(data);
     });
  }


  $scope.openAddNewCase = function(ev) {


 $mdDialog.show({
        controller: 'DialogController',
        templateUrl: 'components/scr/clientdialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals : {
          dcase : $scope.case,
          tuser: $scope.tempuser,
            dcws : $scope.cws,
            dexts : $scope.exts,
            dsnfs : $scope.scrsnfs
                  },      
        clickOutsideToClose:true
      })


};


$scope.addTodo = function(ev) {
  var cid = $scope.case.resident_id;
  var dt = {};
 $mdDialog.show({
        controller: 'addtodoController',
        templateUrl: 'components/scr/addtodo.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals : {
            tuser : $scope.tempuser,
            dcase : $scope.case,
            dcaseid : $scope.case.resident_id
                  },      
        clickOutsideToClose:true
      })

};

$scope.edittodo = function(ev) {
  console.log(ev);
  var cid = $scope.case;
if(ev){dtodo = ev;
 $mdDialog.show({
        controller: 'todoController',
        templateUrl: 'components/scr/edittodo.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals : {
            dtodo : dtodo,
            dcase : cid
                  },      
        clickOutsideToClose:true
      })
};
};

$scope.markasclosed = function() {
$scope.confclo = true;
}

$scope.cancelclosed = function() {
$scope.confclo = false;
}

$scope.confirmclosed = function() {
$scope.confclo = false;
var d = new Date();
var idd = JSON.parse(localStorage.getItem("profile"));
var id = idd.email;
var dm = d.getMonth() *1 + 1;
var cltxt = dm + "-"+d.getDate()+"-"+d.getFullYear();
cltxt += " - Marked as Closed by " + id;
cltxt += " Current Status was " + $scope.case.current_status;
var tod = moment();
var cldata = {cid: $scope.case.resident_id, closedon: tod,
              closed_notes: cltxt };
       $http.post("php/scr/scr_closecase.php", cldata).success(function(data, status) {
          
            })     
      $scope.clearnewcases();
}



$scope.updlevels = function(f, v, cid) {

var cs;
var sl;
var cid = $scope.case.resident_id;
v = v.toString();
var csl = $scope.case.status_level;

switch(f) {
    case 'date_appapp':
      sl = 9;
      if(sl >= csl){
        cs = 'Appeal Approved';
       $scope.case.current_status = 'Appeal Approved';
        $scope.case.status_level = 9;
      } 
      else{sl = csl};
      var data = { field: f, value: v, sl: sl, cs: cs, cid: cid};
      $http.post("php/scr/scr_updlevels.php", data).success(function(data, status) {
    });
      break;
    case 'date_approved':
      sl = 8;
     if(sl >= csl){
        cs = 'Approved';
        $scope.case.current_status = 'Approved';      
        $scope.case.status_level = 8;
      } 
      else{sl = csl};
      var data = { field: f, value: v, sl: sl, cs: cs, cid: cid};
      $http.post("php/scr/scr_updlevels.php", data).success(function(data, status) {
    });
      break;

     case 'apprej': 
      if($scope.case.apprej == 'Rejected') {
      cs = 'Rejected';
      $scope.case.current_status = 'Rejected';      
      $scope.case.status_level = 5;      
      sl = 5;
      var data = { field: f, value: v, sl: sl, cs: cs, cid: cid};
      $http.post("php/scr/scr_updlevels.php", data).success(function(data, status) {
     // $scope.catcases();
            })
    }

      else if($scope.case.apprej == 'Approved') {
      cs = 'Approved';
      $scope.case.current_status = 'Approved';      
      $scope.case.status_level = 8;      
      sl = 8;
      } 
      else if($scope.case.apprej == 'Penalty') {
      cs = 'Penalty';
      $scope.case.current_status = 'Penalty';      
      $scope.case.status_level = 6;
      sl = 6;
      }      
     else if($scope.case.apprej == 'Withdrawn') {
          cs = 'Withdrawn';
          $scope.case.current_status = 'Withdrawn';      
          $scope.case.status_level = 4;
          sl = 4;
          }            
      var data = { field: f, value: v, sl: sl, cs: cs, cid: cid};
      $http.post("php/scr/scr_updlevels.php", data).success(function(data, status) {   
    });
      break;      
     case 'date_appealled':
      sl = 7;
     if(sl >= csl){
      cs = 'Appealled';
      $scope.case.current_status = 'Appealled';      
      $scope.case.status_level = 7;
       } else{sl = csl};
      var data = { field: f, value: v, sl: sl, cs: cs, cid: cid};
      $http.post("php/scr/scr_updlevels.php", data).success(function(data, status) {
    });
      break;
     case 'date_penalty_start':
      if(sl >= csl){
      cs = 'Penalty';
      $scope.case.current_status = 'Penalty';      
      $scope.case.status_level = 6;
      sl = 6;
      } else{sl = csl};
      var data = { field: f, value: v, sl: sl, cs: cs, cid: cid};
      $http.post("php/scr/scr_updlevels.php", data).success(function(data, status) {
    });
      break;      
     case 'date_rejected':
      if(sl >= csl){
      cs = 'Rejected';
      $scope.case.current_status = 'Rejected';      
      $scope.case.status_level = 5;
      sl = 5;
      } else{sl = csl};
      var data = { field: f, value: v, sl: sl, cs: cs, cid: cid};
      $http.post("php/scr/scr_updlevels.php", data).success(function(data, status) {
    });
      var dr = moment($scope.case.date_rejected);
         var drx = new Date(dr.add(30, 'days'));
         var drxx = moment(drx).format('MM/DD/YYYY');
        var dataz = {
          caseID: $scope.case.resident_id,
          userID: $scope.case.caseworker,
          casename: $scope.case.last_name + ', ' + $scope.case.first_name,
          status: 'Pending',
          task: 'File Appeal on ' + $scope.case.last_name + ', ' + $scope.case.first_name + ' by or before ' + drx,
          duedate: drx.toString(), 
          priority: 1,
          todowait: 'Todo'
        }
   $http.post("php/scr/scr_addtodo.php", dataz).success(function(data, status) {
    console.log("Success");
            })
      break;
    case 'date_withdrawn':
      sl = 4;
      cs = 'Withdrawn';
      $scope.case.current_status = 'Withdrawn';      
      $scope.case.status_level = 4; 
      var data = { field: f, value: v, sl: sl, cs: cs, cid: cid};
      $http.post("php/scr/scr_updlevels.php", data).success(function(data, status) {
    });
      break;      
     case 'date_pending':
      sl = 3;
    if(sl >= csl){
      cs = 'Pending';
      $scope.case.current_status = 'Pending';      
      $scope.case.status_level = 3;
      };      
      var data = { field: f, value: v, sl: sl, cs: cs, cid: cid};
      $http.post("php/scr/scr_updlevels.php", data).success(function(data, status) {
    });
      break;
     case 'date_appfiled':
      sl = 2;
   if(sl >= csl){
      cs = 'Signed and Submitted';
      $scope.case.current_status = 'Signed and Submitted';      
      $scope.case.status_level = 2;      
      } else{sl = csl};
      var data = { field: f, value: v, sl: sl, cs: cs, cid: cid};
      $http.post("php/scr/scr_updlevels.php", data).success(function(data, status) {
    });
      break;
     case 'date_assigned':
      sl = 1;
      if(sl >= csl){
      cs = 'New Case';
      $scope.case.current_status = 'New Case';      
      $scope.case.status_level = 1;      
      } else{sl = csl};
      var data = { field: f, value: v, sl: sl, cs: cs, cid: cid};
      $http.post("php/scr/scr_updlevels.php", data).success(function(data, status) {
    });
      break;
  }
      $scope.recalcdays();      
}

$scope.clearapprej = function() {
        $scope.case.current_status = "Pending";
      $scope.case.status_level = 3;
      $scope.case.apprej = "";
  var cid = $scope.case.resident_id;
      console.log("CLEAR");
      sl = 3;
      cs = 'Pending';
      $scope.case.current_status = 'Pending';      
      $scope.case.status_level = 3;  
      var data = { field: 'apprej', value: 'Pending', sl: 3, cs: 'Pending', cid: cid};
      $http.post("php/scr/scr_updlevels.php", data).success(function(data, status) {

      $scope.recalcdays();  
      });
}



$scope.onFileSelect = function(file) {
    if (!file) return;
    Upload.upload({
        url: 'php/storedoc.php',
        data: {file: file, cid: $scope.case.resident_id}
      }).then(function(resp) {
        // file is uploaded successfully
        console.log(resp.data);
      });    
  };


$scope.storedocs = function() {
  console.log($scope.fileinput);
  console.log($scope.case.resident_id);
  var data = {file: $scope.fileinput, cid: $scope.case.resident_id};
 $http.post('php/storedocs.php', data);  
};



  }]);












  angular
  .module('authApp')
  .controller('DialogController', function ($scope, $mdDialog, $http, dcase, tuser) {
  $scope.cws = [];
  $scope.tempuser = tuser;
  $scope.dcase = dcase;
  $http.get('php/scr/scr_getcws.php').success(function(res) {
        $scope.cws = res;
      });

  $scope.exts = ["", "Sr", "Jr", "II", "III", "IV", "V", "VI"];
  $scope.scrsnfs = [{"name": "Kane McKeesport", "provider_id": "395640"}, {"name": "Kane Glen Hazel", "provider_id": "395643"}, {"name": "Kane Ross", "provider_id": "395606"}, {"name": "Kane Scott", "provider_id": "395617"}, {"name": "Southwestern", "provider_id": "395742"}]

      $scope.hide = function() {
      $mdDialog.hide();
    };

  $scope.saveclientdata = function() {
    var j = JSON.parse(localStorage.getItem("profile"));
    var ji = j.inits;
var de = new Date();
              if($scope.dcase.admit_date)
              {
             var daa = $scope.dcase.admit_date.toString();
              } else var daa = ""
            
          if($scope.dcase.date_assigned)
              {
             var daas = $scope.dcase.date_assigned.toString();
              } else var daas = "";
              if($scope.caseworker) 
              {
                var cw = $scope.dcase.caseworker.initials;
                console.log(cw);
              }
              else var cw = ji;
  var data = {
              date_entered: de,
              date_created: de,
              first_name: $scope.dcase.first_name,
              middle_name: $scope.dcase.middle_name,
              last_name: $scope.dcase.last_name,
              ssn: $scope.dcase.ssn,
              dob: $scope.dcase.dob,
              res_age: $scope.dcase.res_age,
              snfname: $scope.dcase.facility.name,
              admit_date: daa,
              date_assigned: daas,
              caseworker: cw,
              plan: $scope.dcase.plan,
              issues: $scope.dcase.issues,
              contact_poa: $scope.dcase.contact_poa,
              contact_relation: $scope.dcase.contact_relation,
              contact_address: $scope.dcase.contact_address,
              contact_csz: $scope.dcase.contact_csz,
              contact_phone: $scope.dcase.contact_phone,
              contact_email: $scope.dcase.contact_email,
              snf_no: $scope.dcase.snf_no
                };

     $http.post("php/scr/scr_savenewclientdata.php", data).success(function(datax, status) {
      $scope.hide();
     });

  }



$scope.getage = function() {
   var da = moment();
   var bd = moment($scope.dcase.dob);
          var a = da.diff(bd, 'years');  
$scope.dcase.res_age =parseInt(a);

}


  });







//TODO CONTROLLER

  angular
  .module('authApp')
  .controller('addtodoController', function ($scope, $mdDialog, $http, dcase, tuser, todosService) {
$scope.dcase = dcase;
$scope.todos = [];
  var a = JSON.parse(localStorage.getItem("profile"))
  var tu = a.inits;
  $scope.tempuser = tu;


$scope.hide = function() {
      $mdDialog.hide();

};

$scope.getTodos = function() {

  var datax = { 
    caseID : $scope.dcase.resident_id 
  };
   $http.post('php/scr/scr_gettodos.php', datax).success(function(res) {
        $scope.todos = res;
        for(var i =0; i < $scope.todos.length; i++)
        {
          var t = new Date($scope.todos[i].duedate);
          $scope.todos[i].duedate = t;
        }
      });
 };

$scope.savenewtodo = function() {
  var u = $scope.tempuser;
  var c = $scope.dcase.resident_id;
  var cn = $scope.dcase.last_name + ', ' + $scope.dcase.first_name;
  var d = $scope.note.task;
  var dr = $scope.note.duedate;
  var p = $scope.note.priority;
  var tw = $scope.note.todowait;
var data = {
    userID : u,
    caseID : c,
    casename: cn,
    task: d,
    duedate: dr.toString(),
    priority: p,
    status: 'Pending',
    todowait: tw
                };
var data2 = { 
  caseID: $scope.dcase.resident_id
};

      $http.post("php/scr/scr_addtodo.php", data).success(function(datax, status) {
      $scope.hide();
     });
      $scope.getTodos();      
}



$scope.openAddNewToDo = function(ev) {
console.log("case open");

 $mdDialog.show({
        controller: 'DialogController',
        templateUrl: 'components/scr/addToDoDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals : {
            dcase : $scope.case
                  },      
        clickOutsideToClose:true
      })
}



});


 angular
  .module('authApp')
  .controller('todoController', function ($scope, $mdDialog, $http, dtodo, dcase, todosService) {

$scope.dtodo = dtodo;
$scope.dcase = dcase;
  var a = JSON.parse(localStorage.getItem("profile"))
  var tu = a.inits;
  $scope.tempuser = tu;


$scope.hide = function() {
      $mdDialog.hide();
};

  


$scope.saveedittodo = function() {
  var id = $scope.dtodo.id;
  var u = $scope.tempuser;
  var c = $scope.dcase.resident_id;
  var cn = $scope.dcase.last_name + ', ' + $scope.dcase.first_name;
  var d = $scope.dtodo.task;
  var dr = $scope.dtodo.duedate;
  var p = $scope.dtodo.priority;
  var tw = $scope.dtodo.todowait;
  var st = $scope.dtodo.status
var data = {
    id : id,
    userID : u,
    caseID : c,
    casename: cn,
    task: d,
    duedate: dr.toString(),
    priority: p,
    status: st,
    todowait: tw
                };
var data2 = { 
  caseID: $scope.dcase.resident_id
};

     $http.post("php/scr/scr_edittodo.php", data).success(function(datax, status) {
      $scope.hide();
     });
  $http.post('php/scr/scr_gettodos.php', data2).success(function(res) {
        $scope.todos = res;
        for(var i =0; i < $scope.todos.length; i++)
        {
          var t = new Date($scope.todos[i].duedate);
          $scope.todos[i].duedate = t;
        }
      });
}


$scope.updtodo = function(id, s, t, d, p, td) {
var data = {
  id: id,
  status: s,
  task: t,
  duedate: d.toString(), 
  priority: p,
  todowait: td
}
   $http.post("php/scr/scr_updtodo.php", data).success(function(data, status) {
    console.log("Success");
            })

}
});

 