// Book Class
class Book{
    constructor(title, author, isbn){
        this.author = author;
        this.title = title;
        this.isbn = isbn;
    }
}

// UI Class
class UI{
    addBookToList(book){
        const list = document.querySelector('#book-list');

        // Create tr Element
        const row = document.createElement('tr');

        // Insert cols
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>`;

        // Append to the table via the list child
        list.appendChild(row);
    }

    clearInputFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    showAlert(message, className){
        // Create Div 
        const div = document.createElement('div');

        // Add class to the created div
        div.className = `alert ${className}`;

        // Add text 
        div.appendChild(document.createTextNode(message));

        // Get parent
        const container = document.querySelector('.container');

        // Get form
        const form = document.querySelector('#book-form');

        // Insert alert
        container.insertBefore(div, form);

        // Set display seconds
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }
}

// Local Storage class
class Store{
    // Get books from LS
    static getBooks(){
        let books;

        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    // Display books
    static displayBooks(){
        let books;
        
        books = Store.getBooks();

        books.forEach(book => {
            // Instantiate UI
            const ui = new UI();

            ui.addBookToList(book);
        });

    }

    // Add book
    static addBook(book){
        
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    // Remove book
    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) =>{
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event Listeners

// Event listener for DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks());

// Event listener when a new book is created
document.querySelector('#book-form').addEventListener('submit', 
// Get form values
function(e){
   const title = document.querySelector('#title').value,
         author = document.querySelector('#author').value,
         isbn = document.querySelector('#isbn').value;

   // Instantiate the book object
   const book = new Book(author, title, isbn);

   // Instatiate UI Objects
   const ui = new UI();

   if([title, author, isbn].includes('')){
       // Error mesage
       ui.showAlert(`Please fill all fields`, 'error');
   } else {
       // Add book to list
       ui.addBookToList(book);

       // Add book to LS
       Store.addBook(book);

       // Show success alert
       ui.showAlert("Successful", 'success');

       // Clear fields 
       ui.clearInputFields();
   }

   e.preventDefault();
});

// Event Listener for delete
document.querySelector('#book-list').addEventListener('click',
   function(e){
       // Instatiate UI Objects
       const ui = new UI();

       ui.deleteBook(e.target);

       // Remove from local storage
       Store.removeBook(e.target.parentElement.previousElementSibling.textContent);


       ui.showAlert('Book removed', 'success');

       e.preventDefault();
});
