
function sendForm(e)
{
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const mail = document.querySelector("#mail").value.trim();
    const message = document.querySelector("#message").value.trim();
    const sent = document.querySelector("#messageSent");

    if (!name || !mail || !message)
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


async function main()
{
    let formButton = document.querySelector("#formSubmit");
    if (formButton) formButton.addEventListener("click", sendForm);
}
main();
