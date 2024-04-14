<?php
require('connect.php');
extract($_POST);
$folders_sql = $db->prepare("SELECT * FROM `folder` where `родительская_папка` = ?");
$folders_sql->execute(array($folder_id));
$folder_get = $folders_sql->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($folder_get);
die;
?>