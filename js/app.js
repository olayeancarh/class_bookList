 // Book constructor
 function Book(author, title, isbn){
     this.author = author;
     this.title = title;
     this.isbn = isbn;
 }

 // UI Constructor
 function UI(){

 }

 // Add Book to list
 UI.prototype.addBookToList = function(book){
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

 // Clear input fields
 UI.prototype.clearInputFields = function(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
 }

 // Show Alert
 UI.prototype.showAlert = function(message, className){
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

 // Delete Book
 UI.prototype.deleteBook = function(target){
     if(target.className === 'delete'){
         target.parentElement.parentElement.remove();
     }
 }

 // Event Listeners
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

        // Show success alert
        ui.showAlert("Successful", 'success');

        // Clear fields 
        ui.clearInputFields()
    }

    e.preventDefault();
 });

 // Event Listener for delete
 document.querySelector('#book-list').addEventListener('click',
    function(e){
        // Instatiate UI Objects
        const ui = new UI();

        ui.deleteBook(e.target);

        ui.showAlert('Book removed', 'success');

        e.preventDefault();
});