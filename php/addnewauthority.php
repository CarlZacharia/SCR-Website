<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";


$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$area = $request->aarea;
    @$keywords = $request->akeywords;        
    @$desc = $request->adesc;  
    @$atype = $request->atype;          
    @$link = $request->alink;


$con = new mysqli($host, $user, $pass, $db);


if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}	

else {
$desca = mysqli_real_escape_string($con, $desc);
$linka = mysqli_real_escape_string($con, $link);

$result = $con->query("INSERT INTO authorities (area, keywords, description, type, link) VALUES ('$area', '$keywords', '$desca', '$atype', '$linka' )");
if(!$result){
if(mysqli_connect_errno()) {
	die("Database Failed: " . mysqli_error($con) . " (".mysqli_connect_errno($con).")"
	);
}	
else{"Success".mysqli_connect_errno($con);
}
}
}




mysqli_close($con);

?>



