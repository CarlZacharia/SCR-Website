<?php
$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";

$postdata = file_get_contents("php://input");
$con = mysqli_connect($host, $user, $pass, $db);

    $request = json_decode($postdata);
    @$user = (string)$request->user;
    @$reminder = (string)$request->reminder;
    @$remtype = (string)$request->remtype;



$reminderx = mysqli_real_escape_string($con, $reminder);
echo $reminderx;

if(mysqli_connect_errno()) {
      die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
      );
}


$qq = "INSERT into reminders (user, reminder, status, remtype, level) VALUES ('$user', '$reminderx', 'Pending', '$remtype', 0 )";

 
$res = mysqli_query($con, $qq);
if(!$res) {
      die("Database Query Failed.". mysqli_error($con) . "OK");
}

mysqli_close($con);
?>

