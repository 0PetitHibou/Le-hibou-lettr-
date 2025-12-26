function initUi() {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const loginButton = document.querySelector("#loginButton")
    const logoutButton = document.querySelector("#logoutButton")
    const accountButton = document.querySelector("#accountButton")

    if (token && user) {
        loginButton.style.display = "none"
        logoutButton.style.display = "block"
        accountButton.style.display = "block"
        console.log("oui")
    } else {
        loginButton.style.display = "block"
        logoutButton.style.display = "none"
        accountButton.style.display = "none"
        console.log("non")
    }

    logoutButton.addEventListener("click", (e) => {
        e.preventDefault()

        localStorage.removeItem("token")
        localStorage.removeItem("user")

        console.log("Déconnecté")

        window.location.href = "index.html"
    })
}