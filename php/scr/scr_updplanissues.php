<?php
$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";
$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$plan1 = $request->plan;
    @$issues1 = $request->issues;
    @$caseid = $request->cid;        

$con = mysqli_connect($host, $user, $pass, $db);


$plan = mysqli_real_escape_string($con, $plan1);
$issues = mysqli_real_escape_string($con, $issues1);

if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}

$q = "UPDATE scr_residents SET plan = '" .$plan."', issues = '".$issues."' WHERE  resident_id = ".$caseid;

$res = mysqli_query($con, $q);
if(!$res) {
	die("Database Query Failed.". mysqli_error($con));
}

mysqli_close($con);
?>


