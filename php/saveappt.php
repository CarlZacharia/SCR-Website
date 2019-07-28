<?php
$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";


$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
		@$meetingtype = $request-> meetingtype;
		@$presentat = $request-> presentat;
		@$cfname = $request-> cfname;
		@$clname = $request-> clname;
		@$fname = $request-> fname;
		@$lname = $request-> lname;
		@$address = $request-> address;
		@$csz = $request-> csz;
		@$caddress = $request-> caddress;
		@$ccsz = $request-> ccsz;		
		@$telephone = $request-> telephone;
		@$email = $request-> email;
		@$casetype = $request-> casetype;
		@$caseid = $request-> caseid;
		@$apptnotes = $request-> apptnotes;		
		@$postmtgnotes = $request-> postmtgnotes;
		@$fee = $request-> fee;
		@$todo = $request-> todo;
		@$duedate = $request-> duedate;
		@$issues = $request-> issues;
		@$referredby = $request-> referredby;   
		@$office = $request-> office;
		@$clienttodo = $request-> clienttodo;
		@$facility = $request-> facility;
		@$facilityadmitdate = $request-> facilityadmitdate;		
		@$createnewcase = $request-> createnewcase;
		@$atty = $request-> atty;
		@$id = $request-> id;

$con = mysqli_connect($host, $user, $pass, $db);

$meetingtype = mysqli_real_escape_string($con, $meetingtype);
$presentat = mysqli_real_escape_string($con, $presentat);
$fname = mysqli_real_escape_string($con, $fname);
$lname = mysqli_real_escape_string($con, $lname);
$cfname = mysqli_real_escape_string($con, $cfname);
$clname = mysqli_real_escape_string($con, $clname);
$caddress = mysqli_real_escape_string($con, $caddress);
$ccsz = mysqli_real_escape_string($con, $ccsz);
$address = mysqli_real_escape_string($con, $address);
$csz = mysqli_real_escape_string($con, $csz);
$telephone = mysqli_real_escape_string($con, $telephone);
$email = mysqli_real_escape_string($con, $email);
$casetype = mysqli_real_escape_string($con, $casetype);
$caseid = mysqli_real_escape_string($con, $caseid);
$postmtgnotes = mysqli_real_escape_string($con, $postmtgnotes);
$apptnotes = mysqli_real_escape_string($con, $apptnotes);
$fee = mysqli_real_escape_string($con, $fee);
$todo = mysqli_real_escape_string($con, $todo);
$duedate = mysqli_real_escape_string($con, $duedate);
$issues = mysqli_real_escape_string($con, $issues);
$referredby = mysqli_real_escape_string($con, $referredby);
$clienttodo = mysqli_real_escape_string($con, $clienttodo);
$facility = mysqli_real_escape_string($con, $facility);
$facilityadmitdate = mysqli_real_escape_string($con, $facilityadmitdate);


if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}

$q = "UPDATE appts SET meetingtype = '$meetingtype', presentat = '$presentat', fname = '$fname', lname = '$lname', cfname = '$cfname', clname = '$clname', address = '$address', csz = '$csz', caddress = '$caddress', ccsz = '$ccsz', telephone = '$telephone', office = '$office',  email = '$email', casetype = '$casetype', caseid = '$caseid', apptnotes = '$apptnotes', postmtgnotes = '$postmtgnotes', office = '$office', clienttodo = '$clienttodo', fee = '$fee', todo = '$todo', duedate = '$duedate', issues = '$issues', referredby = '$referredby' WHERE id = $id";
 
$res = mysqli_query($con, $q);
if(!$res) {
	die("Database Query Failed.". mysqli_error($con));
}
else {
mysqli_error($con);
}

if($createnewcase == true) {
	$fullname = $fname. " " .$lname;
$qq = "INSERT into zbcases (atty, office, fname, lname, fullname, cfname, clname, address, csz, telephone, email, caddress, ccsz, casetype, casestatus, postmtgnotes, issues, fee, referredby, facility, facilityadmitdate) VALUES ('$atty', '$office', '$fname', '$lname', '$fullname', '$cfname', '$clname', '$address', '$csz', '$telephone', '$email', '$caddress', '$ccsz', '$casetype', 'Prospect', '$postmtgnotes', '$issues', '$fee', '$referredby', '$facility', '$facilityadmitdate')";
echo $qq;
$res = mysqli_query($con, $qq);
if(!$res) {
	die("Database Query Failed.". mysqli_error($con));
}
else {
mysqli_error($con);
}
}


mysqli_close($con);
?>