<?php
$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";
$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$id = $request->id;
    @$task = $request->task;
    @$status = $request->status; 
    @$todowait = $request->todowait;
    @$priority = $request->priority; 
    @$duedate = $request->duedate;  



$con = mysqli_connect($host, $user, $pass, $db);
$value = mysqli_real_escape_string($con, $task);

if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}

$q = "UPDATE todos SET task = '".$value."', duedate = '".$duedate."', status = '".$status."', todowait = '".$todowait."', priority = '".$priority."'  WHERE id = ".$id;
 
$res = mysqli_query($con, $q);
if(!$res) {
	die("Database Query Failed.". mysqli_error($con));
}
else {
mysqli_error($con);
}
mysqli_close($con);
?>