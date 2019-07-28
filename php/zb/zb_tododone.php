<?php
$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$cid = $request-> id;
echo $cid;
echo 'Line 10';
$con = mysqli_connect($host, $user, $pass, $db);

if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}


 $q = "UPDATE reminders SET status = 'Done' WHERE  id = $cid" ;
 echo  $q;
$res = mysqli_query($con, $q);
if(!$res) {
	die("Database Query Failed.". mysqli_error($con) . "OK");
}

mysqli_close($con);
?>