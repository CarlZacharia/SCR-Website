<?php
$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";
$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$field = $request->field;
    @$value = $request->value;
    @$fcid = $request->fcid;
    @$modifiedby = $request->modifiedby;

$con = mysqli_connect($host, $user, $pass, $db);

$notea = mysqli_real_escape_string($con, $value);

if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}

 $q = "INSERT INTO zb_actions ($field, fcaseid, type, status, modifiedby) VALUES ('$notea', $fcid, 'Note', 'Note', '$modifiedby')";

 echo $q;

$res = mysqli_query($con, $q);
if(!$res) {
	die("Database Query Failed.". mysqli_error($con) . "OK");
}

mysqli_close($con);
?>