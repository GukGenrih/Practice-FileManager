<?php
require('connect.php');
extract($_POST);
if ($type === 'folder'){
    $sql = $db->prepare("SELECT * FROM `folder` WHERE `имя` LIKE ?");
}
elseif ($type ==='type'){
    $sql = $db->prepare("SELECT * FROM `files` WHERE `расширение` LIKE ?");
}
elseif ($type ==='name'){
    $sql = $db->prepare("SELECT * FROM `files` WHERE `имя` LIKE ?");
}
$sql->execute(array('%'.$value.'%'));
$get = $sql->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($get);
die;
