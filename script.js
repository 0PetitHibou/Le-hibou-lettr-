async function fetchBook() 
{
    const API_URL = "https://openlibrary.org/search.json"
    const search = 'publish_year:[2020]';
    const response = await fetch(`${API_URL}?q=${search}limit`);
    const data = await response.json();
    const books = data;
    console.log(data.docs);
    return books;
}


async function displayBook()
{
    display = document.querySelector("");
}

fetchBook();