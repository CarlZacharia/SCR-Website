<?php
$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";


$con = mysqli_connect($host, $user, $pass, $db);

if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}


    $query = 'SELECT * FROM scr_residents';
    $result = mysqli_query($con, $query);
    $arrayResult = mysqi_fetch_array($result);
    $num_rows = mysql_num_rows($result);
echo $num_rows;
    //     for ($i = 0; $i <= $numFields; $i++){ //2nd for loop
                echo $arrayResult;
      //      }
     



?>