async function fetchBook() 
{
    const API_URL = "https://openlibrary.org/search.json"
    const search = 'publish_year:[2020]';
    const response = await fetch(`${API_URL}?q=${search}&limit=20`);
    const data = await response.json();
    const books = data.docs;
    return books;
}


document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contactForm");
    form.addEventListener("submit", sendForm);
});

function sendForm(e)
{
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();
    const sent = document.querySelector("#messageSent");

    if (!name || !email || !message)
    {
        sent.textContent = "Veuillez remplir tous les champs obligatoires.";
        sent.style.display = "block";
        sent.style.color = "red";
        return;
    }

    sent.textContent = "Votre message à bien été envoyé !";
    sent.style.display = "block";
    sent.style.color = "green";



    console.log(sent);
    document.querySelector("#contactForm").reset();
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

async function search()
{
    
    const searchInput = document.querySelector("#searchInputCatalog").value.replaceAll(' ', '').toUpperCase().trim();
    let data = await fetchBook();

    let newData = data.filter(book =>  {
        return book.title.toUpperCase().includes(searchInput.replaceAll(' ', '').toUpperCase().trim())
    })
    displayBook(newData);
}

async function main()
{
    let books =await fetchBook();
    displayBook(books);
}


main();
sendForm();