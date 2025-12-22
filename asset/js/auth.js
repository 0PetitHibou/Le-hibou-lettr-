document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const loginButton = document.querySelector("#loginButton")
    console.log("login button", loginButton)

    if (!loginButton) return
    if (token && user) {
        loginButton.style.display = "none";
    } else {
        loginButton.style.display = "block"
    }
})


document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.querySelector("#logoutButton")
    
    if (!logoutButton) return

    logoutButton.addEventListener("click", (e) => {
        e.preventDefault()

        localStorage.removeItem("token")
        localStorage.removeItem("user")

        console.log("Déconnecté")

        window.location.replace = "index.html"
    })

})