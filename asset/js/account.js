const userEmail = document.querySelector("#userEmail")

document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return

    const userName = document.querySelector("#userName")


    userName.textContent = `Utilisateur : ${user.first_name} ${user.last_name}`
    userEmail.textContent = `Email : ${user.mail}`

})

let isEditing = false;

editEmail.addEventListener("click", async () => {

    if (!isEditing){

        const input = document.createElement("input")

        input.type = "email"
        input.value = userEmail.textContent.trim()
        input.id = "emailInput"

        userEmail.replaceWith(input);
        input.focus();

        editEmail.textContent ="Enregistrer"
        isEditing = true;
        return
    }

    const input = document.querySelector("#emailInput")
    const newMail = input.value.trim()
    console.log("test")
        const body = JSON.stringify({
            mail : newMail
        })

        const response = await fetch("http://localhost:3000/account", {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" :`Bearer ${localStorage.getItem("token")}`
            },
            body
        })

        if (!response.ok) {
            const error = await response.text()
            alert(error || "Erreur")
            return
        }

    userEmail.textContent = newMail
    input.replaceWith(userEmail)
    editEmail.textContent = "Modifier"
    
    isEditing = false;

    console.log("reussis")

})

