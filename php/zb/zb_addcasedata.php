<?php
$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";
$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$fcaseid = $request-> fcaseid;
    @$ct = $request-> ct;
   

if($ct == "Elder Law Married Application"){
	$ctx = "{
  'casedata': {
    'isincome': [],
    'totalisincome': 0,
    'csincome': [],
    'totalcsincome': 0,
    'banksss': [],
    'banks': [],
    'invs': [],
    'invsss': [],
    'li': [],
    'liss': [],
    'veh': [],
    'vehss': [],
    'realty': [],
    'realtyss': []
  }
}";
}
else if ($ct == "Elder Law Single Application") {
if($ct == "Elder Law Married Application"){
	$ctx = "{
  'casedata': {
    'isincome': [],
    'totalisincome': 0,
    'banks': [],
    'invs': [],
    'li': [],
    'veh': [],
    'realty': [],
  }
}";
}
};


$con = mysqli_connect($host, $user, $pass, $db);
$ctz = mysqli_real_escape_string($con, $ctx);


if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}

 $q = "INSERT INTO zb_residents (fcaseid, casedata) VALUES ($fcaseid, '$ctz')";

 echo $q;

$res = mysqli_query($con, $q);
if(!$res) {
	die("Database Query Failed.". mysqli_error($con) . "OK");
}

mysqli_close($con);
?>