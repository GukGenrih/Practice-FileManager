<?php
require('connect.php');
extract($_POST);
$sql = $db->prepare("UPDATE `folder` SET `имя`=? WHERE `id` = ?");
$sql->execute(array($name,$id));