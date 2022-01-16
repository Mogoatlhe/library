"use strict";

const myLibrary = [];

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
        formContainer.classList.add("form-container");
        createBook(formContainer);
    });
}

function createBook(formContainer){

    const add = document.getElementById("add");
    const bookAdditionFeedBack = document.getElementById("addition-feedback");

    add.addEventListener("click", () => {

        let bookValidity = null;
        const title = document.getElementById("title-input").value;
        const pages = document.getElementById("pages-input").value;
        const mark = document.getElementById("pages-input").checked;
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
    });
    
}

function addBookToLibrary(book, bookAdditionFeedBack){
    
    const duplicate = myLibrary.some(curr => {
        let exists = curr.author === book.author;
        exists = exists && curr.title === book.title;
        exists = exists && curr.pages === curr.pages;
        
        if(curr){
            return true;
        }
    });
    
    if(duplicate){
        bookAdditionFeedBack.classList.add("failure-feedback");
        bookAdditionFeedBack.textContent = "Book already exists";
        return;
    }

    myLibrary.push(book);
}

displayForm();