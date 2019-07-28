<?php
$cid = (string) $_POST['cid'];
$target_dir = "../data/".$cid."/";
$file = $_FILES["file"]["name"];

if(is_dir($target_dir))
  {
  echo ("$target_dir is a directory");
  }
else
  {
  echo ("$target_dir is not a directory");
  mkdir($target_dir, 755);
  }




  //   print_r($_FILES);
     $target_file = $target_dir . basename($_FILES["file"]["name"]);
    if(move_uploaded_file($_FILES["file"]["tmp_name"], $target_file))
            {
                echo "Uploaded";
            };

?>