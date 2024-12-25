(async () => {
    await CreateFooter();
    await CreateHeader();
})();


async function CreateFooter() {
    // Select / Create the footer
    let footer = document.querySelector('body > footer') || document.createElement('footer');
    if (footer !== document.body.lastChild) { document.body.appendChild(footer); }

    // Load the CSS-footer file
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = document.currentScript.src.replace('importHeaderFooter.js', 'footer.css');
    document.head.appendChild(link);

    // Build the footer
    footer.id = "footer";
    footer.innerHTML = `<h1 id="footerText">&copy; 2024 MEFAMEX , ALL RIGHT RESERVED</h1>`;

    /*const style = document.createElement('style');style.innerHTML = ``;footer.appendChild(style); */
}


async function CreateHeader() {
    // Select / Create the header
    let header = document.querySelector('body > header') || document.createElement('header');
    if (header !== document.body.firstChild) { document.body.insertBefore(header, document.body.firstChild); }

    // Load the CSS-header file
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = document.currentScript.src.replace('importHeaderFooter.js', 'header.css');
    document.head.appendChild(link);

    // Build the header
    const headerDivLeftSpace = document.createElement("div"); header.appendChild(headerDivLeftSpace);
    headerDivLeftSpace.id = "headerDivLeftSpace"; //for divleft to center

    const divLeft = document.createElement("a"); header.appendChild(divLeft);
    divLeft.id = "headerDivLeft"; divLeft.href = "https://mefamex.com"
    divLeft.addEventListener('click', () => { window.location.href = "https://mefamex.com" });
    divLeft.onmouseover = () => { divLeft.classList.add("headerDivLeftHover") }
    divLeft.onmouseout = function () { divLeft.classList.remove("headerDivLeftHover") };

    const divLeftIcon = document.createElement("img"); divLeft.appendChild(divLeftIcon);
    divLeftIcon.id = "headerDivLeftIcon"

    divLeftIcon.src = document.currentScript.src.replace('importHeaderFooter.js', '/mefamex_logo_bgb.png');
    //divLeftIcon.src = "/src/assets/images/mfmx_icon/mefamex_logo_bgb.png";
    divLeftIcon.alt = "mefamex_logo";

    const divLeftText = document.createElement("h1"); divLeft.appendChild(divLeftText);
    divLeftText.id = "headerDivLeftText";
    divLeftText.textContent = "MEFAMEX.com";


    const navBar = document.createElement("nav"); header.appendChild(navBar);
    navBar.id = "headerNavBar";

    const navBarList = [
        { text: "ANASAYFA", link: "https://mefamex.com/" },
        { text: "HAKKIMDA", link: "https://mefamex.com/about/" },
        { text: "İLETİŞİM", link: "https://mefamex.com/contact/" },
        { text: "BLOG", link: "https://mefamex.com/blog/" },
        { text: "PROJELER", link: "https://mefamex.com/projects/" }
    ]
    navBarList.forEach((item) => {
        let temp_item = document.createElement("a"); navBar.appendChild(temp_item);
        temp_item.textContent = item.text; temp_item.href = item.link;
    })


    const navBarHideButton = document.createElement("a"); header.appendChild(navBarHideButton);
    navBarHideButton.id = "navBarHideButton"; navBarHideButton.className = "unselected";
    navBarHideButton.title = "MENU";
    navBarHideButton.onclick = () => { navBarHideButton.className = navBarHideButton.className == 'unselected' ? 'selected' : 'unselected'; navBarHidden.className = navBarHideButton.className; }


    const navBarHidden = document.createElement("section"); header.appendChild(navBarHidden);
    navBarHidden.id = "navBarHidden"; navBarHidden.className = navBarHideButton.className;
    navBarList.forEach((item) => {
        let temp_item = document.createElement("a"); navBarHidden.appendChild(temp_item);
        temp_item.textContent = item.text; temp_item.href = item.link;

    })
    window.addEventListener('scroll', function () { navBarHideButton.className = 'unselected'; });


    /*const style = document.createElement('style');style.innerHTML = ``;header.appendChild(style);*/

}

