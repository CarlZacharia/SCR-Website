<?php
$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";
$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$field = $request->field;
    @$value1 = $request->value;
    @$cs = $request->cs;
    @$sl = $request->sl;
    @$cid = $request->cid;    



$con = mysqli_connect($host, $user, $pass, $db);
$value = mysqli_real_escape_string($con, $value1);

if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}

$q = "UPDATE scr_residents SET ".$field." = '".$value."', current_status = '".$cs."', status_level = ".$sl." WHERE resident_id = ".$cid;

 echo $q;
$res = mysqli_query($con, $q);
if(!$res) {
	die("Database Query Failed.". mysqli_error($con));
}
else {
mysqli_error($con);
}
mysqli_close($con);
?>