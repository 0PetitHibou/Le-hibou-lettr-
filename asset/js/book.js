async function fetchBook(page=1) 
{
        const API_URL = "https://openlibrary.org/search.json"
        const search = 'publish_year:[2020]';
        const response = await fetch(`${API_URL}?q=${search}&page=${page}`);
        const data = await response.json();
        const books = data.docs;
        return books;
}

function displayBook(books)
{
    const display = document.querySelector(".catalog");
    if (display){
        display.innerHTML="";

        books.forEach(book => {
            const article = document.createElement("article");
            article.classList.add("catalogCard");
    
            // Book cover
    
            const cover_i = book.cover_i;
            const image = document.createElement("img"); 
            image.src = `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`;
    
            image.src = cover_i ? image.src = `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg` : "asset/image/placeholder_book.jpg";
        
            //Informations
            const info = document.createElement("div");
            info.classList.add("bookInfos");
            info.innerHTML =`<h2>${book.title}<hr></h2><em>Auteur :</em><br>-${book.author_name[0]} <br> Année de parution : ${book.first_publish_year}`;

            const button = document.createElement("button")
            button.type = "button"
            button.textContent = "Ajouter à ma librairie"

            button.addEventListener("click", () =>
                addBook(book.key)
            )
            
            article.append(image, info, button);
            display.appendChild(article);
        });
    }
}


async function addBook(Key) {
    console.log("ID envoyé :", Key)

    const token = localStorage.getItem("token")
    if (!token) {
        alert("Tu dois être connecté")
        return
    }

    console.log("envoi requete")

    const response = await fetch("http://localhost:3000/user/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            bookApiId: Key
        })
    })
    console.log("status", response.status)

}


async function displayUserBook() {
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("Utilisateur non connecté");
        return;
    }

    const response = await fetch("http://localhost:3000/my-books", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });

    if (!response.ok) {
        alert("Erreur lors de la récupération des livres");
        return;
    }

    const userBooks = await response.json();
    console.log("Livres de l'utilisateur :", userBooks);

       const booksData = await Promise.all(
            userBooks.map(async b => {
                // b.book_api_id = "/works/OL40226464W"
                const id = b.book_api_id.split("/")[2]; // "OL40226464W"
                const res = await fetch(`http://localhost:3000/books/${id}`);
                return await res.json();
            })
    );

    console.log("Livres complets :", booksData);


    const display = document.querySelector("#userBooks");
    display.innerHTML = "";

    booksData.forEach(book => {
        const article = document.createElement("article");
        article.classList.add("catalogCard");

        // image
        const image = document.createElement("img");
        image.src = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`: "asset/image/placeholder_book.jpg";

        // infos
        const info = document.createElement("div");
        info.classList.add("bookInfos");
        info.innerHTML = `
            <h2>${book.title}<hr></h2>
            <em>Auteur :</em><br>-${book.author_name[0]}<br>
            Année de parution : ${book.first_publish_year}`
        ;

        // bouton
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Supprimer de ma librairie";
        const id = book.key.split("/")[2]
        button.addEventListener("click", () => deleteBook(id));

        article.append(image, info, button);
        display.appendChild(article);
    });
}

async function deleteBook(bookApiId) {
    const token = localStorage.getItem("token")

    if (!token) {
        alert("Tu dois etre connecter")
        return
    }

    try {

        const response = await fetch(`http://localhost:3000/user/books/${bookApiId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        )


        if (!response.ok) {
            alert("Erreur lors de la suppression du livre")
            return
        }

        alert("livre supprimer")
        displayUserBook()

    } catch (error) {
        console.error("Erreur deleteBook :", error)
    }
}





async function search()
{
    const searchInput = document.querySelector("#searchInputCatalog").value.replaceAll(' ', '').toUpperCase().trim();
    let data = await fetchBook();

    let newData = data.filter((book) =>  {
        let result = book.title.toUpperCase().includes(searchInput.replaceAll(' ', '').toUpperCase().trim());
        return(result);
    })
    displayBook(newData);
}

async function main() {
    const books = await fetchBook(2);
    displayBook(books);
}


main();
displayUserBook();