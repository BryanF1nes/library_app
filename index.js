const myLibrary = [];

(function main() {
  const form = document.querySelector("form");
  const formModal = document.querySelector(".form-modal");
  const root = document.querySelector("#root");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    createBook(title, author, pages, read);
    form.reset();
    formModal.classList.add("off");
    root.classList.remove("blur");
  });

  handleModal();
})();

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.hasRead = function () {
  if (!this.read) return "I have NOT read the book";
  return "I have read the book";
};

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${
    this.pages
  } pages. ${this.hasRead()}`;
};

Book.prototype.changeRead = function () {
  this.read = !this.read;
};

function createBook(title, author, pages, read) {
  const book = new Book(title, author, pages, read);

  myLibrary.push(book);
  renderBooks(myLibrary);
}

function renderBooks(array) {
  const root = document.querySelector("#root");

  root.innerHTML = "";

  array.forEach((book, index) => {
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const p = document.createElement("p");
    div.classList.add("book-container");
    div.id = index;
    p.textContent = book.info();

    function handleRead() {
      book.changeRead();
      p.textContent = "";
      p.textContent = book.info();
    }

    div.appendChild(p);
    div2.appendChild(createButton("Read", () => handleRead()));
    div2.appendChild(
      createButton("Delete", (e) => {
        const parentElement = e.target.parentNode.parentNode;
        const parentElementId = e.target.parentNode.parentNode.id;
        myLibrary.splice(parentElementId, 1);
        parentElement.remove();
      })
    );
    div.appendChild(div2);
    root.appendChild(div);
  });
}

function createButton(text, eventHandler) {
  const button = document.createElement("button");
  button.textContent = text;

  button.addEventListener("click", eventHandler);

  return button;
}

function handleModal() {
  const addBookBtn = document.querySelector(".add-books");
  const formModal = document.querySelector(".form-modal");
  const root = document.querySelector("#root");
  addBookBtn.addEventListener("click", () => {
    root.classList.add("blur");
    formModal.classList.remove("off");
  });
  const closeModalBtn = document.querySelector(".close");
  closeModalBtn.addEventListener("click", () => {
    formModal.classList.add("off");
    root.classList.remove("blur");
  });
}
