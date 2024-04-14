<?php
require('connect.php');
extract($_POST);
extract($_FILES);
$pos = strpos($file['name'], ".");
$file_type = substr($file['name'], $pos + 1);
$destination = $_SERVER['DOCUMENT_ROOT'] . '/Documents/' . $file['name'];
move_uploaded_file($file['tmp_name'],$destination);
$sql = $db->prepare("INSERT INTO `files`(`имя`, `расширение`, `папка`, `размер`, `дата_создания`) VALUES (?,?,?,?,NOW())");
$sql->execute(array(
    $file['name'],
    $file_type,
    $folder_id,
    $file['size'],
));
die();

