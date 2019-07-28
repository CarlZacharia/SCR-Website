<?php
    $cid = (string) $_POST['cid'];

$file = "../data/".$cid;
if(is_dir($file))
  {
  echo ("$file is a directory");
  }
else
  {
  echo ("$file is not a directory");
  mkdir($file, 755);
  }

?>