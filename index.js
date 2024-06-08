var Bookmarker_Name_input = document.getElementById('Bookmarker_Name');
var Website_URL_input = document.getElementById('Website_URL');
var display_book = document.getElementById('display_book');
var searchTerm = document.getElementById('searchTerm');
var alert = document.getElementById('alert');

//CreatBook
var bookList;
if (localStorage.getItem("Bookmarker") != null) {
    bookList = JSON.parse(localStorage.getItem("Bookmarker"));
    displayBook(bookList);
}
else {
    bookList = [];
}

function sendInfo() {
    var book = {
        Name: Bookmarker_Name_input.value,
        URL: Website_URL_input.value,
    }
    if (Bookmarker_Name_input.classList.contains('is-valid') && Website_URL_input.classList.contains('is-valid') == true) {
        bookList.push(book);
        localStorage.setItem('Bookmarker', JSON.stringify(bookList));
        displayBook(bookList);
        alert.classList.add('d-none');
        clearForm();
    }
    else {
        alert.classList.remove('d-none');
    }
}

//clear form
function clearForm() {
    var book = {
        Name: Bookmarker_Name_input.value = '',
        URL: Website_URL_input.value = '',
    }
    Bookmarker_Name_input.classList.remove('is-valid');
    Bookmarker_Name_input.classList.remove('is-invalid');

    Website_URL_input.classList.remove('is-valid');
    Website_URL_input.classList.remove('is-invalid');

}


//display
function displayBook(list) {
    var contain = '';
    for (var i = 0; i < list.length; i++) {
        contain += `<tr>
        <th>${i + 1}</th>
        <th>${list[i].Name}</th>
        <th>
            <button class="btn btn-visit">
                <i class="fa-solid fa-eye pe-2"></i>
                <a href="${list[i].URL}" target="_blank">Visit</a>
            </button>
        </th>
        <th>
            <button class="btn btn-delete" onclick="Delete(${i})">
                <i class="fa-solid fa-trash-can pe-1"></i>
                delete
            </button>
        </th>
    </tr>`
    }
    display_book.innerHTML = contain;
}

//deleteBook
function Delete(index) {

    bookList.splice(index, 1);
    localStorage.setItem('Bookmarker', JSON.stringify(bookList));
    displayBook(bookList);

}


//search
function search() {

    var searchBook = [];
    for (var i = 0; i < bookList.length; i++) {
        if (bookList[i].Name.toLowerCase().includes(searchTerm.value.toLowerCase()) == true) {
            searchBook.push(bookList[i]);
        }
    }
    displayBook(searchBook);
}


//valid
function re(input) {
    var reglar = {
        Bookmarker_Name: /\w{3,}/,
        Website_URL: /^(https?:\/\/)?(bit\.|www\.)[\w]{2,}(\/.{0,}|\..{2,})?$/,
    }

    if (reglar[input.id].test(input.value) == true) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
    }
    else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }
}
