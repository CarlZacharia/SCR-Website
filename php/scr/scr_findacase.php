<?php
$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";
$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$ln = (string)$request->last_name;

$con = mysqli_connect($host, $user, $pass, $db);

if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}


 $q = "SELECT * FROM scr_residents WHERE last_name LIKE '". $ln . "%' ORDER BY last_name ASC";
 
$res = mysqli_query($con, $q);
if(!$res) {
	die("Database Query Failed.". mysqli_error($con));
}
 $array = mysqli_fetch_all($res, MYSQLI_ASSOC);    
  echo json_encode($array);  
mysqli_close($con);
?>