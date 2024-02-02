const elements = {
  addBook: document.querySelector(".add-book"),
  mainDiv: document.querySelector(".main-div"),
  submitBtn: document.querySelector(".submitBtn"),
  wrapper: document.querySelector(".wrapper"),
  titleInput: document.querySelector(".first"),
  authorInput: document.querySelector(".second"),
  pagesInput: document.querySelector(".third"),
  checkbox: document.querySelector(".checkbox-input"),
  overlay: document.querySelector(".overlay"),
};

let BOOKS = JSON.parse(localStorage.getItem("BOOKS")) || [];

function updateLocalStorage() {
  localStorage.setItem("BOOKS", JSON.stringify(BOOKS));
}

function toggleOverlay(display = false) {
  elements.mainDiv.classList.toggle("add-to-main-div", display);
  elements.overlay.style.display = display ? "block" : "none";
}

function createElement(type, className, text) {
  const element = document.createElement(type);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function addBookToDOM(book) {
  const newDiv = createElement("div", "table");
  elements.wrapper.append(newDiv);

  newDiv.append(createElement("h2", "table-title", `"${book.title}"`));
  newDiv.append(createElement("p", "author", book.author));
  newDiv.append(createElement("p", "pages", book.pages));

  const readBtn = createElement(
    "button",
    `table-btn ${book.isRead ? "read" : "not-read"}`,
    book.isRead ? "Read" : "Not Read"
  );
  const removeBtn = createElement("button", "table-btn remove", "Remove");
  newDiv.append(readBtn, removeBtn);

  removeBtn.addEventListener("click", () => {
    elements.wrapper.removeChild(newDiv);
    BOOKS = BOOKS.filter((b) => b !== book);
    updateLocalStorage();
  });

  readBtn.addEventListener("click", () => {
    book.isRead = !book.isRead;
    readBtn.className = `table-btn ${book.isRead ? "read" : "not-read"}`;
    readBtn.textContent = book.isRead ? "Read" : "Not Read";
    updateLocalStorage();
  });
}

function saveOnStorage() {
  elements.wrapper.innerHTML = "";
  BOOKS.forEach(addBookToDOM);
}

function addBook(event) {
  event.preventDefault();
  const { titleInput, authorInput, pagesInput, checkbox } = elements;
  if (titleInput.value && authorInput.value && pagesInput.value) {
    const newBook = {
      title: titleInput.value,
      author: authorInput.value,
      pages: pagesInput.value,
      isRead: checkbox.checked,
    };
    BOOKS.push(newBook);
    updateLocalStorage();
    saveOnStorage();
    toggleOverlay();

    titleInput.value = authorInput.value = pagesInput.value = "";
    checkbox.checked = false;
  }
}

elements.addBook.addEventListener("click", () => toggleOverlay(true));
elements.submitBtn.addEventListener("click", addBook);
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") toggleOverlay();
});
elements.overlay.addEventListener("click", () => toggleOverlay());

saveOnStorage();
