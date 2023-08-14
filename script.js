// Popup modal interactivity
const addBtn = document.getElementById("add-btn");
const addPopup = document.getElementById("add-popup");
const closeBtn = document.getElementById("close-popup");

addBtn.addEventListener("click", () => {
  addPopup.style.display = "flex";
});

window.addEventListener("click", (e) => {
    if (e.target === addPopup) {
        addPopup.style.display = "none";
    }
});

closeBtn.addEventListener("click", () => {
    addPopup.style.display = "none";
});


// Dynamically add book cards
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
 
const bookFormInfo = document.getElementById("book-info");
const errorMessage = document.querySelector('.error-message');

bookFormInfo.addEventListener("submit", (e) => {
    e.preventDefault();

    let title = document.getElementById("book-title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked ? true : false;

    let newBook = new Book(title, author, pages, read);

    // Check if object already exists in myLibrary before pushing
    let exists = myLibrary.some(book =>
       book.title === newBook.title &&
       book.author === newBook.author &&
       book.pages === newBook.pages 
    );
    if (!exists) {
        myLibrary.push(newBook);
        addForm.reset();
        // Exit the popup modal
        addPopup.style.display = "none";
    } else {
        errorMessage.textContent = "Book already exists!";
        errorMessage.style.display = "block";
    }
});



function addBooktoLibrary() {

}
