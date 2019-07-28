<?php
    $husband = (string) $_POST['husband'];
    $heirs = (string) $_POST['heirs'];
    $nochildren = intval($_POST['kiddies']);
    $a1name = (string) $_POST['a1namef'];
    $a2name = (string) $_POST['a2namef'];
    $atty = (string) $_POST['atty'];
    $countyres = (string) $_POST['countyres'];

    if($nochildren == 0){
        $mychildren = '';
        $personalty = 'those individual(s) listed in my residuary estate below, in substantially equal shares, to be divided among them as they shall agree, or if they cannot agree, as my Personal Representative shall determine.  ';
    }
    else if($nochildren == 1){
        $mychildren = "I have one child, ".$heirs.".";
        $personalty = " my child ".$heirs.".";

    }
    else {
        $mychildren = "I have ".$nochildren." children, they are ".$heirs.".";
        $personalty = "those of my children, ". $mychildren. ", in substantially equal shares, to be divided among them as they shall agree, or if they cannot agree, as my Personal Representative shall determine.";
    }

    $fn = 'Will-'.$husband.'.docx';
    $s = "docs_archive/PA-Will-Male-Single.docx";
    $wordDoc = 'Will-'.$husband.'.docx';
    copy($s, $wordDoc);


    $zip = new ZipArchive;
    //This is the main document in a .docx file.
    $fileToModify = 'word/document.xml';

    if ($zip->open($wordDoc) === TRUE) {
        //Read contents into memory
        $newContents = $zip->getFromName($fileToModify);

        //Modify contents:
        $newContents = str_replace('hubby', $husband, $newContents);
        $newContents = str_replace('alabama', $a1name, $newContents);
        $newContents = str_replace('atlanta', $a2name, $newContents);
        $newContents = str_replace('heirlooms', $heirs, $newContents);
        $newContents = str_replace('#attorney', $atty, $newContents);
        $newContents = str_replace('kiddies', $mychildren, $newContents);
        $newContents = str_replace('nochildren', $nochildren, $newContents);       
        $newContents = str_replace('counties', $countyres, $newContents);
        $newContents = str_replace('personalty', $personalty, $newContents);        

        //Delete the old...
        $zip->deleteName($fileToModify);
        //Write the new...
        $zip->addFromString($fileToModify, $newContents);
        //Open Footer and change vars there
        $ft = 'word/footer2.xml';
        $oldft = $zip->getFromName($ft);
        $newft = str_replace('hubby', $husband, $oldft);      
        $zip->deleteName($ft);
        $zip->addFromString($ft, $newft);

        $ft = 'word/footer4.xml';
        $oldft = $zip->getFromName($ft);
        $newft = str_replace('hubby', $husband, $oldft);
         $zip->deleteName($ft);
        $zip->addFromString($ft, $newft);

        $ft = 'word/footer6.xml';
        $oldft = $zip->getFromName($ft);
        $newft = str_replace('hubby', $husband, $oldft);    
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