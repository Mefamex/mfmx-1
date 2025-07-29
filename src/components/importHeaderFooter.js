/**
 * @fileoverview MEFAMEX Header ve Footer Bileşenleri
 * @author Mefamex <info@mefamex.com> 
 * @copyright 2024 Mefamex
 * @license MIT
 * @version 1.0.1
 * @see https://mefamex.com
 * @since 2024-08-20 
 * @lastModified 2025-07-28-T01:45:00Z 
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


/* for development purposes only */
// if (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')) { setInterval(() => window.scrollTo(0, document.body.scrollHeight), 100); window.scrollTo(0, document.body.scrollHeight); }




async function CreateFooter() {
    const footer = document.querySelector('body footer') || document.createElement('footer');
    footer.id = "footer"; footer.innerHTML = '';

    const firstPart = document.createElement("div"); firstPart.id = "firstPart"; footer.appendChild(firstPart);
    const icon_black_path = scriptPath.replace('components/importHeaderFooter.js', 'assets/icons/black');
    firstPart.innerHTML = `
        <div class="FootSection"> 
            <details open> 
                <summary> WEBSITE </summary> 
                <ul> <!-- Anasayfa, hakkında, projeler, blog, galeri, iletişim, özgeçmiş, Site Bağlantı Ağacı, Site Dosya Ağacı --> 
                    <li> <a href="https://mefamex.com" title="Anasayfa"> Anasayfa </a> </li> 
                    <li> <a href="https://mefamex.com/about/" title="Website Hakkında"> Hakkında </a> </li> 
                    <li> <a href="https://mefamex.com/projects/" title="Projeler"> Projeler </a> </li> 
                    <li> <a href="https://mefamex.com/blog/" title="Blog"> Blog </a> </li> 
                    <li> <a href="https://mefamex.com/gallery/" title="Galeri"> Galeri </a> </li> 
                    <li> <a href="https://mefamex.com/contact/" title="İletişim"> İletişim </a> </li> 
                    <li> <a href="https://mefamex.com/cv/" title="Özgeçmiş"> Özgeçmiş </a> </li> 
                    <li> <a href="https://mefamex.com/linktree.html" title="Website Haritası"> Site Bağlantı Ağacı </a> </li> 
                    <li> <a href="https://mefamex.com/filetree.html" title="Website Dosya Haritası"> Site Dosya Ağacı </a> </li> 
                </ul> 
            </details> 
        </div> 
        <div class="FootSection"> 
            <details open> 
                <summary> PROJELER </summary> 
                <ul> 
                    <li> <a href=" https://mefamex.com/projects/ " title="Projeler Anasayfa" > Projeler Anasayfa  </a> </li> 
                    <li> <a href=" https://mefamex.com/the-mefamex-project/ " title="The Mefamex Project"> The Mefamex Project  </a> </li> 
                    <li> <a href=" https://mefamex.com/projects/html-css-book/ " title=" Webpage Notları "> Webpage Notları </a> </li> 
                    <li> <a href=" https://mefamex.com/projects/python-to-exe/ " title=" Python to Exe "> Python to Exe </a> </li> 
                    <li> <a href=" https://mefamex.com/projects/image-meta-dataset/ " title=" Python Image Meta Dataset "> Python Image Meta Dataset </a> </li> 
                    <li> <a href=" https://mefamex.com/projects/dizin-listeleme/ " title=" Python Dizin Listeleme "> Python Dizin Listeleme </a> </li> 
                    <li> <a href=" https://mefamex.com/projects/kali-linux/#default-bootloader " title=" Kali Default Bootloader "> Linux - Default Bootloader </a> </li> 
                    <li> <a href=" https://mefamex.com/projects/kali-change-boot-background/ " title=" Kali Custom Bootloader "> Linux - Arka plan Değiştirme </a> </li> 
                </ul> 
            </details> 
        </div> 
        <div class="FootSection"> 
            <details open> 
                <summary> İLETİŞİM </summary> 
                <ul> 
                    <li> <a href="https://mefamex.com/contact/" title="İletişim"> İletişim Anasayfa </a> </li>
                    <li> <a target="_blank" rel="noopener noreferrer" href="mailto:info@mefamex.com" title="e-mail"> <img src="${icon_black_path}/mail_icon-1.png"  alt="email icon" title="e-mail" decoding="async" loading="lazy"> E-mail: info@mefamex.com </a> </li>
                    <li> <a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSeT3DIqUkKNvyjoh8n-qtXphr44jCxf9sdIizKvNkK09i4Fsw/viewform?usp=sf_link" title=" İletişim Formu "> <img src="${icon_black_path}/blog_icon.png" alt="iletisim icon" title="Iletişim Formu" decoding="async" loading="lazy"> Anonim İletişim Formu </a> </li>
                    <li> <a target="_blank" rel="noopener noreferrer" href="https://github.com/Mefamex/" title="GitHub"> <img src="${icon_black_path}/github_icon.png" alt="GitHub icon" title="GitHub" decoding="async" loading="lazy"> GitHub </a> </li>
                    <li> <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/Mefamex" title="Twitter"> <img src="${icon_black_path}/x_icon.png" alt="Twitter icon" title="Twitter" decoding="async" loading="lazy"> Twitter </a> </li>
                    <li> <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/mefamex" title="LinkedIn"> <img src="${icon_black_path}/linkedin_icon.png" alt="LinkedIn icon" title="LinkedIn" decoding="async" loading="lazy"> LinkedIn </a> </li>
                    <li> <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/mefamex" title="Instagram"> <img src="${icon_black_path}/instagram_icon.png" alt="Instagram icon" title="Instagram" decoding="async" loading="lazy"> Instagram </a> </li>
                    <li> <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/mefamex58/" title="Facebook"> <img src="${icon_black_path}/facebook_icon.png" alt="Facebook icon" title="Facebook" decoding="async" loading="lazy"> Facebook </a> </li>
                    <li> <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/@mefamex/" title="YouTube"> <img src="${icon_black_path}/youtube_icon.png" alt="YouTube icon" title="YouTube" decoding="async" loading="lazy"> YouTube </a> </li>
                    <li> <a target="_blank" rel="noopener noreferrer" href="https://www.reddit.com/user/mefamex" title="Reddit"> <img src="${icon_black_path}/reddit_icon.png" alt="Reddit icon" title="Reddit" decoding="async" loading="lazy"> Reddit </a> </li>
                </ul> 
            </details> 
        </div> 
        <div class="FootSection"> 
            <details> 
                <summary> BLOG </summary> 
                <ul> 
                    <li> <a href="https://mefamex.com/blog/" title="Blog"> Blog Anasayfa </a> </li>
                    <li> <a href="#" title="#"> ------------ </a> </li> 
                    <li> <a href="#" title="#"> Biraz </a> </li> 
                    <li> <a href="#" title="#"> Keyfim </a> </li> 
                    <li> <a href="#" title="#"> Yetsin </a> </li> 
                    <li> <a href="#" title="#"> Ekliyecem </a> </li> 
                </ul> 
            </details> 
        </div> 
    `;

    const splitter = document.createElement("div"); splitter.id = "splitter"; footer.appendChild(splitter);

    const secondPart = document.createElement("div"); secondPart.id = "secondPart"; footer.appendChild(secondPart);
    secondPart.innerHTML = `
        <div id='secondLeft'> 
            <a href="https://mefamex.com" title="Anasayfa"> <img src="${scriptPath.replace('importHeaderFooter.js', 'mefamex_logo_bgb.png')}" alt="mefamex_logo" id="footerLogo"> </a> 
            <span class="vl"> </span> 
            <span> 2014-&infin; &copy;<b> MEFAMEX </b> </span> 
            <span class="vl"> </span> 
            <a href="https://mefamex.com/sitemap.xml" title="Website Haritası"> Sitemap  </a> 
        </div> 
        <div id='secondRight'> 
            <a href="https://github.com/Mefamex" target="_blank" rel="noopener noreferrer" title="GitHub"> <img src="${scriptPath.replace('components/importHeaderFooter.js', 'assets/icons/black/github_icon.png')}" alt="GitHub"> </a> 
            <span class="vl"> </span> 
            <a href="https://www.instagram.com/mefamex" target="_blank" rel="noopener noreferrer" title="Instagram"> <img src="${scriptPath.replace('components/importHeaderFooter.js', 'assets/icons/black/instagram_icon.png')}" alt="Instagram"> </a> 
            <span class="vl"> </span> 
            <a href="https://www.linkedin.com/in/mefamex/" target="_blank" rel="noopener noreferrer" title="LinkedIn"> <img src="${scriptPath.replace('components/importHeaderFooter.js', 'assets/icons/black/linkedin_icon.png')}" alt="LinkedIn"> </a> 
        </div> 
    `;
    secondPart.querySelectorAll("a").forEach((link) => {
        const nSpan = document.createElement("span");
        nSpan.className = "AlinkPopup";
        nSpan.textContent = link.title || link.textContent || link.href;
        link.appendChild(nSpan);
    });
    const footerBaseRem = 40;
    const getRem = () => parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    if (footer !== document.body.lastChild) { document.body.appendChild(footer); }
    if (window.innerWidth < footerBaseRem * getRem()) [...firstPart.querySelectorAll('details')].slice(1).forEach(details => details.removeAttribute('open'));

    if (firstPart.querySelectorAll('details').length > 1) { firstPart.querySelectorAll('details').forEach(details => { details.addEventListener('toggle', (event) => { checkDetails(event.target); }); }); }
    // en son açılan details öğesini hariç diğerlerini kapat
    function checkDetails(changedDetails) {
        // Sadece açılan details için diğerlerini kapat
        if (changedDetails.hasAttribute('open') && window.innerWidth < footerBaseRem * getRem() ) {
            firstPart.querySelectorAll('details').forEach(details => {
                if (details !== changedDetails) {
                    details.removeAttribute('open');
                }
            });
        }
    }
    await new Promise(resolve => setTimeout(resolve, 200));


    //footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //document.querySelector("main").style.maxHeight = '1rem';
    //document.querySelector("main").style.minHeight = '50vh';


    const styleElement = document.createElement('style');
    styleElement.id = 'for_footer_visibility_and_animation';
    styleElement.textContent = ` .footer-hidden { opacity: 0; transform: translateY(2em); transition: all 1s ease-out; } .footer-visible { opacity: 1; transform: translateY(0); } `;
    document.head.appendChild(styleElement);
    if (firstPart) firstPart.querySelectorAll('details').forEach(details => { details.querySelectorAll('a').forEach(li => { li.classList.add('footer-hidden'); }); });
    if (secondPart) { Array.from(secondPart.children).forEach(childd => { if (childd.nodeType === Node.ELEMENT_NODE) { Array.from(childd.children).forEach(child => { if (child.nodeType === Node.ELEMENT_NODE) child.classList.add('footer-hidden'); }); } }); }
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };
    if (firstPart) { firstPart.querySelectorAll('details').forEach(details => { const detailsObserver = new IntersectionObserver((entries, observer) => { entries.forEach(entry => { if (entry.isIntersecting) { const listItems = entry.target.querySelectorAll('a'); listItems.forEach((li, index) => { setTimeout(() => { li.classList.remove('footer-hidden'); li.classList.add('footer-visible'); }, index * (Math.floor(Math.random() * 50) + 100)); }); observer.unobserve(entry.target); } }); }, observerOptions); detailsObserver.observe(details); }); }
    if (secondPart) {
        requestAnimationFrame(() => {
            const secondPartObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const children = Array.from(entry.target.children).filter(child => child.nodeType === Node.ELEMENT_NODE);
                        children.forEach((childd) => { Array.from(childd.children).forEach((child, index) => { setTimeout(() => { child.classList.remove('footer-hidden'); child.classList.add('footer-visible'); }, index * (Math.floor(Math.random() * 101) + 200)); }); });
                        setTimeout(() => { const styleElement = document.getElementById('for_footer_visibility_and_animation'); if (styleElement) styleElement.remove(); footer.querySelectorAll('.footer-hidden, .footer-visible').forEach(element => { element.classList.remove('footer-hidden', 'footer-visible'); }); }, 10000);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            secondPartObserver.observe(secondPart);
        });
    }
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

