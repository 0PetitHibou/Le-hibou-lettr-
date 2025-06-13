import  { logIn, logOut } from "./log.js";
// import adddata

async function fetchBook(page=1) 
{
    const API_URL = "https://openlibrary.org/search.json"
    const search = 'publish_year:[2020]';
    const response = await fetch(`${API_URL}?q=${search}&page=${page}`);
    const data = await response.json();
    const books = data.docs;
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

    console.log(body);

    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Inscription réussie", data);
            alert("Inscription réussie !");
            window.location.href = "/index.html";
        } else {
            const error = await response.json();
            console.log("Inscription échouée", error);
            alert("Erreur lors de l'inscription");
        }

    } catch (error) {
        console.log(error);
    }
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
    
            image.src = cover_i ? image.src = `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg` : "/asset/image/placeholder_book.jpg";
        
            //Informations
            const info = document.createElement("div");
            info.classList.add("bookInfos");
            info.innerHTML =`<h2>${book.title}<hr></h2><em>Auteur :</em><br>-${book.author_name[0]} <br> Année de parution : ${book.first_publish_year}`;
            
            article.append(image, info);
            display.appendChild(article);
        });
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


async function main()
{
    let books =await fetchBook(2);
    displayBook(books);

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
    document.querySelector("#searchInputCatalog")?.addEventListener("input", search);
    session();
    getAccountData();
});
