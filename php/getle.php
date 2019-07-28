<?php
$host = "mysql9.ezhostingserver.com";
$db = "gltcdatabase";
$user = "gltc";
$pass = "seniorcare";
$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$age = $request->age;
    @$sex = $request->sex;

$con = mysqli_connect($host, $user, $pass, $db);
if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}

$q = 'SELECT le FROM le WHERE age = ' .$age. ' and sex = "'.$sex.'"';
 
$res = mysqli_query($con, $q);
if(!$res) {
echo("Error description: " . mysqli_error($con));
	die("Database Query Failed.");
}
 $array = mysqli_fetch_all($res, MYSQLI_ASSOC);    
  echo json_encode($array);  
mysqli_close($con);
?>