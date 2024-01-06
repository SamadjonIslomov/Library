let BOOKS = JSON.parse(localStorage.getItem("books")) || [];
if (BOOKS.length > 0) kitoblar();

const addButton = document.querySelector(".above_add");
const ekran = document.querySelector(".ekran");
const yangiEkran = document.querySelector(".accept");

const form = document.querySelector(".book_form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const checkbox = document.querySelector("#absorb");

addButton.addEventListener("click", ochiqEkran);
yangiEkran.addEventListener("click", yopiqEkran);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") yopiqEkran();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newBook = {
    title: title.value,
    author: author.value,
    pages: pages.value,
    isRead: checkbox.checked,
  };

  BOOKS.push(newBook);
  setBooks();
  kitoblar();

  form.reset();
  yopiqEkran();
});

function ochiqEkran() {
  ekran.classList.add("open");
  yangiEkran.classList.add("open");
}
function yopiqEkran() {
  ekran.classList.remove("open");
  yangiEkran.classList.remove("open");
}

function kitoblar() {
  const kitobRoyxati = document.querySelector(".absolute");
  kitobRoyxati.innerHTML = "";
  BOOKS.forEach((book, index) => {
    const yangiKitob = document.createElement("div");
    yangiKitob.className = "container";

    yangiKitob.innerHTML = `
                    <h2 class="book__title">"${book.title}"</h2>
                    <h3 class="book__author">${book.author}</h3>
                    <h3 class="book__pages">${book.pages}</h3>
                    <div class="above-group">
                        ${
                          book.isRead
                            ? `<button class="above above_green" onclick="toggleRead(${index})">Read</button>`
                            : `<button class="above above_red" onclick="toggleRead(${index})">Not Read</button>`
                        }
                        <button class="above btn-remove" onclick="removeBook(${index})">Remove</button>
                    </div>
    `;
    kitobRoyxati.append(yangiKitob);
  });
}

function setBooks() {
  localStorage.setItem("books", JSON.stringify(BOOKS));
}

function toggleRead(id) {
  BOOKS = BOOKS.map((kitob, index) =>
    id === index ? { ...kitob, isRead: !kitob.isRead } : { ...kitob }
  );
  setBooks();
  kitoblar();
}

function removeBook(id) {
  BOOKS = BOOKS.filter((kitob, index) => id != index);
  setBooks();
  kitoblar();
}
