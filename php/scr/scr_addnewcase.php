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
            @$ext = $request-> ext;
            @$ssn = $request-> ssn;
            @$sex = $request-> sex;
            @$dob = $request-> dob;
            @$marital = $request -> marital;
            @$snfname = $request-> snfname;
            @$admit_date = $request-> admit_date;
            @$problem = $request-> problem;
            @$date_assigned = $request-> date_assigned;
            @$date_entered = $request-> date_entered;            
            @$current_status = "New Case";
            @$status_level = 1;
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
            @$spousename = $request-> spousename;
            @$homeaddress = $request-> homeaddress;
            @$homecsz = $request-> homecsz;
            @$hometelephone = $request-> hometelephone;
            @$casenotes = $request-> casenotes;
            @$facility = $request-> facility;

$con = mysqli_connect($host, $user, $pass, $db);
if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}

$q = "INSERT into scr_residents (first_name,
middle_name,
last_name,
ext,
ssn,
sex,
dob,
marital,
snfname,
caseworker,
caseworker_cao,
date_entered,
admit_date,
problem,
issues,
plan,
casenotes,
spousename,
homeaddress,
homecsz,
hometelephone,
contact_poa,
contact_address,
contact_csz,
contact_phone,
contact_email,
contact_relation,
facility,
current_status,
status_level) VALUES (
'$first_name',
'$middle_name',
'$last_name',
'$ext',
'$ssn',
'$sex',
'$dob',
'$marital',
'$snfname',
'$caseworker',
'$caseworker_cao',
'$date_entered',
'$admit_date',
'$problem',
'$issues',
'$plan',
'$casenotes',
'$spousename',
'$homeaddress',
'$homecsz',
'$hometelephone',
'$contact_poa',
'$contact_address',
'$contact_csz',
'$contact_phone',
'$contact_email',
'$contact_relation',
'$facility',
'New Case',
1
)";
 
$res = mysqli_query($con, $q);
if(!$res) {
	die("Database Query Failed. ".mysqli_error($con). "   " . mysqli_errno($con))	;
}
 
mysqli_close($con);
?>



