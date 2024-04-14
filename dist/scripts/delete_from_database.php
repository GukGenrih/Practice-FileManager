<?php
require('connect.php');
extract($_POST);
if ($type === 'file'){
    $sql =$db->prepare("DELETE FROM `files` WHERE `id` = ?");
    $sql->execute(array($id));
}
if ($type === 'folder'){
    $sql =$db->prepare("DELETE FROM `folder` WHERE `id` = ?");
    $sql->execute(array($id));

    $sql_for_files_in_folder =$db->prepare("DELETE FROM `files` WHERE `папка` =?");
    $sql_for_files_in_folder->execute(array($id));

    $sql_for_folders_in_folder =$db->prepare("DELETE FROM `folder` WHERE `родительская_папка` =?");
    $sql_for_folders_in_folder->execute(array($id));
}
// по идее можно сделать зацикленный фетч запрос, в который будет поступать наша папка(а) и выводилась её внутренняя папка(б) (а если папок внутри несколько?) и если в папке (б) есть еще папка то запрсос бы лез в нее и так до конца. Уже из нее (конечной папки) удалял все вместе с самой папкой вплоть до папки (а)
