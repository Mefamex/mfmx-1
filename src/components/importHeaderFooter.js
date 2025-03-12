/**
 * @fileoverview MEFAMEX Header ve Footer Bileşenleri
 * @author Mefamex <info@mefamex.com>
 * @copyright 2024 Mefamex
 * @license MIT
 * @version 1.0.0
 * @see https://mefamex.com
 * @since 2024-08-20 
 * @lastModified 2025-03-12 
 */

const getScriptPath = () => {
    if (document.currentScript?.src) return document.currentScript.src;
    const currentScript = Array.from(document.getElementsByTagName('script')).find(script => script.src && script.src.includes('importHeaderFooter.js'));
    if (currentScript?.src) return currentScript.src;
    console.log('HeaderFooter Script yolu bulunamadı! Varsayılan konum kullanılacak.');
    return window.location.origin + '/src/components/importHeaderFooter.js';
};

const scriptPath = getScriptPath();

'use strict';
(async () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    if (!scriptPath) throw new Error('Script path bulunamadı');
    link.href = scriptPath.replace('importHeaderFooter.js', 'headerFooter.css');
    link.dataset.deneme = 'deneme';
    /*await new Promise((resolve, reject) => {
        link.onload = resolve;
        link.onerror = () => reject(new Error('CSS yüklenemedi'));
    });*/
    document.head.appendChild(link);
    
    const createFooterTask = (async () => { try { await CreateFooter(); } catch (error) { console.error('❌ Footer oluşturulurken hata:', error); } })();
    const createHeaderTask = (async () => { try { await CreateHeader(); } catch (error) { console.error('❌ Header oluşturulurken hata:', error); } })();
    Promise.all([createFooterTask, createHeaderTask]);
})();

async function CreateFooter() {
    // Select / Create the footer
    let footer = document.querySelector('body footer') || document.createElement('footer');

    // Build the footer
    footer.id = "footer";
    footer.innerHTML = `<h1 id="footerText"> 2014-&infin; &copy; MEFAMEX. ALL RIGHT RESERVED</h1>`;

    if (footer !== document.body.lastChild) { document.body.appendChild(footer); }
    /*const style = document.createElement('style');style.innerHTML = ``;footer.appendChild(style); */
}


async function CreateHeader() {
    // Select / Create the header
    let header = document.querySelector('body header') || document.createElement('header');

    // Build the header
    const headerDivLeftSpace = document.createElement("div"); header.appendChild(headerDivLeftSpace);
    headerDivLeftSpace.id = "headerDivLeftSpace"; //for divleft to center

    const divLeft = document.createElement("a"); header.appendChild(divLeft);
    divLeft.id = "headerDivLeft"; divLeft.href = "https://mefamex.com/"

    const divLeftIcon = document.createElement("img"); divLeft.appendChild(divLeftIcon);
    divLeftIcon.id = "headerDivLeftIcon"

    divLeftIcon.src = scriptPath.replace('importHeaderFooter.js', 'mefamex_logo_bgb.png');
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


    if (header !== document.body.firstChild) { document.body.insertBefore(header, document.body.firstChild); }
    /*const style = document.createElement('style');style.innerHTML = ``;header.appendChild(style);*/

}

