            <?php
            $host = "mysql20.ezhostingserver.com";
            $db = "zbdata2016";
            $user = "zbuser";
            $pass = "SeniorCare751";

            $con = mysqli_connect($host, $user, $pass, $db);
            if(mysqli_connect_errno()) {
                  die("Database Connection Failed: " . mysqli_connect_error() . " (".mysqli_connect_errno().")");
            }
    

            $postdata = file_get_contents("php://input");
            echo "postdata " .$postdata;
                $request = json_decode($postdata);

                        @$userID = $request-> userID;
                        @$caseID = $request-> caseID;
                        @$casename = $request-> casename;
                        @$taskx = $request-> task;
                        @$duedate = $request-> duedate;
                        @$priority = $request-> priority;
                        @$status = $request-> status;
                        @$todowait = $request-> todowait;

                        $task = mysqli_real_escape_string($con, $taskx);


         $q = "INSERT INTO todos (userID, caseID, casename, task, duedate, priority, status, todowait) VALUES ('$userID', $caseID, '$casename', '$task', '$duedate', '$priority', '$status', '$todowait')";
             
  
            $res = mysqli_query($con, $q);

            if(!$res) {
            	die("Database Query Failed." . mysqli_error($con));
            }
                  echo "New record has id: " . mysqli_insert_id($con);  
                

            mysqli_close($con);
            ?>