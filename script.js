const getBookApi = () => {
    const searchInput = document.getElementById("search-input");
    const searchText = searchInput.value;
    if (searchInput.value !== ''){
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => {
            displayResult(data.docs)
            if(data.numFound === 0){
                const searchResultAmount = document.getElementById("search-result-amount");
                searchResultAmount.textContent = 'No result found';
            }
        })
    }else if (searchInput.value === ''){
        const searchResultAmount = document.getElementById("search-result-amount");
        searchResultAmount.textContent = 'No result found';
        const booksShowId = document.getElementById("books-show");
        booksShowId.textContent = "";
    }
    searchInput.value = '';
}
const displayResult = (books) => {
        const searchResultAmount = document.getElementById("search-result-amount");
        searchResultAmount.textContent = '';
        const searchResultAmountText = document.createElement('h6');
        searchResultAmountText.classList.add("py-4")
        searchResultAmountText.textContent = `You got found ${books.length} books`;
        searchResultAmount.appendChild(searchResultAmountText);
        const booksShowId = document.getElementById("books-show");
        booksShowId.textContent = "";
        books.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add("col");
            bookDiv.innerHTML = `
                <div class="bg-light border-0 card h-100 shadow-sm">
                    <div class="row g-0">
                        <div class="col-md-4 p-2">
                            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid rounded-start" alt="book">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${book.title}</h5>
                                <p class="card-text">By <span>${book.author_name!==undefined ? book.author_name[0]:""}</span></p>
                                <small class="card-text text-muted">Published by <span>${book.publisher!==undefined ? book.publisher[0]:""}</span></small><br>
                                <small class="card-text text-muted">First published in <span>${book.first_publish_year!==undefined ? book.first_publish_year[0]:""}</span></small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            booksShowId.appendChild(bookDiv);
        });
}