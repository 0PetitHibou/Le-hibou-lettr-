async function fetchBook() 
{
    const API_URL = "https://openlibrary.org/search.json"
    const search = 'publish_year:[2020]';
    const response = await fetch(`${API_URL}?q=${search}&limit=20`);
    const data = await response.json();
    const books = data.docs;
    return books;
}


function displayBook(books)
{
    const display = document.querySelector(".catalog");
    books.forEach(book => {


        const article = document.createElement("article");
        article.classList.add("catalogCard");

        // Book cover

        const cover_i = book.cover_i;
        const image = document.createElement("img"); 
        image.src = `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`;

        image.src = cover_i ? image.src = `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg` : "/asset/image/placeholder_book.jpg";
    
        //Informations
        const info = document.createElement("div");
        info.classList.add("bookInfos");
        info.innerHTML =`<h2>${book.title}<hr></h2><em>Auteur :</em><br>-${book.author_name[0]} <br> Année de parution : ${book.first_publish_year}`;
        
        article.append(image, info);
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