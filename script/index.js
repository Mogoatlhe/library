"use strict";

const myLibrary = [];
const cross = document.getElementById("cross");
const cancel = document.getElementById("cancel");
const libraryContainer = document.getElementById("library-container");

const hideForm = () => {
    const formContainer = document.getElementById("form-container");

    libraryContainer.classList.remove("blur");
    formContainer.classList.remove("form-container");

}

cross.addEventListener("click", hideForm);
cancel.addEventListener("click", hideForm);

function Book(author, title, pages, isRead){
    this.author = author;
    this.title = title;
    this.pages = Number(pages);
    this.isRead = isRead;
    this.validate = function(){

        const bookValidity = {
            isValid: false,
        }

        if(author === null || title === null || author.length === 0 || title.length === 0){
            bookValidity.displayMessage = "Author and Title cannot be empty, please try again.";
        }else if(typeof this.pages !== "number" || this.pages < 1){
            bookValidity.displayMessage = "Pages must be a positive number, please try again";
        }else{
            bookValidity.isValid = true;
            bookValidity.displayMessage = "book has been successfully added to the library";
        }

        return bookValidity

    }
}

function displayForm(){
    const addBook = document.getElementById("add-book");
    const formContainer = document.getElementById("form-container");
    
    addBook.addEventListener("click", () => {
        libraryContainer.classList.add("blur");
        formContainer.classList.add("form-container");
        createBook(formContainer);

    });
}

function createBook(formContainer){

    const once = {
        once: true
    };
    const add = document.getElementById("add");
    const bookAdditionFeedBack = document.getElementById("addition-feedback");

    add.addEventListener("click", () => {

        let bookValidity = null;
        const title = document.getElementById("title-input").value;
        const pages = document.getElementById("pages-input").value;
        const mark = document.getElementById("read-input").checked;
        const author = document.getElementById("author-input").value;
        const book = new Book(author, title, pages, mark);

        formContainer.classList.remove("form-container");
        bookAdditionFeedBack.classList.remove("success-feedback");
        bookAdditionFeedBack.classList.remove("failure-feedback");

        bookValidity = book.validate();
        bookAdditionFeedBack.textContent = bookValidity.displayMessage;

        if(bookValidity.isValid){
            bookAdditionFeedBack.classList.add("success-feedback");
            addBookToLibrary(book, bookAdditionFeedBack);
            return;
        }
        
        bookAdditionFeedBack.classList.add("failure-feedback");
    }, once);
    
}

function createBookNode(book, position){

    const outerBookContainer = document.createElement("div");
    const innerBookContainer = document.createElement("div");
    const authorDisplay = document.createElement("p");
    const titleDisplay = document.createElement("p");
    const pagesDisplay = document.createElement("p");
    const bookControls = document.createElement("div");
    const read = document.createElement("button");
    const remove = document.createElement("button");

    outerBookContainer.classList.add("outer-book-container");
    innerBookContainer.classList.add("inner-book-container");
    authorDisplay.classList.add("author-display");
    titleDisplay.classList.add("title-display");
    pagesDisplay.classList.add("pages-display");
    bookControls.classList.add("book-controls");
    read.classList.add("is-read");
    remove.classList.add("remove");

    outerBookContainer.dataset.position = position;
    addRemoveEvent(remove);
    addReadEvent(read);

    read.textContent = "Mark As Read";
    remove.textContent = "Remove";
    
    authorDisplay.textContent = `Author: ${book.author}`;
    titleDisplay.textContent = `Title: ${book.title}`;
    pagesDisplay.textContent = `Pages: ${book.pages}`;
    
    if(book.isRead){
        read.textContent = "Mark As Not Read";
    }

    bookControls.appendChild(read);
    bookControls.appendChild(remove);

    innerBookContainer.appendChild(authorDisplay);
    innerBookContainer.appendChild(titleDisplay);
    innerBookContainer.appendChild(pagesDisplay);

    outerBookContainer.appendChild(innerBookContainer);
    outerBookContainer.appendChild(bookControls);

    return outerBookContainer;
}

function addReadEvent(read){

    read.addEventListener("click", function(){

        const position = this.parentElement.parentElement.dataset.position;

        if(this.textContent === "Mark As Read"){
            this.textContent = "Mark As Not Read"
        }else{
            this.textContent = "Mark As Read";
        }

        myLibrary[position].isRead = myLibrary[position].isRead ? false : true;
        displayStats();
    });

}

function addRemoveEvent(remove){
    
    const bookAdditionFeedBack = document.getElementById("addition-feedback");
    remove.addEventListener("click", function(){

        bookAdditionFeedBack.classList.remove("failure-feedback");
        if(remove === true){}
        
        const position = this.parentElement.parentElement.dataset.position;

        myLibrary.splice(position, 1);
        displayBooks();
        displayStats();

        bookAdditionFeedBack.classList.add("success-feedback");
        bookAdditionFeedBack.textContent = "book successfully removed from the library";
        
    });

}

function displayBooks(){

    const booksContainer = document.getElementById("books-container");
    const outerBookContainers = document.getElementsByClassName("outer-book-container");

    if(outerBookContainers !== null){
        [...outerBookContainers].map((curr) => {
            booksContainer.removeChild(curr);
        });
    }
    
    myLibrary.map((curr, i) => {
        const bookNode = createBookNode(curr, i);
        booksContainer.appendChild(bookNode);
    });

}

function displayStats(){

    let readBooks;
    const totalBooks =  document.getElementById("total-books-number");
    const booksRead =  document.getElementById("books-read-number");
    const unreadBooks =  document.getElementById("unread-books-number");

    readBooks = myLibrary.reduce((total, curr) => {
        if(curr.isRead){
            total++;
        }
        
        return total;
    }, 0);
    
    totalBooks.textContent = myLibrary.length;
    booksRead.textContent = readBooks;
    unreadBooks.textContent = Number(myLibrary.length) - Number(readBooks);
}

function addBookToLibrary(book, bookAdditionFeedBack){

    libraryContainer.classList.remove("blur");
    
    const duplicate = myLibrary.some(curr => {
        let exists = curr.author === book.author;
        exists = exists && curr.title === book.title;
        exists = exists && curr.pages === book.pages;
        
        if(exists){
            return true;
        }
    });
    
    if(duplicate){
        bookAdditionFeedBack.classList.add("failure-feedback");
        bookAdditionFeedBack.textContent = "Book already exists";
        return;
    }

    myLibrary.push(book);
    displayBooks();
    displayStats();
}

displayForm();