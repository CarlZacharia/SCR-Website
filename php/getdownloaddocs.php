<?php
$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";



$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$cid = $request->cid;


$con = new mysqli($host, $user, $pass, $db);

if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}

 $q = 'SELECT * FROM scr_uploads WHERE resident_id = '.$cid;
$resx = mysqli_query($con, $q);
if(!$resx) {
	die("Database Query Failed.". mysqli_error($con) . "OK");
}
 $array = mysqli_fetch_all($resx, MYSQLI_ASSOC);    
  echo json_encode($array);  
mysqli_close($con);

?>