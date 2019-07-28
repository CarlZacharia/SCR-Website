var qc = angular.module('authApp');
  qc.controller('calController', ['$scope', '$http', '$location',  '$mdDialog', function($scope, $http, $location, $mdDialog) {

$scope.thisweekappts = [];
$scope.pastweekappts = [];
$scope.existingappts = [];
$scope.appt = {};
  var userd = JSON.parse(localStorage.getItem("profile"));
  $scope.user = userd.email;
  $scope.atty = userd.user_metadata.inits;

$scope.activecase = {};

// Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      var CLIENT_ID = '290862730327-92prbtrva4u77l9rhfp3nc8v6b8j6qik.apps.googleusercontent.com';
 //     var CLIENT_ID = '290862730327-lvo8mq1r7rbb9ejulsmmk56ct1mgudsf.apps.googleusercontent.com';
      var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

      /*Check the user authentication */

      function checkAuth() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      }

      /* function for handling authorozation of server */

      function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadCalendarApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }

       	/*the response function to user click */

$scope.handleAuthClick = function(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }

         /*loading client library */

      function loadCalendarApi() {
        gapi.client.load('calendar', 'v3', listUpcomingEvents);
      }

           /*print out the results of users calendar response*/

      function listUpcomingEvents() {

      	var user = JSON.parse(localStorage.getItem('profile'));
      	var pwa = new Date().getTime() - 604800000;
      	var pw = new Date(pwa);
      	var pwy = pw.getFullYear();
      	var pwm = pw.getMonth()+1;
      	var pwd = pw.getDate();
      	var pwt = pwy+'-'+pwm+'-'+pwd;
      	var d = new Date();
      	var dy = d.getFullYear();
      	var dm = d.getMonth()+1;
      	var dd = d.getDate();
      	var dt = dy+'-'+dm+'-'+dd;
      	var wa = new Date().getTime() + 604800000;
      	var w = new Date(wa);
      	var wy = w.getFullYear();
      	var wm = w.getMonth()+1;
      	var wd = w.getDate();
      	var wt = wy+'-'+wm+'-'+wd;


        var request = gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': pw.toISOString(),
          'timeMax': w.toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'orderBy': 'startTime'
        });

        request.execute(function(resp) {
          var events = resp.items;
          $scope.calevents = resp.items;

          //Select all appts where 
          var data = {
          	calendar: user.email,
          	startdate: dt,
          	enddate: wt
          }
           $http.post('php/getappts.php', data).success(function(res) {
           	$scope.existingappts = res;        	
           	for(var i = 0; i < $scope.calevents.length; i++){

           		var e = $scope.calevents[i].id;
           		for(var j = 0; j < $scope.existingappts.length; ++j){
           			var g = $scope.existingappts[j].googleid;
           			if(e == g){
           				$scope.calevents.splice(j); 
           				}               	
				}    			
          	}
           for(var k = 0; k < $scope.calevents.length; k++)
           	 {

           	 	var d = {
			    	googleid : $scope.calevents[k].id,
					appt_date : $scope.calevents[k].start.dateTime,
					calendar : $scope.calevents[k].organizer.email,
					summary : $scope.calevents[k].summary,
					apptnotes : $scope.calevents[k].description,
					createdBy : $scope.calevents[k].creator.email,
					dateCreated : $scope.calevents[k].created,
					dateUpdated : $scope.calevents[k].updated
           	 	}
    	 	$http.post('php/addappts.php', d);
           	 }   

	    });
      });
dispEvents();
}

function dispEvents() {
	    var user = JSON.parse(localStorage.getItem('profile'));
      	var d = new Date();
      	var dy = d.getFullYear();
      	var dm = d.getMonth()+1;
      	var dd = d.getDate();
      	var dt = dy+'-'+dm+'-'+dd;
      	var wa = new Date().getTime() - 604800000;
      	var pw = new Date(wa);
      	var pwy = pw.getFullYear();
      	var pwm = pw.getMonth()+1;
      	var pwd = pw.getDate();
      	var pwt = pwy+'-'+pwm+'-'+pwd;
      	var ta = new Date().getTime() + 604800000;
      	var t = new Date(ta);
      	var ty = t.getFullYear();
      	var tm = t.getMonth()+1;
      	var td = t.getDate();
      	var tw = ty+'-'+tm+'-'+td;
	  var data = {
          	calendar: user.email,
          	startdate: dt,
          	enddate: tw
          }
           $http.post('php/getappts.php', data).success(function(results) {
           	for(var i = 0; i < results.length; i++){
           		results[i].appt_date = new Date(results[i].appt_date);
           		results[i].dateCreated = new Date(results[i].dateCreated);
           		results[i].dateUpdated = new Date(results[i].dateUpdated);           		           		
           	}
           	$scope.thisweekappts = results;
           });
		var data2 = {
          	calendar: user.email,
          	startdate: pwt,
          	enddate: dt
          }
           $http.post('php/getappts.php', data2).success(function(results) {
           	for(var i = 0; i < results.length; i++){
           		results[i].appt_date = new Date(results[i].appt_date);
           		results[i].dateCreated = new Date(results[i].dateCreated);
           		results[i].dateUpdated = new Date(results[i].dateUpdated);           		           		
           	}
           	$scope.pastweekappts = results;
           });           
}



$scope.editAppt = function(appt) {
 $mdDialog.show({
 		controller: 'apptController',
        templateUrl: 'components/googlecal/editappt.html',
        parent: angular.element(document.body),
        locals : {
            appt: appt
                  },              
        clickOutsideToClose:true
      })

};

}]);



 angular
  .module('authApp')
  .controller('apptController', function ($scope, $mdDialog, $http, appt) {
  	$scope.appt = appt;
  	$scope.meetingtypes = ["New Case", "New Case - FollowUp", "Signing", "FollowUp - Existing Case", "Bringing Documents", "Hearing", "Court Date", "Conference", "Other"];
  	$scope.casetypes = ["Elder Law Single Application", "Elder Law Married Application", "Elder Law Single Planning", "Elder Law Married Planning", "Probate Pennsylvania", "Probate Florida", "Estate Planning Pennsylvania", "Estate Planning Florida", "Guardianship", "Litigation", "Other"];
  	$scope.offices = ["McKeesport", "McMurray", "Wexford", "Greensburg", "Bradenton", "Client House", "Other"];

console.log($scope.appt);

 var dataid = {id: $scope.appt.id};
        $http.post('php/getappt.php', dataid).success(function(rez) {
        	$scope.appt = rez[0];
        	$scope.appt.appt_date = new Date(rez[0].appt_date);   	
        	console.log($scope.appt);
        	if($scope.appt.meetingtype == null || !$scope.appt.meetingtype)
        		{
        			$scope.appt.meetingtype = "New Case";
        		}
        	
});


  $scope.cancel = function() {
      $mdDialog.hide();
    };

$scope.saveappt = function(appt) {
  var userd = JSON.parse(localStorage.getItem("profile"));
  $scope.user = userd.email;
  $scope.appt.atty = userd.user_metadata.inits;
		$http.post('php/saveappt.php', appt);
		$scope.cancel();
}

$scope.lookupcase = function(name) {
	if(name.length > 3){
		var dname = {name : name};
		$http.post('php/getcases.php', dname).success(function(res) {
        	$scope.cases = res;	
	})
	}
}

$scope.markCaseData = function(c){
	console.log(c);
	$scope.cases = [];
	$scope.activecase = c;
	$scope.appt.casetype = c.casetype;
	$scope.appt.referredby = c.referredby;
	$scope.appt.fee = c.fee;
	$scope.appt.office = c.office;
	$scope.appt.fname = c.fname;
  $scope.appt.lname = c.lname;
  $scope.appt.cfname = c.cfname;
  $scope.appt.clname = c.clname;      
	$scope.appt.caddress = c.caddress;
	$scope.appt.ccsz = c.ccsz;
  $scope.appt.address = c.address;
  $scope.appt.csz = c.csz;  
	$scope.appt.telephone = c.telephone;
	$scope.appt.email = c.email;
}

$scope.t = function() {
  console.log($scope.appt);
}


});