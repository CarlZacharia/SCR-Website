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

                $request = json_decode($postdata);
                        @$date_entered = $request-> date_entered;
                        @$date_created = $request-> date_created;
                        @$first_name = $request-> first_name;
                        @$middle_name = $request-> middle_name;
                        @$last_name = $request-> last_name;
                        @$ssn = $request-> ssn;
                        @$dob = $request-> dob;
                        @$snfname = $request-> snfname;
                        @$admit_date = $request-> admit_date;
                        @$date_assigned = $request-> date_assigned;
                        @$caseworker = $request-> caseworker;
                        @$plan = $request-> plan;
                        @$issues = $request-> issues;
                        @$contact_poa = $request-> contact_poa;
                        @$contact_relation = $request-> contact_relation;
                        @$contact_address = $request-> contact_address;
                        @$contact_csz = $request-> contact_csz;
                        @$contact_phone = $request-> contact_phone;
                        @$contact_email = $request-> contact_email;
                        @$snf_no = $request-> snf_no;


         $q = "INSERT INTO scr_residents  (date_entered, date_created, first_name,  middle_name, last_name, ssn, dob, snfname, admit_date, date_assigned, current_status, status_level, caseworker, plan, issues, contact_poa, contact_relation, contact_address, contact_csz, contact_phone, contact_email, snf_no) VALUES ('$date_entered', '$date_created', '$first_name', '$middle_name', '$last_name', '$ssn', '$dob', '$snfname', '$admit_date', '$date_assigned', 'New Case', 1, '$caseworker', '$plan', '$issues', '$contact_poa', '$contact_relation', '$contact_address', '$contact_csz', '$contact_phone', '$contact_email', '$snf_no')";
           echo $q;  
            $res = mysqli_query($con, $q);

            if(!$res) {
            	die("Database Query Failed." . mysqli_error($con));
            }
                  echo "New record has id: " . mysqli_insert_id($con);  
                  echo mysqli_connect_errno();           
            mysqli_close($con);
            ?>