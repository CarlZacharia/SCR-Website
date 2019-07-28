<?php
$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";
$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    	@$googleid = $request-> googleid;
		@$appt_date = $request-> appt_date;
		@$calendar = $request-> calendar;
		@$summary = $request-> summary;
		@$description = $request-> description;
		@$createdBy = $request-> createdBy;
		@$dateCreated = $request-> dateCreated;
		@$dateUpdated = $request-> dateUpdated;


$con = mysqli_connect($host, $user, $pass, $db);

if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}


 $q = 'INSERT INTO appts (googleid, appt_date, calendar, summary, apptnotes, createdBy, dateCreated, dateUpdated) VALUES ("'.$googleid.'", "'.$appt_date.'", "'.$calendar.'", "'.$summary.'", "'.$description.'", "'.$createdBy.'", "'.$dateCreated.'", "'.$dateUpdated.'")';
echo $q;
$res = mysqli_query($con, $q);
if(!$res) {
	die("Database Query Failed.". mysqli_error($con) . "OK");
}
else {echo "Success";}
mysqli_close($con);
?>