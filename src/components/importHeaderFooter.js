/**
 * @fileoverview MEFAMEX Header ve Footer Bileşenleri
 * @author Mefamex <info@mefamex.com>
 * @copyright 2024 Mefamex
 * @license MIT
 * @version 1.0.0
 * @see https://mefamex.com
 * @since 20.08.2024
 * @lastModified 13.02.2025
 */

'use strict';
(async () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = document.currentScript.src.replace('importHeaderFooter.js', 'headerFooter.css');
    document.head.appendChild(link);
    await CreateFooter();
    await CreateHeader();

})();


async function CreateFooter() {
    // Select / Create the footer
    let footer = document.querySelector('body footer') || document.createElement('footer');
    if (footer !== document.body.lastChild) { document.body.appendChild(footer); }

    // Build the footer
    footer.id = "footer";
    footer.innerHTML = `<h1 id="footerText"> 2024-2025 MEFAMEX &copy; ALL RIGHT RESERVED</h1>`;

    /*const style = document.createElement('style');style.innerHTML = ``;footer.appendChild(style); */
}


async function CreateHeader() {
    // Select / Create the header
    let header = document.querySelector('body header') || document.createElement('header');
    if (header !== document.body.firstChild) { document.body.insertBefore(header, document.body.firstChild); }

    // Build the header
    const headerDivLeftSpace = document.createElement("div"); header.appendChild(headerDivLeftSpace);
    headerDivLeftSpace.id = "headerDivLeftSpace"; //for divleft to center

    const divLeft = document.createElement("a"); header.appendChild(divLeft);
    divLeft.id = "headerDivLeft"; divLeft.href = "https://mefamex.com/"

    const divLeftIcon = document.createElement("img"); divLeft.appendChild(divLeftIcon);
    divLeftIcon.id = "headerDivLeftIcon"

    divLeftIcon.src = document.currentScript.src.replace('importHeaderFooter.js', 'mefamex_logo_bgb.png');
    divLeftIcon.alt = "mefamex_logo";

    const divLeftText = document.createElement("h1"); divLeft.appendChild(divLeftText);
    divLeftText.id = "headerDivLeftText"; divLeftText.textContent = "MEFAMEX.com";


    const navBar = document.createElement("nav"); header.appendChild(navBar);
    navBar.id = "headerNavBar";

    const navBarList = [
        { text: "ANASAYFA", link: "https://mefamex.com/" },
        { text: "HAKKIMDA", link: "https://mefamex.com/about/" },
        { text: "PROJELER", link: "https://mefamex.com/projects/" },
        { text: "BLOG", link: "https://mefamex.com/blog/" },
        { text: "GALERİ", link: "https://mefamex.com/gallery/" },
        { text: "İLETİŞİM", link: "https://mefamex.com/contact/" },
        { text: "ÖZGEÇMİŞ", link: "https://mefamex.com/cv/" }
    ]
    navBarList.forEach((item) => {
        let temp_item = document.createElement("a"); navBar.appendChild(temp_item);
        temp_item.textContent = item.text; temp_item.href = item.link;
        if (window.location.pathname.includes("/" + new URL(item.link).pathname.split('/').filter(Boolean).pop())) temp_item.classList.add("current_page");
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
        if (window.location.pathname.includes("/" + new URL(item.link).pathname.split('/').filter(Boolean).pop())) temp_item.classList.add("current_page");
    })
    window.addEventListener('scroll', function () { navBarHideButton.className = 'unselected'; });


    /*const style = document.createElement('style');style.innerHTML = ``;header.appendChild(style);*/

}

