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


async function checkSession() {
            let connectedSection = document.querySelector(".account");
            let notConnectedSection = document.querySelector(".login");
    try{
        
        const res = await fetch("http://localhost:3000/login", {
            credentials: "include"
        });
        const data = await res.json();

        console.log(data)   

        if (data.isLogged) {        
            connectedSection.style.display = "block";
            notConnectedSection.style.display = "none";
            console.log("connecté");     
        } else {
            connectedSection.style.display = "none";
            notConnectedSection.style.display = "block";
            console.log("non connecté");
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


async function Login(e) {
    e.preventDefault();

    const mail = document.querySelector("#loginEmail").value.trim();
    const password = document.querySelector("#loginPassword").value.trim();

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include", // Important pour envoyer/recevoir les cookies
            body: JSON.stringify({ mail, password })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Connexion réussie !");
            window.location.href = "/index.html";
        } else {
            alert(result.error || result.message || "Échec de la connexion");
        }

    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        alert("Erreur serveur");
    }
}

    



main();

window.addEventListener("DOMContentLoaded", () => {
    checkSession();

    document.querySelector("#signupForm")?.addEventListener("submit", Signup);
    document.querySelector("#loginForm")?.addEventListener("submit", Login);

});