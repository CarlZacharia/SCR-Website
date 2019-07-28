

<?php
$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
	@$ct = $request-> ct;
    @$asst = $request-> asst;

$con = mysqli_connect($host, $user, $pass, $db);
if(mysqli_connect_errno()) {
	die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
	);
}

switch($ct) {
  case 'Prospects':
		$q = "SELECT * FROM zbcases WHERE caseworker ='$asst' AND casestatus = 'Prospect' ORDER BY  clname,  datecreated DESC";
		$res = mysqli_query($con, $q);
		if(!$res) {
			die("Database Query Failed.". mysqli_error($con));
		}
		 $array = mysqli_fetch_all($res, MYSQLI_ASSOC);    
		  echo json_encode($array);  
    break;
  case 'Probate':
		$q = "SELECT * FROM zbcases WHERE casetype LIKE '$ct%' AND caseworker = '$asst' AND casestatus = 'Active' ORDER BY  clname,  datecreated DESC";
		$res = mysqli_query($con, $q);
		if(!$res) {
			die("Database Query Failed.". mysqli_error($con));
		}
		 $array = mysqli_fetch_all($res, MYSQLI_ASSOC);    
		  echo json_encode($array);  
    break;
 case 'ELM':
		$q = "SELECT * FROM zbcases WHERE casetype = 'Elder Law Married Application' AND caseworker = '$asst' AND casestatus = 'Active'  ORDER BY  clname,  datecreated DESC";
		$res = mysqli_query($con, $q);
		if(!$res) {
			die("Database Query Failed.". mysqli_error($con));
		}
		 $array = mysqli_fetch_all($res, MYSQLI_ASSOC);    
		  echo json_encode($array);  
    break;    
 case 'ELS':
		$q = "SELECT * FROM zbcases WHERE casetype = 'Elder Law Single Application' AND caseworker = '$asst' AND casestatus = 'Active'  ORDER BY  clname,  datecreated DESC";
		$res = mysqli_query($con, $q);
		if(!$res) {
			die("Database Query Failed.". mysqli_error($con));
		}
		 $array = mysqli_fetch_all($res, MYSQLI_ASSOC);    
		  echo json_encode($array);  
    break;    
 case 'EP':
		$q = "SELECT * FROM zbcases WHERE casetype LIKE 'Estate Plan%' AND caseworker = '$asst' AND casestatus = 'Active'  ORDER BY  clname,  datecreated DESC";
		$res = mysqli_query($con, $q);
		if(!$res) {
			die("Database Query Failed.". mysqli_error($con));
		}
		 $array = mysqli_fetch_all($res, MYSQLI_ASSOC);    
		  echo json_encode($array);  
    break;        
}

mysqli_close($con);
?>