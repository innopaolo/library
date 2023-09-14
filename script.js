// Popup modal interactivity
const addBtn = document.getElementById("add-btn");
const addPopup = document.getElementById("add-popup");
const closeBtn = document.getElementById("close-popup");
const cardsContainer = document.querySelector(".cards-container");

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

// Add constraint validation custom message
const pagesInput = document.getElementById("pages");

pagesInput.addEventListener("input", () => {
  if (pagesInput.validity.rangeOverflow) {
    pagesInput.setCustomValidity("Is it truly that long???");
  } else {
    pagesInput.setCustomValidity("");
  }
});

// Dynamically add book cards
let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = title + author;
  }

  toggleRead() {
    const toggleStatus = document.querySelector(`[data-book-id="${this.id}"]`);

    // Conditional wrapper to ensure that the element exists before toggling
    if (toggleStatus && toggleStatus.classList.contains("read-status")) {
      if (this.read) {
        toggleStatus.textContent = "Currently reading";
        this.read = false;
      } else {
        toggleStatus.textContent = "Finished";
        this.read = true;
      }
    }
  }

  removeBook() {
    const removeBtn = document.querySelector(
      `span.remove-btn[data-book-id="${this.id}"]`,
    );

    if (removeBtn && removeBtn.classList.contains("remove-btn")) {
      let bookIndex = myLibrary.findIndex((object) => object.id === this.id);
      myLibrary.splice(bookIndex, 1); // Delete book from array using its index

      // Deletes the associated DOM element
      removeBtn.closest(".card-content").remove();
    }
  }
}

// Form submit action  
const bookFormInfo = document.getElementById("book-info");
const errorMessage = document.querySelector(".error-message");

bookFormInfo.addEventListener("submit", (e) => {
  e.preventDefault();

  let title = document.getElementById("book-title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").checked ? true : false;

  let newBook = new Book(title, author, pages, read);

  // Check if object already exists in myLibrary before pushing
  let exists = myLibrary.some(
    (book) =>
      book.title === newBook.title &&
      book.author === newBook.author &&
      book.pages === newBook.pages,
  );

  if (!exists) {
    myLibrary.push(newBook);

    // Use the book object's id to associate it with its DOM element
    const bookID = newBook.id;

    bookFormInfo.reset();
    addBooktoDashboard(newBook, bookID);

    // Exit the popup modal
    addPopup.style.display = "none";
  } else {
    errorMessage.textContent = "Book already exists!";
    errorMessage.style.display = "block";
  }
});

function addBooktoDashboard(newBook, bookID) {
  let newCard = document.createElement("div");
  newCard.className = "card-content";

  // Create DOM elements for the card content, avoiding innerHTML
  let titleAuthorContainer = document.createElement("div");

  let title = document.createElement("h2");
  title.textContent = newBook.title;
  let author = document.createElement("p");
  author.textContent = "by" + " " + newBook.author;
  let pages = document.createElement("p");
  pages.textContent = newBook.pages + " " + "pages";

  let bottomPart = document.createElement("div");
  bottomPart.className = "bottom-part";

  let readStatus = document.createElement("p");
  readStatus.className = "read-status";
  readStatus.setAttribute("data-book-id", bookID); // To identify book for toggling read status
  readStatus.textContent = newBook.read ? "Finished" : "Currently reading";

  let removeBtn = document.createElement("span");
  removeBtn.className = "remove-btn";
  removeBtn.setAttribute("data-book-id", bookID); // To identify book for removal
  removeBtn.textContent = "\u{1F5D1}"; // Unicode for wastebasket

  titleAuthorContainer.appendChild(title);
  titleAuthorContainer.appendChild(author);
  newCard.appendChild(titleAuthorContainer);
  newCard.appendChild(pages);
  bottomPart.appendChild(readStatus);
  bottomPart.appendChild(removeBtn);
  newCard.appendChild(bottomPart);

  cardsContainer.appendChild(newCard);
}

// Listener for both toggling and remove
cardsContainer.addEventListener("click", (event) => {
  const bookId = event.target.getAttribute("data-book-id");
  const book = myLibrary.find((book) => book.id === bookId);

  if (event.target.classList.contains("read-status")) {
    if (book) {
      book.toggleRead();
    }
  } else if (event.target.classList.contains("remove-btn")) {
    if (book) {
      book.removeBook();
    }
  }
});
