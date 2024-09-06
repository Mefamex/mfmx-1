CreateHeader();

function CreateHeader() {
    const footer = document.querySelector("footer");
    footer.innerHTML = `<link rel="stylesheet" type="text/css" href="/src/components/footer.css">`

    const footerText = document.createElement("h1"); footer.appendChild(footerText);
    footerText.id = "footerText";
    footerText.innerHTML = "&copy; 2023 MEFAMEX";

}


