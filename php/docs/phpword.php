<?php
require_once '/../../../PhpWord/src/phpword/Autoloader.php';
\PhpOffice\PhpWord\Autoloader::register();
echo "Got there";

$templateProcessor = new TemplateProcessor('PA-pos2no.docx');
$templateProcessor->setValue('{pname}', 'Joe Blow');
$templateProcessor->setValue('{a1name}', 'Coming-Undone-Street 32');
?>