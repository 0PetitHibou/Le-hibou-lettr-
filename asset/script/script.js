import  { logIn, logOut } from "./log.js";
import { addBook } from "./add_data.js";

// import adddata

function burger() {
    const burger = document.querySelector(".burger");
    const navLinks = document.querySelector(".nav-links");
    burger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

async function fetchBook(page=1) 
{
    const API_URL = "https://openlibrary.org/search.json"
    const search = 'publish_year:[2020]';
    const response = await fetch(`${API_URL}?q=${search}&page=${page}`);
    const data = await response.json();
    const books = data.docs;
    return books;
}

async function fetchBookDb() {
   const API_URL = "http://localhost:3000/books";
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    const books = data.map((book) => ({ 
        id: book.id,
        cover: book.cover,
        title: book.title,
        author_name: [book.author],
        first_publish_year: book.publish_year
    }));
    return books;
}

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


async function Signup(e) {
    e.preventDefault();

    const fName = document.querySelector("#firstName").value.trim();
    const lName = document.querySelector("#lastName").value.trim();
    const bDate = document.querySelector("#birthDate").value.trim();
    const mail = document.querySelector("#signUpEmail").value.trim();
    const password = document.querySelector("#signUpPassword").value.trim();

    const body = JSON.stringify({
        first_name: fName,
        last_name: lName,
        birth_date: bDate,
        mail: mail,
        password: password
    });


    try {
        const response = await fetch("http://localhost:3000/users", { //envoie vers api
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body //?
        });
        
        if (response.ok) {
            alert("Inscription réussie !");
            window.location.href = "/index.html";
        } else {
            alert("Erreur lors de l'inscription");
        }

    } catch (error) {
        console.log(error);
    }
}






//  displayBook(DbBooks)
// {
//     "id": 6,
//     "cover": "https://covers.openlibrary.org/b/id/14758867-L.jpg",
//     "title": "Rodchenkov Affair",
//     "author": "Grigory Rodchenkov",
//     "publish_year": 2020
// }

function displayBook(books, id)
{
    const display = document.querySelector(id);

    if (display){
        display.innerHTML="";

        books.forEach(book => {
            const article = document.createElement("article");
            article.classList.add("catalogCard");
    
            // Couverture de livre
            const cover_i = book.cover_i;
            const image = document.createElement("img"); 
            image.src = `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`;
    
            image.src = cover_i ? image.src = `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg` : "/asset/image/placeholder_book.jpg";
            //Informations
            const info = document.createElement("div");
            info.classList.add("bookInfos");
            info.innerHTML =`<h2>${book.title}<hr></h2><em>Auteur :</em><br>-${book.author_name[0]} <br> Année de parution : ${book.first_publish_year} `;
            
            const btn = document.createElement("button");
            btn.textContent = "Ajouter";
            btn.classList.add("addBtn");
            btn.addEventListener("click", () =>{addBook(book)});
            
            article.append(image, info);
            if (id != "#booklist") {
                article.append(btn);
            }
            display.appendChild(article);

        });
    }
}


async function search(id, fromDb = false)
{

        const searchInput = document.querySelector(id).value.replaceAll(' ', '').toUpperCase().trim();
        if (!fromDb) {
            let data = await fetchBook();
            let newData = data.filter((book) =>  {
                let result = book.title.toUpperCase().includes(searchInput.replaceAll(' ', '').toUpperCase().trim());
                return(result);
            })
            displayBook(newData, "#catalog");
        } else {
            let data = await fetchBookDb();
            let newData = data.filter((book) =>  {
                let result = book.title.toUpperCase().includes(searchInput.replaceAll(' ', '').toUpperCase().trim());
                return(result);
            })
            displayBook(newData, "#booklist");
        }

    } 


async function main()
{
    let books =await fetchBook(2);
    displayBook(books, "#catalog");
    let dbBooks = await fetchBookDb();
    displayBook(dbBooks, "#booklist");

    let formButton = document.querySelector("#formSubmit");
    if (formButton) formButton.addEventListener("click", sendForm);


  
}

function session(){
    const logOut = document.querySelector(".logOut");
    const logIn = document.querySelector(".login");
    const account = document.querySelector(".account");
    if (localStorage.getItem("token")){
        if (logIn) logIn.style.display = "none";
        if (logOut) logOut.style.display = "block";
        if (account) account.style.display = "block";
    } else {    
        if (logIn) logIn.style.display = "block";
        if (logOut) logOut.style.display = "none";
        if (account) account.style.display = "none";
    }
}

async function getAccountData() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const response = await fetch("http://localhost:3000/account", {
            method: "GET",
            headers: {
                Authorization: token,
            },
        });

        if (!response.ok) throw new Error("Erreur de récupération du compte");

        const data = await response.json();
        console.log("Utilisateur connecté :", data.account);

        // Affiche dans le DOM par exemple
        const account = document.querySelector("#account");
        if (account) {
            account.innerHTML = `
                <p>Connecté en tant que <strong>${data.account.mail}</strong></p>
                <p>ID: ${data.account.id}</p>
            `;
        }

    } catch (error) {
        console.error("Erreur lors de la récupération du compte :", error);
    }
}


main();


window.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#signupForm")?.addEventListener("submit", Signup);
    document.querySelector("#loginForm")?.addEventListener("submit", logIn);
    document.querySelector(".logOut")?.addEventListener("click", logOut);
    document.querySelector("#searchInputCatalog")?.addEventListener("input", () =>search("#searchInputCatalog"));
    document.querySelector("#displayBooks")?.addEventListener("input", () =>search("#displayBooks", true));
    // document.querySelector("#addBookForm")?.addEventListener("submit", addBook);
    
    
    session();
    getAccountData();
});
