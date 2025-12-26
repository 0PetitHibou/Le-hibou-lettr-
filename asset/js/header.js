document.addEventListener("DOMContentLoaded" , async () =>
{
    const header = document.querySelector("#header")
    if (!header) return

    const response = await fetch ("header.html")
    const html = await response.text();
    header.innerHTML = html;

    initUi()
})