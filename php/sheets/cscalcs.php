<?php
require_once "../PHPExcel/PHPExcel.php";

 $csname = (string) $_POST['csname'];
 $isname = (string) $_POST['isname']; 


$objPHPExcel = new PHPExcel();
$objPHPExcel->getActiveSheet()->setCellValue('A1', 'CS Name');
$objPHPExcel->getActiveSheet()->setCellValue('B1', $isname);
$objPHPExcel->getActiveSheet()->setCellValue('D1', 'IS Name');
$objPHPExcel->getActiveSheet()->setCellValue('E1', $isname);

$fn = 'CSCalcs'.$csname.'.xlsx';

header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetmp.sheet');
header('Content-Disposition: attachment;filename="'.$fn.'"');
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