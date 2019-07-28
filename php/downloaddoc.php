<?php
    $fn = (string) $_POST['filename'];
	header('Content-Description: File Transfer');
    header("Content-Type: application/force-download");
//    header('Content-Type: application/msword');
    header('Content-Disposition: attachment; filename="'.$fn.'"');
    header('Content-Transfer-Encoding: binary');
    header("Pragma: public");
    header("Expires: 0");
    header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
    readfile($fn);
    unlink($fn);

?>