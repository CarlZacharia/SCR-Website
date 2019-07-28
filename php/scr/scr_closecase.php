<?php
$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";
$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$cid = $request->cid;
    @$closedon = $request->closedon;
    @$closed_notes = $request-> closed_notes;


$con = mysqli_connect($host, $user, $pass, $db);


$con = new mysqli($host, $user, $pass, $db);


if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}	

else {
$notee = mysqli_real_escape_string($con, $closed_notes);

$result = $con->query("UPDATE scr_actions SET closed = 'Yes', closedon = '$closedon', closednotes = '$notee' WHERE resident_id = $cid");
if(!$result){
if(mysqli_connect_errno()) {
	die("Database Failed: " . mysqli_error($con) . " (".mysqli_connect_errno($con).")"
	);
}	

}
}




mysqli_close($con);

?>

