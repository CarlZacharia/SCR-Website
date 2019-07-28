<?php
$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";
$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$cw = (string)$request->caseworker;

$con = mysqli_connect($host, $user, $pass, $db);
if($cw == 'All') 
{
	$cw = '%';
};
if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}


 $q = "SELECT resident_id, last_name, first_name, current_status, status_level, caseworker FROM scr_residents WHERE  caseworker LIKE '" .$cw. "' AND closed <> 'Yes' ORDER BY last_name ASC" ;
 
$res = mysqli_query($con, $q);
if(!$res) {
	die("Database Query Failed.". mysqli_error($con) . "OK");
}
 $array = mysqli_fetch_all($res, MYSQLI_ASSOC);    
  echo json_encode($array);  
mysqli_close($con);
?>