<?php
echo pwd();
require_once "PHPExcel/PHPExcel.php";

$objPHPExcel = new PHPExcel();
$objPHPExcel->getActiveSheet()->setCellValue('A1', 'Name of Client');
$objPHPExcel-getActiveSheet()->setTitle('Client Name');

header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetmp.sheet');
header('Content-Disposition: attachment;filename="php/sheets/gifting.xlsx"');
header('Cache-Control: max-age=0');

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2010');
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