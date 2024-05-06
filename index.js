const myLibrary = [];

(function main() {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    createBook(title, author, pages, read);

    form.reset();
  });
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
  // change read state
  console.log(`Does nothing at the moment...`);
};

function createBook(title, author, pages, read) {
  const book = new Book(title, author, pages, read);

  console.log(myLibrary);
  myLibrary.push(book);
  console.log(myLibrary);
  renderBooks(myLibrary);
}

function renderBooks(array) {
  const root = document.querySelector("#root");

  root.innerHTML = "";

  array.forEach((book) => {
    const div = document.createElement("div");
    const button = document.createElement("button");
    div.textContent = book.info();
    button.addEventListener("click", () => {
      book.hasRead();
      console.log(book.read);
    });
    button.textContent = "Read";
    div.appendChild(button);

    root.appendChild(div);
  });
}
