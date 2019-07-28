<?php
$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";

$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$email = $request->email;
    @$pw = $request->pw;


$shapw = hash('sha256', $pw);



$con = mysqli_connect($host, $user, $pass, $db);
if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}

$q = "SELECT email, inits, status FROM scr_users WHERE email = '".$email. "' AND  password = '".$shapw."'";

$res = mysqli_query($con, $q);
if(!$res) {
	die("Database Query Failed.");
}
 $array = mysqli_fetch_all($res, MYSQLI_ASSOC);    
  echo json_encode($array);  
mysqli_close($con);
?>