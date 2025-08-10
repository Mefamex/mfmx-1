/**
 * @fileoverview MEFAMEX Header ve Footer Bileşenleri
 * @author Mefamex <info@mefamex.com> 
 * @copyright 2024 Mefamex
 * @license MIT
 * @see https://mefamex.com
 * @since 2024-08-20 
 * @lastModified 2025-08-10-T00:00:00Z
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
    console.log('🔄 HeaderFooter CSS yükleniyor...');
    const cssPath = scriptPath.replace('importHeaderFooter.js', 'headerFooter.css');
    const existingLink = () => {
        if (document.querySelector(`link[href="${cssPath}"]`)) return true;
        if ([...document.querySelectorAll('link[rel="stylesheet"]')].some(link => link.href.endsWith('headerFooter.css'))) return true;
        /* if ([...document.querySelectorAll('style')].some(style => style.textContent.includes('.footer') || style.textContent.includes('.header'))) return true; */
        /*if (document.getElementById('headerFooterCSS')) return true;*/
        return false;
    };
    if (!existingLink()) {

        try {
            const response = await fetch(cssPath, { method: 'HEAD' });
            if (response.ok) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                if (!cssPath) throw new Error('CSS path bulunamadı');
                link.href = cssPath;
                document.head.appendChild(link);
            } else console.warn('⚠️ headerFooter.css bulunamadı');
        } catch (error) { console.warn('⚠️ CSS dosyası kontrol edilemedi', error); }
    }
    console.log('✅ HeaderFooter CSS yüklendi.');
    const createFooterTask = (async () => { try { await CreateFooter(); } catch (error) { console.error('❌ Footer oluşturulurken hata:', error); } })();
    const createHeaderTask = (async () => { try { await CreateHeader(); } catch (error) { console.error('❌ Header oluşturulurken hata:', error); } })();
    Promise.all([createFooterTask, createHeaderTask]);
})();


/* for development purposes only */
// if (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')) { setInterval(() => window.scrollTo(0, document.body.scrollHeight), 100); window.scrollTo(0, document.body.scrollHeight); }




async function CreateFooter() {
    console.log('🔄 Footer oluşturuluyor...');
    const footer = document.querySelector('body footer') || document.createElement('footer');
    footer.id = "footer"; footer.innerHTML = '';

    const firstPart = document.createElement("div"); firstPart.id = "firstPart"; footer.appendChild(firstPart);
    const icon_black_path = scriptPath.replace('components/importHeaderFooter.js', 'assets/icons/black/64x64');
    firstPart.innerHTML = `
        <div class="FootSection"> 
            <details open> 
                <summary> WEBSITE </summary> 
                <ul> <!-- Anasayfa, platform, projeler, blog, galeri, iletişim, özgeçmiş, Site Bağlantı Ağacı, Site Dosya Ağacı --> 
                    <li> <a href="https://mefamex.com" title="Anasayfa"> Anasayfa </a> </li> 
                    <li> <a href="https://mefamex.com/about/" title="Website Hakkında"> Platform </a> </li> 
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
                    <li> <a target="_blank" rel="noopener noreferrer" href="https://github.com/Mefamex/" title="GitHub"> <img src="${icon_black_path}/github_icon.png" alt="GitHub icon" title="GitHub" decoding="async" loading="lazy"> GitHub </a> </li>
                    <li> <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/mefamex" title="LinkedIn"> <img src="${icon_black_path}/linkedin_icon.png" alt="LinkedIn icon" title="LinkedIn" decoding="async" loading="lazy"> LinkedIn </a> </li>
                    <li> <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/mefamex" title="Instagram"> <img src="${icon_black_path}/instagram_icon.png" alt="Instagram icon" title="Instagram" decoding="async" loading="lazy"> Instagram </a> </li>
                    <li> <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/mefamex58/" title="Facebook"> <img src="${icon_black_path}/facebook_icon.png" alt="Facebook icon" title="Facebook" decoding="async" loading="lazy"> Facebook </a> </li> 
                    <!-- <li> <a target="_blank" rel="noopener noreferrer" href="https://www.reddit.com/user/mefamex" title="Reddit"> <img src="${icon_black_path}/reddit_icon.png" alt="Reddit icon" title="Reddit" decoding="async" loading="lazy"> Reddit </a> </li> -->
                    <!-- <li> <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/@mefamex/" title="YouTube"> <img src="${icon_black_path}/youtube_icon.png" alt="YouTube icon" title="YouTube" decoding="async" loading="lazy"> YouTube </a> </li> -->
                    <!-- <li> <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/Mefamex" title="Twitter"> <img src="${icon_black_path}/x_icon.png" alt="Twitter icon" title="Twitter" decoding="async" loading="lazy"> Twitter </a> </li> -->
                    <li> <a target="_blank" rel="noopener noreferrer" href="mailto:info@mefamex.com" title="e-mail"> <img src="${icon_black_path}/mail_icon.png"  alt="email icon" title="e-mail" decoding="async" loading="lazy"> E-mail: info@mefamex.com </a> </li>
                    <li> <a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSeT3DIqUkKNvyjoh8n-qtXphr44jCxf9sdIizKvNkK09i4Fsw/viewform?usp=sf_link" title=" İletişim Formu "> <img src="${icon_black_path}/contact_icon.png" alt="iletisim icon" title="Iletişim Formu" decoding="async" loading="lazy"> İletişim Formu </a> </li>
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
            <a href="https://github.com/Mefamex" target="_blank" rel="noopener noreferrer" title="GitHub"> <img src="${scriptPath.replace('components/importHeaderFooter.js', 'assets/icons/black/64x64/github_icon.png')}" alt="GitHub"> </a> 
            <span class="vl"> </span> 
            <a href="https://www.instagram.com/mefamex" target="_blank" rel="noopener noreferrer" title="Instagram"> <img src="${scriptPath.replace('components/importHeaderFooter.js', 'assets/icons/black/64x64/instagram_icon.png')}" alt="Instagram"> </a> 
            <span class="vl"> </span> 
            <a href="https://www.linkedin.com/in/mefamex/" target="_blank" rel="noopener noreferrer" title="LinkedIn"> <img src="${scriptPath.replace('components/importHeaderFooter.js', 'assets/icons/black/64x64/linkedin_icon.png')}" alt="LinkedIn"> </a> 
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
    if (window.innerWidth < footerBaseRem * getRem()) [...firstPart.querySelectorAll('details')].slice(2).forEach(details => details.removeAttribute('open'));

    if (firstPart.querySelectorAll('details').length > 1) { firstPart.querySelectorAll('details').forEach(details => { details.addEventListener('toggle', (event) => { checkDetails(event.target); }); }); }
    // en son açılan details öğesini hariç diğerlerini kapat
    function checkDetails(changedDetails) {
        // burada detailsler 2li sıralar halinde diziliyor. biri açıldığında yanındakini de aç, diğerlerini kapat
        if (changedDetails.hasAttribute('open') && window.innerWidth < footerBaseRem * getRem()) {
            const detailsList = Array.from(firstPart.querySelectorAll('details'));
            const idx = detailsList.indexOf(changedDetails);
            const groupStart = idx % 2 === 0 ? idx : idx - 1;
            // 2'li gruptaki details'leri açık bırak, diğerlerini kapat
            detailsList.forEach((details, i) => {
                if (i === groupStart || i === groupStart + 1) details.setAttribute('open', '');
                else details.removeAttribute('open');
            });
        }
    }
    await new Promise(resolve => setTimeout(resolve, 200));


    //footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //document.querySelector("main").style.maxHeight = '1rem';
    //document.querySelector("main").style.minHeight = '50vh';



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
    console.log('✅ Footer oluşturuldu.');
}







async function CreateHeader() {
    console.log('🔄 Header oluşturuluyor...');
    // Select / Create the header
    let header = document.querySelectorAll('body > header') || document.querySelectorAll('#header');
    if (header) {
        if (header.length > 1) { header.forEach((heads) => { heads.remove(); }); header = null; }
        else header = header[0];
    }
    if (!header) { header = document.createElement("header"); }
    header.id = "header"; header.innerHTML = ''; header.classList.add("scrolled", "slim");
    if (window.innerWidth < 600) { header.classList.add('slim'); }

    const divLeft = document.createElement("a"); header.appendChild(divLeft);
    divLeft.id = "headerDivLeft"; divLeft.href = "https://mefamex.com"

    const divLeftDiv = document.createElement("div"); divLeft.appendChild(divLeftDiv);
    divLeftDiv.id = "headerDivLefticonDiv";
    const divLeftIcon = document.createElement("img"); divLeftDiv.appendChild(divLeftIcon);

    divLeftIcon.src = scriptPath.replace('importHeaderFooter.js', 'mefamex_logo_bgb.png');
    divLeftIcon.alt = "mefamex_logo";

    const divLeftText = document.createElement("div"); divLeft.appendChild(divLeftText);
    divLeftText.id = "headerDivLeftText"; divLeftText.textContent = "MEFAMEX";

    const navBar = document.createElement("nav"); header.appendChild(navBar);
    navBar.id = "headerNavBar";

    const navBarList = [
        { text: "ANASAYFA", link: "/", alterimg: "assets/icons/black/64x64/home_icon.png" },
        { text: "PLATFORM", link: "/about/", alterimg: "assets/icons/black/64x64/info_icon.png" },
        { text: "PROJELER", link: "/projects/", alterimg: "assets/icons/black/64x64/project_icon.png" },
        { text: "BLOG", link: "/blog/", alterimg: "assets/icons/black/64x64/blog_icon.png" },
        { text: "GALERİ", link: "/gallery/", alterimg: "assets/icons/black/64x64/gallery_icon.png" },
        { text: "İLETİŞİM", link: "/contact/", alterimg: "assets/icons/black/64x64/contact_icon.png" },
        { text: "CV", link: "/cv/", alterimg: "assets/icons/black/64x64/cv_icon.png" }
    ] /* navbar a classes : pageA, showImg, showText, current_page */;
    navBarList.forEach((item, index) => {
        if (item.alterimg) item.alterimg = scriptPath.replace("components/importHeaderFooter.js", item.alterimg);
        const imgg = document.createElement("img"); imgg.src = item.alterimg; imgg.alt = item.text; imgg.loading = "lazy"; imgg.decoding = "async";
        const spann = document.createElement("span"); spann.textContent = item.text;
        let temp_item = document.createElement("a"); temp_item.classList.add("pageA", "showImg");
        temp_item.dataset.listIndex = index; temp_item.href = window.location.origin + item.link; temp_item.title = item.text;
        if (window.location.pathname.includes("/" + new URL(item.link, window.location.origin).pathname.split('/').filter(Boolean).pop())) temp_item.classList.add("current_page");
        temp_item.appendChild(imgg); temp_item.appendChild(spann);
        navBar.appendChild(temp_item);
    })

    const menuButton = document.createElement("button"); menuButton.id = "headerMenuButton"; header.appendChild(menuButton);
    menuButton.innerHTML = "<span class=\"hamburger-line\"></span> <span class=\"hamburger-line\"></span> <span class=\"hamburger-line\"></span>"
    menuButton.addEventListener("click", () => { header.classList.toggle("menuShow"); }, { passive: true });
    window.addEventListener('click', function (event) { if (!header.contains(event.target)) header.classList.remove('menuShow'); }, { passive: true });
    window.addEventListener('touchstart', function (event) { if (!header.contains(event.target)) header.classList.remove('menuShow'); }, { passive: true });
    const menuDiv = document.createElement("div"); menuDiv.id = "headerMenuDiv"; header.appendChild(menuDiv);
    header.appendChild(menuDiv);

    const docDate = ["article:modified_time", "og:date", "twitter:date", "date", "last-modified"].map(name => document.head.querySelector(`meta[property="${name}"], meta[name="${name}"]`)).find(meta => meta && meta.content)?.content;
    let onlyDate = docDate ? docDate.split("T")[0] : null;
    menuDiv.setAttribute("data-lastupdate", onlyDate ? `${onlyDate}` : "just do it");

    /* header için scrolled classı */

    /* 5remden küçükce yukarı kaydır */
    setInterval(() => {
        if (document.documentElement.scrollTop < 5 * (parseFloat(getComputedStyle(document.documentElement).fontSize) || 16) && !window.location.hash) {
            header.classList.remove("scrolled");
            if (10 < document.documentElement.scrollTop) setTimeout(() => { if (document.documentElement.scrollTop < 5 * (parseFloat(getComputedStyle(document.documentElement).fontSize) || 16) && !window.location.hash) { window.scrollTo({ top: 0, behavior: 'smooth' }); header.classList.remove("scrolled"); } }, 1000);
        }
    }, 500, { passive: true });

    /* scroll ise header gizle */
    let lastScroll = document.documentElement.scrollTop + 0;
    let lastScrollEvent = 0; /*  header menu button için */
    window.addEventListener("scroll", () => {
        if (Date.now() - lastScrollEvent < 100) return; lastScrollEvent = Date.now(); header.classList.remove('menuShow');
        let scrollTop = document.documentElement.scrollTop;
        if (scrollTop > lastScroll && scrollTop > 50) header.classList.add('scrolled')
        else header.classList.remove('scrolled');
        lastScroll = scrollTop + 0;
    }, { passive: true });
    /* header hover olduğunda scrolled sınıfını sil */
    header.addEventListener("mouseenter", () => { header.classList.remove('scrolled'); }, { passive: true });
    setTimeout(() => { window.scrollTo({ top: window.scrollY + 5, behavior: 'smooth' }); }, 200);
    /* header'ı ekle */
    if (header !== document.body.firstChild) { document.body.insertBefore(header, document.body.firstChild); }
    setTimeout(() => { if (window.scrollY < '150' && !window.location.hash) window.scrollTo({ top: 0, behavior: 'smooth' }) }, 100);

    /* responsive header */
    let lastCallTime = 0;
    let throttleTimeout = null;

    function navBarImager() {
        const now = Date.now();
        if (now - lastCallTime < 50) {
            if (!throttleTimeout) {
                throttleTimeout = setTimeout(() => {
                    throttleTimeout = null;
                    navBarImager();
                }, 50 - (now - lastCallTime));
            } return;
        } lastCallTime = now;

        try {
            header.classList.remove("blink");
            void header.offsetWidth;
            header.classList.add("blink");
        } catch (e) { }
        let documentRem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        const getfark = () => navBar.firstChild.getBoundingClientRect().left - divLeft.getBoundingClientRect().right;
        let fark = getfark();
        let index = 0;
        checkSlim();
        /* sıkıştık.. kurtar bizi js 0_0 */
        if (header.classList.contains("slim") && navBar.getBoundingClientRect().width < documentRem * 22) {
            const child = navBar.lastChild;
            if (child && navBar.children.length > 2) {
                child.classList.add("showImg"); child.classList.add("showText");
                menuDiv.insertBefore(child, menuDiv.firstChild);
            } return;
        }
        if (fark < documentRem) {
            while (fark < documentRem) {/* image and text */
                fark = getfark();
                index = Array.from(navBar.children).findIndex(child => child.classList.contains("showText") && child.classList.contains("showImg"));
                if (index > -1) {
                    let child = Array.from(navBar.children)[index];
                    child.classList.remove("showImg"); child.classList.add("showText");
                } else { /* only image */
                    index = Array.from(navBar.children).findIndex(child => !child.classList.contains("showImg"));
                    if (index > -1) {
                        let child = navBar.children[index];
                        child.classList.add("showImg"); child.classList.remove("showText");
                    } else { /* move to menuDiv */
                        header.classList.add("slim");
                        let child = navBar.lastChild;
                        if (child && navBar.children.length > 1) {
                            child.classList.add("showImg"); child.classList.add("showText");
                            menuDiv.insertBefore(child, menuDiv.firstChild);
                        }
                    }
                }
            } checkSlim(); setTimeout(navBarImager, 100); return;
        } else if (fark > documentRem * 4 && menuDiv.children.length > 0) {  /* move to navBar */
            let child = menuDiv.firstChild;
            child.classList.add("showImg"); child.classList.remove("showText");
            navBar.appendChild(child);
            checkSlim(); setTimeout(navBarImager, 100); return;
        } else if (fark > documentRem * 8) {
            let justImgIndex = Array.from(navBar.children).findLastIndex(child => child.classList.contains("showImg") && !child.classList.contains("showText"));
            if (justImgIndex > -1) {
                /* only text */
                let child = Array.from(navBar.children)[justImgIndex];
                child.classList.remove("showImg"); child.classList.add("showText");
                checkSlim(); setTimeout(navBarImager, 100); return;
            } else {
                /* image and text */
                let index = Array.from(navBar.children).findLastIndex(child => (!child.classList.contains("showText") || !child.classList.contains("showImg")));
                if (index > -1) {
                    navBar.children[index].classList.add("showImg", "showText");
                    checkSlim(); setTimeout(navBarImager, 100); return;
                }
            }
        }
        function checkSlim() {
            if (menuDiv.children.length > 0) header.classList.add("slim");
            else { if (header.classList.contains("slim")) { header.classList.add("scrolled"); } header.classList.remove("slim", "menuShow"); }
        } checkSlim();
    } /* navBarImager */
    setTimeout(navBarImager, 100); setTimeout(navBarImager, 200); setTimeout(navBarImager, 300); setTimeout(navBarImager, 500); setTimeout(navBarImager, 750); setTimeout(navBarImager, 1000);
    setInterval(navBarImager, 2000);
    window.addEventListener("resize", navBarImager, { passive: true });
    console.log('✅ Header oluşturuldu.');
}

