<?php
$host = "mysql20.ezhostingserver.com";
$db = "zbdata2016";
$user = "zbuser";
$pass = "SeniorCare751";
$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
            @$fname = $request-> fname;
            @$lname = $request-> lname;
            @$address = $request-> address;
            @$csz = $request-> csz;
            @$cfname = $request-> cfname;
            @$clname = $request-> clname;
            @$caddress = $request-> caddress;
            @$ccsz = $request -> ccsz;
            @$telephone = $request-> telephone;
            @$email = $request-> email;
            @$relation = $request-> relation;
            @$atty = $request-> atty;
            @$atty2 = $request-> atty2;    
            @$caseworker = $request-> caseworker;                        
            @$casestatus = $request-> casestatus;
            @$casetype = $request-> casetype;
            @$case_cat = $request-> case_cat;
            @$office = $request-> office;
            @$csfname = $request-> csfname;
            @$cslname = $request-> cslname;
            @$csaddress = $request-> csaddress;                                                
            @$cscsz = $request-> cscsz;
            @$csdob = $request-> csdob;
            @$csage = $request-> csage;
            @$isdob = $request-> isdob;
            @$isage = $request-> isage;
            @$issex = $request-> issex;
            @$cssex = $request-> cssex;            
            @$contactnotes = $request-> contactnotes;
            @$referredby = $request-> referredby;
            @$issues = $request-> issues;
            @$plan = $request-> plan;
            @$fee = $request-> fee;
            @$facility = $request-> facility;
            @$facilityadmitdate = $request-> facilityadmitdate;
            @$postmtgnotes = $request-> postmtgnotes;
            @$enteredby = $request-> enteredby;
            @$next_action = $request-> next_action;

$fullname = $fname. ' ' .$lname;

$con = mysqli_connect($host, $user, $pass, $db);


$postmtgnotesx = mysqli_real_escape_string($con, $postmtgnotes);
$planx = mysqli_real_escape_string($con, $plan);
$issuesx = mysqli_real_escape_string($con, $issues);
$contactnotesx = mysqli_real_escape_string($con, $contactnotes);

if(mysqli_connect_errno()) {
      die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")"
      );
}

$q = "INSERT into zbcases (
 fullname,     
 fname,
 lname,
 address,
 csz,
 cfname,
 clname,
 caddress,
 ccsz,
 telephone,
 email,
 relation,
 atty,
 atty2,
 caseworker,
 casestatus,
 casetype, 
 case_cat,
 office,
 csfname,
 cslname,
 csaddress,
 cscsz,
 csdob,
 csage,
 isdob,
 isage,
 issex,
 cssex,
 contactnotes,
 referredby,
 issues,
 plan, 
 fee,
 facility,
 facilityadmitdate,
 postmtgnotes,
 enteredby,
 next_action
) VALUES (
 '$fullname',
 '$fname',
 '$lname',
 '$address',
 '$csz',
 '$cfname',
 '$clname',
 '$caddress',
 '$ccsz',
 '$telephone',
 '$email',
 '$relation',
 '$atty',
 '$atty2',
 '$caseworker',
 '$casestatus',
 '$casetype', 
 '$case_cat',
 '$office',
 '$csfname',
 '$cslname',
 '$csaddress',
 '$cscsz',
 '$csdob',
 '$csage', 
 '$isdob',
 '$isage',
 '$issex',
 '$cssex',
 '$contactnotesx',
 '$referredby',
 '$issuesx',
 '$planx', 
 '$fee',
 '$facility',
 '$facilityadmitdate',
 '$postmtgnotesx',
 '$enteredby',
 '$next_action'
)";
 
echo $q;

$res = mysqli_query($con, $q);
if(!$res) {
      die("Database Query Failed. ".mysqli_error($con). "   " . mysqli_errno($con)) ;
}

mysqli_close($con);
?>



