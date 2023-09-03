const bookList = document.getElementById("book-list");

function showListOfBooks() {
    axios.get("/book-list").then((res) => {
        const books = [...res.data.books];
        bookList.innerHTML = books.map((book) => {
            return `<div class="bg-white p-4 rounded-lg shadow-lg">
                <h2 class="text-xl font-semibold mb-2">${book.title}</h2>
                <p class="text-gray-700 mb-2">Written by ${book.author}</p>
                <p class="text-gray-500 mb-2">Category: ${book.category}</p>
                <div class="flex justify-between">
                    <button data-id="${book._id}"
                        class="update-book bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2">Update</button>
                    <button data-id="${book._id}"
                        class="delete-book bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600">Delete</button>
                </div>
            </div>`;
        }).join("");

    }).catch((error) => {
        console.log(error)
    })
}

window.onload = () => {
    showListOfBooks();
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains('add-book')) {
        e.preventDefault();
        console.log(e.target);
    } else if (e.target.classList.contains('update-book')) {
        console.log(e.target.dataset.id);
    } else if (e.target.classList.contains('delete-book')) {
        let id = e.target.dataset.id;
    }
})