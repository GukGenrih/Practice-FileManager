<?php
require('connect.php');
extract($_POST);
$folders_sql = $db->prepare("SELECT * FROM `folder` where `id` = ?");
$folders_sql->execute(array($folder_id));
$folder_get = $folders_sql->fetch(PDO::FETCH_ASSOC);
echo json_encode($folder_get);
die;
?><?php
