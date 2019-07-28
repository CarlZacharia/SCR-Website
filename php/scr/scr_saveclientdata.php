<?php
$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";
$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
            @$first_name = $request-> first_name;
            @$middle_name = $request-> middle_name;
            @$last_name = $request-> last_name;
            @$ssn = $request-> ssn;
            @$dob = $request-> dob;
            @$snfname = $request-> snfname;
            @$admit_date = $request-> admit_date;
            @$date_assigned = $request-> date_assigned;
            @$current_status = $request-> current_status;
            @$caseworker = $request-> caseworker;
            @$caseworker_cao = $request-> caseworker_cao;
            @$plan = $request-> plan;
            @$issues = $request-> issues;
            @$contact_poa = $request-> contact_poa;
            @$contact_relation = $request-> contact_relation;
            @$contact_address = $request-> contact_address;
            @$contact_csz = $request-> contact_csz;
            @$contact_phone = $request-> contact_phone;
            @$contact_email = $request-> contact_email;
            @$resident_id = $request-> resident_id;

$con = mysqli_connect($host, $user, $pass, $db);
if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}

$q = "UPDATE scr_residents SET first_name = '".$first_name."', middle_name = '".$middle_name."', last_name = '".$last_name."', ssn = '".$ssn."',
		dob = '".$dob."', snfname = '".$snfname."', admit_date = '".$admit_date."', date_assigned = '".$date_assigned."', current_status = '".$current_status."',
		caseworker = '".$caseworker."', caseworker_cao = '".$caseworker_cao."', plan = '".$plan."', issues = '".$issues."',
		contact_poa = '".$contact_poa."', contact_relation = '".$contact_relation."', contact_address = '".$contact_address."',
		contact_csz = '".$contact_csz."', contact_phone = '".$contact_phone."', contact_email = '".$contact_email."'  WHERE resident_id = ".$resident_id;
 
$res = mysqli_query($con, $q);
if(!$res) {
	die("Database Query Failed." . mysqli_error($con));
}
$q = "SELECT * FROM scr_residents WHERE  resident_id = ".$resident_id;
 
$res = mysqli_query($con, $q);
if(!$res) {
	die("Database Query Failed. ".mysqli_error($con));
}
 $array = mysqli_fetch_all($res, MYSQLI_ASSOC);    
  echo json_encode($array);  
mysqli_close($con);
?>