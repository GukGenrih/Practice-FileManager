let bread = []
const bread_DOM = $('#bread')
const block_DOM = $('#block')
const modalFile = $('#modalFile')
const modalFolder = $('#modalFolder')
const modalFolderEdit = $('#modalFolderEdit')
let currentFolder = 0
const search_types = $('.search_type')
const search_block = $('.block_search')
window.onload(paster(currentFolder))

// Поиск
async function allTypes() {
    let response = await fetch('../dist/scripts/getTypes.php')
    return response.json()
}

async function searchOpen(search_type = null) {
    if (search_types.css('display') === 'none') {
        $('.block_search_input').remove()
        search_types.show()
    } else {
        search_types.hide()
        switch (search_type) {
            case 'type':
                search_block.append(`
                        <div class="block_search_input">
                        <label for="search_input">Поиск по типу</label>
                        <select name="search_${search_type}" id="search_input">
                        </select>
                        <button onclick="searchGet('${search_type}')" type="submit" >Искать</button>
                        <a class="search" onclick="searchOpen()">Закрыть</a>
                        </div>
                `)
                let alltypes = await allTypes()
                alltypes.forEach(el => {
                    $('#search_input').append(`
                            <option value="${el.расширение}">
                            ${el.расширение}
                            </option>
                            `)
                })
                break
            case 'folder':
                search_block.append(`
                        <div class="block_search_input">
                        <label for="search_input">Поиск папки</label>
                        <input name="search_${search_type}" id="search_input" type="text">
                        <button onclick="searchGet('${search_type}')" type="submit" >Искать</button>
                        <a class="search" onclick="searchOpen()">Закрыть</a>
                        </div>
                `)
                break
            case 'name':
                search_block.append(`
                        <div class="block_search_input">
                        <label for="search_input">Поиск по названию</label>
                        <input name="search_${search_type}" id="search_input" type="text">
                        <button onclick="searchGet('${search_type}')" >Искать</button>
                        <a class="search" onclick="searchOpen()">Закрыть</a>
                        </div>
                `)
                break
        }
    }
}


async function searchGet(type_search) {
    let input_value = $('#search_input').val()
    let formdata = new FormData()
    formdata.append('value', input_value)
    formdata.append('type', type_search)
    let promise = await fetch('../dist/scripts/getSearch.php', {
        method: 'POST',
        body: formdata
    })
    bread_DOM.empty()
    bread_DOM.append(`
      <a class="title" onclick="removebread(0,0),searchOpen()">Вернуться</a>
`)
    if (type_search === 'folder') {
        parseSearchFolder(await promise.json())
    } else {
        parseSearch(await promise.json())
    }
}
// у папки отдельный вывод т.к. выводится с другими стилями, в БД у нее другие "элементы" и т.п.
function parseSearchFolder(search_data){
    block_DOM.empty()
    search_data.forEach(el => {
        block_DOM.append(`
     <div style="width: 400px"
         class="d-flex gap-3 flex-row p-2 justify-content-start align-items-center border">
        <i class="fa-regular fa-folder"></i>
        <a onclick="pasterNoBread(${el.id})" class="title folder">${el.имя}</a>
        <i class="fa-regular fa-circle-xmark"></i>
    </div>
    `)
    })
}
function parseSearch(search_data) {
    block_DOM.empty()
    search_data.forEach(el => {
        block_DOM.append(`
    <div style="width: 400px"
         class="d-flex gap-3 align-items-center flex-row p-2 justify-content-start align-items-center border">
        <a href="../Documents/${el.имя}" download class="title">${el.имя}</a>
        <span href="#" class="large">${el.размер} Байт</span>
        <span href="#" class="create_data">${el.дата_создания}</span>
        <i class="fa-regular fa-circle-xmark"></i>
    </div>
    `)
    })

}


// вывод в Main
async function files(folder_id) {
    let formdata = new FormData()
    formdata.append('folder_id', folder_id)
    let promise_file = await fetch('../dist/scripts/getFiles.php', {
        method: 'POST',
        body: formdata
    })
    return (await promise_file.json())
}


async function folders(folder_id) {
    let formdata = new FormData()
    formdata.append('folder_id', folder_id)
    let promise_file = await fetch('../dist/scripts/getFolders.php', {
        method: 'POST',
        body: formdata
    })
    return (await promise_file.json())
}


async function breadFunc(folder_id) {
    if (folder_id === 0) {
        return ({
            id: 0,
            имя: 'Main'
        })
    } else {
        let formdata = new FormData()
        formdata.append('folder_id', folder_id)
        let promise_file = await fetch('../dist/scripts/getBread.php', {
            method: 'POST',
            body: formdata
        })
        return (await promise_file.json())
    }
}


async function removebread(folder_id, count_delete) {
    bread = bread.slice(0, count_delete)
    paster(folder_id)
}


function insertBread(bread) {
    // счетчик "дороги" для крошек
    let i = 0
    // Заполнение страницы
    bread.forEach(el => {
        bread_DOM.append(`
        <a class="title" onclick="removebread(${el.id},${i})">${el.имя}/</a>
        `)
        i += 1
    })
    currentFolder = bread.slice(-1)
}

async function deleteFromDB(id,type){
    let formdata = new FormData
    formdata.append('id',id)
    formdata.append('type',type)
    await fetch('../dist/scripts/delete_from_database.php',{
        method:'POST',
        body:formdata
    })
    pasterNoBread(currentFolder[0].id)
}
async function editFolder(id){
    $('#formedit').on('submit',async function(event){
        event.preventDefault()
        let new_name = $('#new_name').val()
        let formdata = new FormData
        formdata.append('id',id)
        formdata.append('name',new_name)
        await fetch('../dist/scripts/editFolder.php',{
            method:'POST',
            body:formdata
        })
        pasterNoBread(currentFolder[0].id)
        modalFolderEdit.hide()
        modalFolderEdit.empty()
    })
}

function editFolderModal(id,name){
    if (modalFolderEdit.css('display') === 'none') {
        modalFolderEdit.show()
        modalFolderEdit.append(`
         <form action="../dist/scripts/make_new.php" id="formedit" method="POST" enctype="multipart/form-data" class="bg-light p-5 rounded" style="margin-top: -25%">
            <div class="d-flex justify-content-between align-items-center">
                    <a onclick="editFolderModal(id,name)" class="fa-regular fa-circle-xmark"></a>
            </div>
            <div class="form-group mb-1">
                <label for="exampleInputEmail1">Изменение файла</label>
                 <input type="text" name="name" value="${name}" class="form-control" id="new_name" aria-describedby="emailHelp"
                       placeholder="и видит голубые ели...">
            </div>
            <button class="btn btn-primary">Изменить</button>
        </form>
        `)
        editFolder(id)
    } else {
        modalFolderEdit.hide()
        modalFolderEdit.empty()
    }
}

function insertFolder(folder) {
    folder.forEach(el => {
        block_DOM.append(`
        <div style="width: 400px"
         class="d-flex gap-3 flex-row p-2 justify-content-start align-items-center border">
        <i class="fa-regular fa-folder"></i>
        <a onclick="paster(${el.id})" class="title folder">${el.имя}</a>
        <a onclick="deleteFromDB(${el.id},'folder')" class="fa-regular fa-circle-xmark"></a>
        <a onclick="editFolderModal(${el.id},'${el.имя}')" class="fa-regular fa-pen-to-square"></a>
<!--хотел еще сделать так, чтобы можно было меня расположение папки, но как представил условие чтобы ее нельзя было закинуть во внутренюю папку и дальше, заболела голова и я решил так не делать :)        el.родительская_папка-->
    </div>
        `)
    })
}


function insertFile(file) {
    file.forEach(el => {
        block_DOM.append(`
         <div style="width: 400px"
         class="d-flex gap-3 align-items-center flex-row p-2 justify-content-start align-items-center border">
        <a href="../Documents/${el.имя}" download class="title">${el.имя}</a>
        <span href="#" class="large">${el.размер} Байт</span>
        <span href="#" class="create_data">${el.дата_создания}</span>
        <a onclick="deleteFromDB(${el.id},'file')" class="fa-regular fa-circle-xmark"></a>
    </div>
        `)
    })
}


function insertMain(file, folder) {
    //Проверка есть ли что-то в папке
    if ((file.length === 0) && (folder.length === 0)) {
        block_DOM.append(`
         <div style="width: 400px"
         class="d-flex gap-3 flex-row p-2 justify-content-start align-items-center border">
        <span class="title folder">Здесь ничего нет</span>
    </div>
`)
    } else {
        //Вывод внутренних папок
        insertFolder(folder)
        //Вывод внутренних файлы
        insertFile(file)
    }
}

// Меняем на пост так как оказывается джаваскрипт хуй мне а не файл даст
async function addFile() {
    let new_file = $('#addfile').val()
    let formdata = new FormData()
    formdata.append('file', new_file)
    let promise_file = await fetch('../dist/scripts/make_new.php', {
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'POST',
        body: formdata,

    })
    console.log(await promise_file.json())
    return (await promise_file.json())
}


async function addFolder() {
    let new_folder = $('#addfolder').text()
    console.log(new_folder)
}


function newFileDB() {
    $('#formadd').on("submit", async function (event) {
        event.preventDefault();
        let form = new FormData
        form.append('file', ($('#addfile')[0].files[0]))
        form.append('folder_id', currentFolder[0].id)

        let promise_file = fetch('../dist/scripts/make_new.php', {
            method: 'POST',
            body: form,
        })
        let result = await promise_file.then(modalFile.hide(), modalFile.empty())
        pasterNoBread(currentFolder[0].id)
    })
}


function newFolderDB() {
    $('#formadd_folder').on("submit", async function (event) {
        event.preventDefault();
        let form = new FormData
        form.append('folder_name', ($('#addFolder').val()))
        form.append('folder_id', currentFolder[0].id)

        let promise_folder = fetch('../dist/scripts/make_folder.php', {
            method: 'POST',
            body: form,
        })
        let result = await promise_folder.then(modalFolder.hide(), modalFolder.empty())
        pasterNoBread(currentFolder[0].id)
    })
}



async function paster(folder_id = 0) {
    // Получение папкок,файлов из папок, обновление "крошки"
    let folder = await folders(folder_id)
    let file = await files(folder_id)
    bread.push(await breadFunc(folder_id))
    // Очистка страницы
    block_DOM.empty()
    bread_DOM.empty()

    // Заполнение крошки
    insertBread(bread)

    //  Заполнение "папки???"
    insertMain(file, folder)
}

// используется при добавлении файла\папки, отдельно без крошек чтобы крошка не дублировалась (возможно не так, комменты начал делать после проекта и теперь понимаю почему это не правильно)
async function pasterNoBread(folder_id = 0) {
    // Получение папкок,файлов из папок, обновление "крошки"
    let folder = await folders(folder_id)
    let file = await files(folder_id)
    // Очистка страницы
    block_DOM.empty()
    //  Заполнение "папки???"
    insertMain(file, folder)
}


async function modalFileDisplay() {
    if (modalFile.css('display') === 'none') {
        console.log(currentFolder)
        modalFile.show()
        modalFile.append(`
         <form action="../dist/scripts/make_new.php" id="formadd" method="POST" enctype="multipart/form-data" class="bg-light p-5 rounded" style="margin-top: -25%">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <span>Добавление в </span>
                    <span style="font-weight: bold">${currentFolder[0].имя}</span>
                </div>
                    <a onclick="modalFileDisplay()" class="fa-regular fa-circle-xmark"></a>
            </div>
            <div class="form-group mb-1">
                <label for="exampleInputEmail1">Добавление файла</label>
                 <input type="file" name="file" class="form-control" id="addfile" aria-describedby="emailHelp"
                       placeholder="и видит голубые ели...">
            </div>
            <button class="btn btn-primary">Добавить</button>
        </form>
        `)
        newFileDB()
    } else {
        modalFile.hide()
        modalFile.empty()
    }
}


function modalFolderDisplay() {
    if (modalFolder.css('display') === 'none') {
        modalFolder.show()
        modalFolder.append(`
         <form action="../dist/scripts/make_new.php" id="formadd_folder" class="bg-light p-5 rounded" style="margin-top: -25%">
            <div class="d-flex justify-content-between allign-items-center">
                <div>
                    <span>Добавление в </span>
                    <span style="font-weight: bold">${currentFolder[0].имя}</span>
                </div>
                    <a onclick="modalFolderDisplay()" class="fa-regular fa-circle-xmark"></a>
            </div>
            <div class="form-group mb-1">
                <label for="exampleInputEmail1">Добавление папки</label>
                <input type="text" name="folder" class="form-control" id="addFolder" aria-describedby="emailHelp"
                       placeholder="идет штирлиц по лесу...">
            </div>
            <button class="btn btn-primary">Добавить</button>
        </form> 
        `)
        newFolderDB()
    } else {
        modalFolder.hide()
        modalFolder.empty()
    }
}