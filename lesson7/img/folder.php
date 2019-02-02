<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Document</title>
<link rel="stylesheet" href="https://anatolykulikov.ru/demo/geekbrains/lesson-7/css/folder.css">
</head>
<body>
<div class="Files">
   <header><a href="javascript:history.back();"><img src="https://image.flaticon.com/icons/svg/271/271220.svg" alt="Назад"></a><span>Список файлов</span></header>
    <main>
        <?php $arDellow = array(".","..",".DS_Store","folder.php","folder.css","desc.txt"); $folders = scandir("."); foreach($folders as $folder) {if(!in_array($folder,$arDellow)) {?>
        <a title="Открыть <?php echo $folder ?>" href="<?php echo $folder ?>" data-time="<?php echo date("d-m-Y", filectime($folder)); ?>"><?php echo $folder ?></a>
        <?php }} ?>
    </main>
</div>
</body>
</html>