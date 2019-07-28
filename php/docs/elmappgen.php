<?php
    $addressee = (string) $_POST['addressee'];
    $add1 = (string) $_POST['add1'];
    $csz = (string) $_POST['csz'];
    $sal = (string) $_POST['sal'];
    $clientname = (string) $_POST['clientname'];
    $fee = (string) $_POST['fee'];
    $atty = (string) $_POST['atty'];
    $fn = 'ELMFeeAgree-'.$clientname.'.docx';
    $s = "docs_archive/ELM-App.docx";
    $wordDoc = "ELMFeeAgree-".$clientname.".docx";
    copy($s, $wordDoc);


    $zip = new ZipArchive;
    //This is the main document in a .docx file.
    $fileToModify = 'word/document.xml';

    if ($zip->open($wordDoc) === TRUE) {
        //Read contents into memory
        $newContents = $zip->getFromName($fileToModify);

        //Modify contents:
        $newContents = str_replace('{addressee}', $addressee, $newContents);
        $newContents = str_replace('{add1}', $add1, $newContents);
        $newContents = str_replace('{city}', $csz, $newContents);
        $newContents = str_replace('{client}', $clientname, $newContents);
        $newContents = str_replace('{salutation}', $sal, $newContents);
        $newContents = str_replace('{fee}', $fee, $newContents);
        $newContents = str_replace('{attorney}', $atty, $newContents);

        //Delete the old...
        $zip->deleteName($fileToModify);
        //Write the new...
        $zip->addFromString($fileToModify, $newContents);
        //Open Footer and change vars there
        $zip->close();

    header('Content-Description: File Transfer');
    header("Content-Type: application/force-download");
    header('Content-Type: application/msword');
    header('Content-Disposition: attachment; filename="'.$fn.'"');
    header('Content-Transfer-Encoding: binary');
    header("Pragma: public");
    header("Expires: 0");
    header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
    readfile($fn);
    unlink($fn);
    exit();

    }

?>