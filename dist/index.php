<!--Bootstrap css-->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<!--FontAwesome-->
<script src="https://kit.fontawesome.com/e9f4f867a7.js" crossorigin="anonymous"></script>
<!--Style-->
<link rel="stylesheet" href="../styles/style.css">

<body class="d-flex flex-column align-items-start mx-auto mt-5 p-5 gap-3" style="width: 800px">
<div class="block_search">
    <div class="search_type">
        <a onclick="searchOpen('name')" class="search" id="search_by_name">По названию</a>
        <a onclick="searchOpen('folder')" class="search" id="search_by_folder">По папке</a>
        <a onclick="searchOpen('type')" class="search" id="search_by_type">По типу</a>
    </div>
</div>
<div id="bread" class="bread">

</div>
<main class="row d-flex justify-items-center flex-row justify-content-center gap-3" style="width: 800px">
    <div id="block" class="border d-flex flex-column align-items-baseline gap-2 p-2 col-5" style="width: fit-content">

    </div>
    <aside class="col-3 p-2 border d-flex flex-column">
        <a onclick="modalFolderDisplay()" class="title">Создавить папку</a>
        <a onclick="modalFileDisplay()" class="title">Добавить файл</a>
    </aside>
</main>

<div style="display: none" class="modal" id="modalFile">

</div>

<div style="display: none" class="modal" id="modalFolder">

</div>

<div style="display: none" class="modal" id="modalFolderEdit">

</div>
</body>

<!--Jquery-->
<script src="../js/jquery.js"></script>
<!--Bootstrap JS-->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
<!--JavaScript-->
<script src="../js/main.js"></script>

