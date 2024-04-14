<?php
require('connect.php');
extract($_POST);
$sql = $db->prepare("INSERT INTO `folder`(`имя`, `родительская_папка`) VALUES (?,?)");
$sql->execute(array(
    $folder_name,
    $folder_id
));
die;

