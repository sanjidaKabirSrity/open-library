const toggleSpinner = displayStyle => {
    document.getElementById('spinner-div').style.display = displayStyle;
}
const getDefaultBookApi = async () => {
    toggleSpinner('block');
    const res = await fetch(`https://openlibrary.org/search.json?q=everything`);
    const data = await res.json();
    displayDefaultResult(data.docs);
}

getDefaultBookApi();
const displayDefaultResult = (books) => {
    console.log(books);
    const defaultBooksShowId = document.getElementById("default-books-show");
    for (i = 0; i <= 90; i++) {
        const book = books[i];
        const bookDiv = document.createElement('div');
        bookDiv.classList.add("col");
        bookDiv.innerHTML = `
            <div class="bg-light border-0 card h-100 shadow-sm"">
                <div class="card-body">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top shadow-sm" alt="book">
                </div>
                <div class="card-footer text-center">
                    <button type="button" class="btn btn-primary">Read More</button>
                </div>
            </div>
            `;
        defaultBooksShowId.appendChild(bookDiv);
        toggleSpinner('none');
    };
}
const searchResultAmount = document.getElementById("search-result-amount");
const toggleMainResult = displayStyle => {
    document.getElementById('main-result').style.display = displayStyle;
}
const defaultBooksShowId = document.getElementById("default-books-show");
const getBookApi = () => {
    defaultBooksShowId.style.display = "none";
    const searchInput = document.getElementById("search-input");
    const searchText = searchInput.value;
    toggleSpinner('block')
    toggleMainResult('none')
    if (searchInput.value !== '') {
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
            .then(res => res.json())
            .then(data => {
                displayResult(data.docs)
                searchResultAmount.textContent = '';
                toggleSpinner('none');
                const searchResultAmountText = document.createElement('h6');
                searchResultAmountText.classList.add("pt-4")
                searchResultAmountText.innerHTML = `Total Search Result <i style="color:#518ABE">"${data.numFound}"</i> Books for <i style="color:#518ABE">"${searchText}"</i> showing <i style="color:#518ABE">"${data.docs.length}"</i> books`;
                searchResultAmount.appendChild(searchResultAmountText);
                if (data.numFound === 0) {
                    searchResultAmount.innerHTML = `😥 <span  class="text-danger fst-italic">No result found. Please try again</span>`;
                }
            })
            .catch(error => {
                searchResultAmount.innerHTML = `😥 <span  class="text-danger fst-italic">Something went wrong . Please try again.</span>`;
            })
    } else if (searchInput.value === '') {
        searchResultAmount.innerHTML = `<span class="text-primary fst-italic">Please search with a valid book name</span>`;
        const booksShowId = document.getElementById("books-show");
        booksShowId.textContent = "";
    }
    searchInput.value = '';
}
const displayResult = (books) => {
    const booksShowId = document.getElementById("books-show");
    booksShowId.textContent = "";
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add("col");
        bookDiv.innerHTML = `
                <div class="bg-light border-0 card h-100 shadow-sm">
                    <div class="g-0 row row-cols-1">
                        <div class="col-4 p-2">
                            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid rounded-start shadow-sm" alt="book">
                        </div>
                        <div class="col-8">
                            <div class="card-body">
                                <h5 class="card-title">${book.title}</h5>
                                <p class="card-text">By <span>${book.author_name !== undefined ? book.author_name[0] : "can't found"}</span></p>
                                <small class="card-text text-muted">Published by <span>${book.publisher !== undefined ? book.publisher[0] : "can't found"}</span></small><br>
                                <small class="card-text text-muted">First published in <span>${book.first_publish_year !== undefined ? book.first_publish_year : ""}</span></small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        booksShowId.appendChild(bookDiv);
    });
    toggleMainResult('block')
}