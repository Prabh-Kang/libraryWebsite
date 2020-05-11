console.log("JavaScript Online");
displayNotes()
let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", saveNotes);

class Library {
    constructor(book, author, type) {
        this.bookName = book;
        this.authorName = author;
        this.type = type;
    }

}
function createBook() {
    let book = document.getElementById("bookName").value;
    let author = document.getElementById("authorName").value;
    let fiction = document.getElementById("gridRadios1");
    let biography = document.getElementById("gridRadios2");
    let war = document.getElementById("gridRadios3");
    let type;
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (biography.checked) {
        type = biography.value;
    }
    else {
        type = war.value;
    }
    let newBook = new Library(book, author, type);
    return newBook;

}

function saveNotes(e) {

    e.preventDefault();
    let newBook = createBook();
    console.log(newBook);

    let savedBooks = localStorage.getItem("savedBooks");
    let savedBooksArray;
    if (savedBooks == undefined) {
        savedBooksArray = [];
    }
    else {
        savedBooksArray = JSON.parse(savedBooks);
    }

    savedBooksArray.push(newBook);
    localStorage.setItem("savedBooks", JSON.stringify(savedBooksArray));
    document.getElementById("bookName").value = "";
    document.getElementById("authorName").value = "";
    displayNotes();

}

function displayNotes() {
    console.log("displaynotes fired");

    let savedBooks = localStorage.getItem("savedBooks");
    let savedBooksArray;
    let html = "";
    if (savedBooks == undefined) {
        savedBooksArray = [];
    }

    else {
        console.log("entered in else line 67");

        savedBooksArray = JSON.parse(savedBooks);
        // let html="";

        let id = 0;
        savedBooksArray.forEach((element) => {
            console.log("inside foreacch");

            html += `
        <tr>
            <td>${element.bookName}</td>
            <td>${element.authorName}</td>
            <td>${element.type}</td>
            <td><button class = "btn btn-outline-danger delBtn" id = "${id}"> Delete </button>
          </tr>`
            id++;
        });
        // console.log("html is ", html);
    }
    console.log("else loop exit");

    if (html == " " || html == "  " || html == "") {
        if (!document.getElementById("dataTable").classList.contains("d-none")) {
            document.getElementById("dataTable").classList.add("d-none");
            console.log(" d-none added in the if statement");
        }

    }
    else {
        if (document.getElementById("dataTable").classList.contains("d-none")) {
            document.getElementById("dataTable").classList.remove("d-none");
            console.log(" d-none removed in the else statement");
        }
        if (!document.getElementById("errorMsg").classList.contains("d-none")) {
            document.getElementById("errorMsg").classList.add("d-none");
        }
        console.log("about to write in the table body");

        document.getElementById("tableBody").innerHTML = html;
        console.log(document.getElementById("tableBody").innerHTML);

        delNote();
    }
}
function delNote() {
    // console.log(document.getElementsByClassName("delBtn"));
    Array.from(document.getElementsByClassName("delBtn")).forEach(element => {
        element.addEventListener("click", function (e) {
            elid = e.target.id;
            console.log(elid);
            let savedBooks = localStorage.getItem("savedBooks");
            let savedBooksArray = JSON.parse(savedBooks);
            savedBooksArray.splice(elid, 1)
            localStorage.setItem("savedBooks", JSON.stringify(savedBooksArray));
            console.log("about to fire displaynoes from delnote");

            displayNotes();
        })
    })
}
let searchText = document.getElementById("searchText");
console.log(searchText.value);

searchText.addEventListener("keyup", searchNotes)

function searchNotes() {
    console.log("key up was fired ");

    console.log(searchText.value);
    let savedBooks = localStorage.getItem("savedBooks");
    let savedBooksArray = JSON.parse(savedBooks);
    if (searchText.value == "" || searchText.value == " " || searchText.value == undefined | searchText.value == null) {
        console.log("searchtext.value is empty ", searchText.value);
        displayNotes()
    }
    else {
        let searchTable = "";
        let id = 0;
        savedBooksArray.forEach(element => {
            if (element.bookName.toLowerCase().includes(searchText.value.toLowerCase()) || element.authorName.toLowerCase().includes(searchText.value.toLowerCase())) {
                searchTable += `
                <tr>
                    <td>${element.bookName}</td>
                    <td>${element.authorName}</td>
                    <td>${element.type}</td>
                    <td><button class = "btn btn-outline-danger delBtn" id = "${id}"> Delete </button>
                  </tr>
                  
                `
                id++;
            }
        })
        if (searchTable == "") {
            // document.getElementById("dataTable").style.display = "none";
            if (!document.getElementById("dataTable").classList.contains("d-none")) {
                document.getElementById("dataTable").classList.add("d-none");
            }
            if (document.getElementById("errorMsg").classList.contains("d-none")) {
                document.getElementById("errorMsg").classList.remove("d-none");
            }

        }
        else {
            if (document.getElementById("dataTable").classList.contains("d-none")) {
                document.getElementById("dataTable").classList.remove("d-none");
            }
                // document.getElementById("dataTable").style.display = "table";
                if (!document.getElementById("errorMsg").classList.contains("d-none")) {
                    document.getElementById("errorMsg").classList.add("d-none");
                }
                document.getElementById("tableBody").innerHTML = searchTable;
                delNote();
            }

        }
    }
