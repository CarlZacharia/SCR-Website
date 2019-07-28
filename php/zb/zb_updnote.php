<?php
$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";
$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$value = $request->value;
    @$id = $request->id;

$con = mysqli_connect($host, $user, $pass, $db);

$notea = mysqli_real_escape_string($con, $value);

if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}

 $q = "UPDATE zb_actions set actdesc = '$notea', type = 'Note', status = 'Pending' WHERE id = $id";

 echo $q;

$res = mysqli_query($con, $q);
if(!$res) {
	die("Database Query Failed.". mysqli_error($con) . "OK");
}

mysqli_close($con);
?>