<?php
require_once "../PHPExcel/PHPExcel.php";

 $pname = (string) $_POST['pname'];
    $giftamt =  $_POST['giftamt'];

$objPHPExcel = new PHPExcel();
$objPHPExcel->getActiveSheet()->setCellValue('A1', $pname);
$objPHPExcel->getActiveSheet()->setTitle('Client Name');
$objPHPExcel->getActiveSheet()->setCellValue('B1', $giftamt);
$objPHPExcel->getActiveSheet()->setTitle('Gift Amount');


header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetmp.sheet');
header('Content-Disposition: attachment;filename="gifting.xlsx"');
header('Cache-Control: max-age=0');

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save('php://output');


/*	$tmpfname = "RenaeSH.xlsx";
	$excelReader = "PHPExcel_IOFactory::createReaderForFile($tmpfname);
	$excelObj = $excelReader->load($tmpname);
	//$worksheet = $excelObj->getActiveSheet(); //gets last Sheet
	$worksheet = excelObj->getSheet(0); //gets Sheet 1
	$lastRow = $worksheet->getHighestRow();
	$lastCol = $worksheet->getHighestColumn();
	echo

*/

?>