export async function fetchBookImageUrl(bookName) 
{
    const API_URL = "https://openlibrary.org/search.json"
    const response = await fetch(`${API_URL}?q=${bookName}&page=1`);
    const data = await response.json();
    const books = data.docs;
    let coverId = books[0].cover_i;
    console.log(books[0]);
    return`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
}


export async function addBook(book) {
    let bookURL = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : "/asset/image/placeholder_book.jpg";
console.log("book",book)
    const body = {
        cover: bookURL,
        title: book.title,
        author: book.author_name,
        publish_year: book.first_publish_year,
    };
    console.log("body",body)
    try {
        const response = await fetch("http://localhost:3000/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
            
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error("Erreur lors de l'ajout du livre :", response.statusText);
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout du livre :", error);
    }
}