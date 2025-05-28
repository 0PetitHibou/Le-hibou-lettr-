async function fetchBook() 
{
    const API_URL = "https://openlibrary.org/search.json"
    const search = 'publish_year:[2020]';
    const response = await fetch(`${API_URL}?q=${search}&limit=20`);
    const data = await response.json();
    const books = data.docs;
    console.log("FETCH BOOK: " , books);
    return books;
}


function displayBook(books)
{
    const display = document.querySelector(".catalog");
    books.forEach(book => {
        
        const article = document.createElement("article");

        const title = document.createElement("h2");
        title.textContent = book.title;

        article.append(title);
        display.appendChild(article);
    });

}

async function main()
{
    let books =await fetchBook();
    console.log(books);
    displayBook(books);
}


main();