<?php
require('connect.php');
extract($_POST);
$files_sql = $db->prepare("SELECT * FROM `files` WHERE `папка` = ?");
$files_sql->execute(array($folder_id));
$files_get = $files_sql->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($files_get);
die;
?>