<?php
require('connect.php');
$sql = $db->prepare(" SELECT DISTINCT `расширение` FROM `files` WHERE 1");
$sql->execute();
$get = $sql->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($get);
die();