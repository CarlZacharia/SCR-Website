<?php
    $pname = (string) $_POST['pname'];
    $countyres = (string) $_POST['countyres'];
    $a1name = (string) $_POST['fa1name'];
    $a2name = (string) $_POST['fa2name'];
    $hca1name = (string) $_POST['fhca1name'];
    $hca2name = (string) $_POST['fhca2name'];
    $atty = (string) $_POST['atty'];
    $countyres = (string) $_POST['countyres'];
    $fn = 'POA-'.$pname.'.docx';
    $s = "docs_archive/FLA-poas2no.docx";
    $wordDoc = "POA-".$pname.".docx";
    copy($s, $wordDoc);


    $zip = new ZipArchive;
    //This is the main document in a .docx file.
    $fileToModify = 'word/document.xml';

    if ($zip->open($wordDoc) === TRUE) {
        //Read contents into memory
        $newContents = $zip->getFromName($fileToModify);

        //Modify contents:
        $newContents = str_replace('principality', $pname, $newContents);
        $newContents = str_replace('alabama', $a1name, $newContents);
        $newContents = str_replace('atlanta', $a2name, $newContents);
        $newContents = str_replace('anchorage', $hca1name, $newContents);
        $newContents = str_replace('abbington', $hca2name, $newContents);
        $newContents = str_replace('counties', $countyres, $newContents);

        //Delete the old...
        $zip->deleteName($fileToModify);
        //Write the new...
        $zip->addFromString($fileToModify, $newContents);
        //Open Footer and change vars there
        $ft = 'word/footer2.xml';
        $oldft = $zip->getFromName($ft);
        $newft = str_replace('principality', $pname, $oldft);
        $zip->deleteName($ft);
        $zip->addFromString($ft, $newft);

        $ft = 'word/footer7.xml';
        $oldft = $zip->getFromName($ft);
        $newft = str_replace('principality', $pname, $oldft);
        $zip->deleteName($ft);
        $zip->addFromString($ft, $newft);

        $ft = 'word/footer9.xml';
        $oldft = $zip->getFromName($ft);
        $newft = str_replace('principality', $pname, $oldft);
        $zip->deleteName($ft);
        $zip->addFromString($ft, $newft);
        //And write back to the filesystem.
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