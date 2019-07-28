<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";


$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$note = $request->note;
    @$nid = $request->nid;        
 


$con = new mysqli($host, $user, $pass, $db);


if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}	

else {
$notee = mysqli_real_escape_string($con, $note);

$result = $con->query("UPDATE scr_actions SET Action_taken = '$notee' WHERE id = $nid");
if(!$result){
if(mysqli_connect_errno()) {
	die("Database Failed: " . mysqli_error($con) . " (".mysqli_connect_errno($con).")"
	);
}	

}
}




mysqli_close($con);

?>



