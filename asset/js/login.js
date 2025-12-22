document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.querySelector("#loginForm")
    if (!loginForm) return

    loginForm.addEventListener("submit", async function(e)
    {
        e.preventDefault();
        const mail = document.querySelector("#loginEmail").value.trim()
        const password = document.querySelector("#loginPassword").value.trim()

            const body = JSON.stringify({
                    mail,
                    password
                })

        try {
            const response = await fetch("http://localhost:3000/login", {
                method:"POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: body
            });

            const data = await response.json()

            if (!response.ok) {
                alert(data.error || "Utilisateur inconnu")
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            console.log(data.user, "connecté")

            window.location.href = "index.html";
        } catch (error) {
            console.log(error);
        }
    })
})