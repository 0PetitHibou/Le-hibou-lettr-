document.addEventListener("DOMContentLoaded", () => {

    const signUpForm = document.querySelector("#signupForm")
    if(!signUpForm) return

    signUpForm.addEventListener("submit", async function(e) 
    {
        e.preventDefault();
        const firstName = document.querySelector("#firstName").value.trim()
        const lastName = document.querySelector("#lastName").value.trim()
        const mail = document.querySelector("#signUpEmail").value.trim()
        const password = document.querySelector("#signUpPassword").value.trim()

        const body = JSON.stringify({
                    firstName,
                    lastName,
                    mail,
                    password
                })

        try {
            const response = await fetch("http://localhost:3000/users", {
                method:"POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: body
                
            });

            if (response.ok) {
                const data = await response.json();

                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                alert(data.message); // "Inscription effectuée"
                window.location.href = "index.html";
            } else {
                const error = await response.json();
                alert("Erreur : " + error.error);
            }

        } catch (error) {
            console.log(error);
        }
    })
})