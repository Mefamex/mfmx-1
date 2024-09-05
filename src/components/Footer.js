console.log("/src/components/footer.js");
CreateHeader();

function CreateHeader() {
    const footer = document.querySelector("footer");
    console.log("catched footer:", footer);


    const footerText = document.createElement("h1"); footer.appendChild(footerText);
    footerText.id = "footerText";
    footerText.innerHTML = "&copy; 2023 MEFAMEX";

}


