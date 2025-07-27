/**
 * @fileoverview MEFAMEX Header ve Footer Bileşenleri
 * @author Mefamex <info@mefamex.com>
 * @copyright 2024 Mefamex
 * @license MIT
 * @version 1.0.1
 * @see https://mefamex.com
 * @since 2024-08-20 
 * @lastModified 2025-07-27-T12:00:00Z  
 */
'use strict';

function getScriptPath() {
    if (document.currentScript?.src) return new URL(document.currentScript.src).toString();
    const currentScript = Array.from(document.getElementsByTagName('script')).find(script => script.src?.includes('importHeaderFooter.js'));
    if (currentScript?.src) return new URL(currentScript.src).toString();
    const fallbackPath = new URL('/src/components/importHeaderFooter.js', window.location.origin).toString();
    console.log('⚠️ HeaderFooter Script yolu bulunamadı! Varsayılan konum kullanılıyor:', fallbackPath);
    return fallbackPath;
};





let scriptPath = getScriptPath();



(async () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    if (!scriptPath) throw new Error('Script path bulunamadı');
    link.href = scriptPath.replace('importHeaderFooter.js', 'headerFooter.css');
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
    const footer = document.querySelector('body footer') || document.createElement('footer');
    footer.id = "footer"; footer.innerHTML = '';

    const firstPart = document.createElement("div"); firstPart.id = "firstPart"; footer.appendChild(firstPart);
    firstPart.innerHTML = '';

    const secondPart = document.createElement("div"); secondPart.id = "secondPart"; footer.appendChild(secondPart);
    secondPart.innerHTML = `
        <div id='secondLeft'>
            <a href="https://mefamex.com" title="Anasayfa"> <img src="${scriptPath.replace('importHeaderFooter.js', 'mefamex_logo_bgb.png')}" alt="mefamex_logo" id="footerLogo">  </a>
            <span class="vl"></span>
            <span> 2014-&infin; &copy;<b> MEFAMEX </b></span>
            <span class="vl"></span>
            <a href="https://mefamex.com/sitemap.xml" title="Website Haritası"> Sitemap </a>
        </div>
        <div id='secondRight'> 
            <a href="https://github.com/Mefamex" target="_blank" rel="noopener noreferrer" title="GitHub"><img src="${scriptPath.replace('components/importHeaderFooter.js', 'assets/icons/black/github_icon.png')}" alt="GitHub"></a>
            <span class="vl"></span>
            <a href="https://www.instagram.com/mefamex" target="_blank" rel="noopener noreferrer" title="Instagram"><img src="${scriptPath.replace('components/importHeaderFooter.js', 'assets/icons/black/instagram_icon.png')}" alt="Instagram"></a>
            <span class="vl"></span>
            <a href="https://www.linkedin.com/in/mefamex/" target="_blank" rel="noopener noreferrer" title="LinkedIn"><img src="${scriptPath.replace('components/importHeaderFooter.js', 'assets/icons/black/linkedin_icon.png')}" alt="LinkedIn"></a>
        </div>
    `;
    footer.querySelectorAll("a").forEach((link) => {
        const nSpan = document.createElement("span");
        nSpan.className = "AlinkPopup";
        nSpan.textContent = link.title || link.textContent || link.href;
        link.appendChild(nSpan);
    });

    if (footer !== document.body.lastChild) { document.body.appendChild(footer); }
    //footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //document.querySelector("main").style.maxHeight = '1rem';
    //document.querySelector("main").style.minHeight = '50vh';
}







async function CreateHeader() {
    // Select / Create the header
    let header = document.querySelector('body > header') || document.createElement('header');
    header.id = "header"; header.innerHTML = '';
    // Build the header
    const headerDivLeftSpace = document.createElement("div"); header.appendChild(headerDivLeftSpace);
    headerDivLeftSpace.id = "headerDivLeftSpace"; //for divleft to center

    const divLeft = document.createElement("a"); header.appendChild(divLeft);
    divLeft.id = "headerDivLeft"; divLeft.href = "https://mefamex.com"

    const divLeftIcon = document.createElement("img"); divLeft.appendChild(divLeftIcon);
    divLeftIcon.id = "headerDivLeftIcon"

    divLeftIcon.src = scriptPath.replace('importHeaderFooter.js', 'mefamex_logo_bgb.png');
    divLeftIcon.alt = "mefamex_logo";

    const divLeftText = document.createElement("h1"); divLeft.appendChild(divLeftText);
    divLeftText.id = "headerDivLeftText"; divLeftText.textContent = "MEFAMEX";


    const navBar = document.createElement("nav"); header.appendChild(navBar);
    navBar.id = "headerNavBar";

    const navBarList = [
        { text: "ANASAYFA", link: "https://mefamex.com" },
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
    window.addEventListener('click', function (event) { if (!navBarHideButton.contains(event.target) && !navBarHidden.contains(event.target)) navBarHideButton.className = 'unselected'; });

    if (header !== document.body.firstChild) { document.body.insertBefore(header, document.body.firstChild); }
    setTimeout(() => { if (window.scrollY < '150' && !window.location.hash) window.scrollTo({ top: 0, behavior: 'smooth' }) }, 100);
    /*const style = document.createElement('style');style.innerHTML = ``;header.appendChild(style);*/

}

