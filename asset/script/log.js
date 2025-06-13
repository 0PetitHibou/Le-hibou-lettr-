
export async function logIn(e) {
    e.preventDefault();
    const mail = document.querySelector("#loginEmail").value.trim();
    const password = document.querySelector("#loginPassword").value.trim();

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mail, password })
        });

        const result = await response.json();

        if (response.ok && result.token) {
            alert("Connexion réussie !");
            localStorage.setItem("token", result.token);
            window.location.href = "/index.html";
    
        } else {
            alert(result.error || result.message || "Échec de la connexion");
        }

    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        alert("Erreur serveur");
    }
}

export function logOut() {
    // signOut = document.querySelector(".logOut");
    if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        window.location.href = "login_signup.html";
    }
}