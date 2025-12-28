/**
 * @fileoverview MEFAMEX Header ve Footer Bileşenleri
 * @author Mefamex <info@mefamex.com> 
 * @copyright 2024 Mefamex
 * @license MIT
 * @see https://mefamex.com
 * @since 2024-08-20 
 * @lastModified 2025-09-03-T00:00:00Z
 */

'use strict';

function getScriptPath() {
    const currentScript = Array.from(document.getElementsByTagName('script')).find(script => script.src?.includes('importHeaderFooter.js'));
    if (currentScript?.src) return currentScript.src; if (currentScript?.href) return currentScript.href;
    //if (document.currentScript?.src) return document.currentScript.getAttribute('src');
    //if (document.currentScript?.href) return document.currentScript.getAttribute('href');
    // bu ikisi saçma şekilde tarayıcı tarafından hata veriyor. dinamik yüklemede tarayıcı niye kendi dizininde arasında amk
    // absolute path vermeme rağmen tarayıcı bunu benim sitemin kök dizininden başlıyarak alması gerektiğini çözemiyor. 
    // frameworklerde bu hata çözümlüştü....
    const fallbackPath = 'https://mefamex.com/src/components/importHeaderFooter.js';
    console.log('⚠️ HeaderFooter Script yolu bulunamadı! Varsayılan konum kullanılıyor:', fallbackPath);
    return fallbackPath;
};


let scriptPath = getScriptPath();

if (typeof RUSHED === 'undefined') { var RUSHED = false; }

(async () => {
    if (RUSHED) return; RUSHED = true;
    /*console.log('🔄 [HeaderFooter] yükleniyor...');*/
    const cssPath = scriptPath.replace('importHeaderFooter.js', 'headerFooter.css');
    const existingLink = () => {
        if ([...document.querySelectorAll('link[rel="stylesheet"]')].some(link => link.href.endsWith('/src/components/headerFooter.css'))) return true;
        return false;
    };
    if (!existingLink()) document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'stylesheet', href: cssPath }));

    if (document.readyState === 'loading') { /*console.log('🔄 [HeaderFooter] bekliyor...');*/ document.addEventListener('DOMContentLoaded', initHeaderFooter, { once: true }); }
    else initHeaderFooter();
})();





async function initHeaderFooter() {
    /*console.log('🔄 [HeaderFooter] işleniyor...');*/
    const createFooterTask = (async () => { try { await CreateFooter(); } catch (error) { console.error('❌ Footer oluşturulurken hata:', error); } })();
    const createHeaderTask = (async () => { try { await CreateHeader(); } catch (error) { console.error('❌ Header oluşturulurken hata:', error); } })();
    Promise.all([createFooterTask, createHeaderTask]).then(() => {/*console.log('✅ [HeaderFooter] oluşturuldu');*/ });
}




async function CreateFooter() {
    const footer = document.querySelector('body footer') || document.createElement('footer');
    footer.id = "footer"; footer.innerHTML = '';
    footer.innerHTML = `
        <div id='footerLeft'> 
            <span> &copy; 2014-&infin; Mefamex, All rights reserved </span> 
        </div> 
        <div id="footerMid">
            <a href="https://mefamex.com" title="Anasayfa"> <img src="${scriptPath.replace('importHeaderFooter.js', 'mefamex_logo_bgb.png')}" alt="MEFAMEX"> </a> 
        </div>
        <div id='footerRight'> 
            <a href="https://github.com/Mefamex" target="_blank" rel="noopener noreferrer" title="Github"> <img src="${scriptPath.replace('components/importHeaderFooter.js', 'assets/icons/black/64x64/github_icon.png')}" alt="GitHub" > </a> 
            <a href="https://www.instagram.com/mefamex" target="_blank" rel="noopener noreferrer" title="Instagram"> <img src="${scriptPath.replace('components/importHeaderFooter.js', 'assets/icons/black/64x64/instagram_icon.png')}" alt="Instagram"> </a> 
            <a href="https://www.linkedin.com/in/mefamex/" target="_blank" rel="noopener noreferrer" title="LinkedIn"> <img src="${scriptPath.replace('components/importHeaderFooter.js', 'assets/icons/black/64x64/linkedin_icon.png')}" alt="LinkedIn"> </a> 
            <a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSeT3DIqUkKNvyjoh8n-qtXphr44jCxf9sdIizKvNkK09i4Fsw/viewform?usp=sf_link" title=" İletişim Formu "> <img src="${scriptPath.replace('components/importHeaderFooter.js', 'assets/icons/black/64x64/contact_icon.png')}" alt="iletisim icon" title="Iletişim Formu" decoding="async" loading="lazy"> </a>
        </div> 
    `;
    footer.querySelectorAll('img').forEach((img) => {
        img.loading = "lazy";
        img.decoding = "async";
    });
    footer.querySelectorAll("#footerRight a").forEach((link) => {
        const nSpan = document.createElement("span");
        nSpan.className = "AlinkPopup";
        nSpan.textContent = link.title || link.textContent || link.href;
        link.appendChild(nSpan);
    });
    if (footer !== document.body.lastChild) { document.body.appendChild(footer); }


    if (footer) { Array.from(footer.children).forEach(childd => { if (childd.nodeType === Node.ELEMENT_NODE) { Array.from(childd.children).forEach(child => { if (child.nodeType === Node.ELEMENT_NODE) child.classList.add('footer-hidden'); }); } }); }
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };
    if (footer) {
        requestAnimationFrame(() => {
            const secondPartObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const children = Array.from(entry.target.children).filter(child => child.nodeType === Node.ELEMENT_NODE);
                        let index_all = 0;
                        children.forEach((childd, index1) => { Array.from(childd.children).forEach((child) => { setTimeout(() => { child.classList.remove('footer-hidden'); index_all++; child.classList.add('footer-visible'); }, (100 * index_all++) + (Math.floor(Math.random() * 100))); }); });
                        setTimeout(() => { const styleElement = document.getElementById('for_footer_visibility_and_animation'); if (styleElement) styleElement.remove(); footer.querySelectorAll('.footer-hidden, .footer-visible').forEach(element => { element.classList.remove('footer-hidden', 'footer-visible'); }); }, 10000);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            secondPartObserver.observe(footer);
        });
    }
}







async function CreateHeader() {
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
        { text: "ANASAYFA", link: "/", alterimg: "/src/assets/icons/black/64x64/home_icon.png" },
        { text: "PLATFORM", link: "/about/", alterimg: "/src/assets/icons/black/64x64/info_icon.png" },
        { text: "PROJELER", link: "/projects/", alterimg: "/src/assets/icons/black/64x64/project_icon.png" },
        { text: "BLOG", link: "/blog/", alterimg: "/src/assets/icons/black/64x64/blog_icon.png" },
        { text: "GALERİ", link: "/gallery/", alterimg: "/src/assets/icons/black/64x64/gallery_icon.png" },
        { text: "İLETİŞİM", link: "/contact/", alterimg: "/src/assets/icons/black/64x64/contact_icon.png" },
        { text: "CV", link: "/cv/", alterimg: "/src/assets/icons/black/64x64/cv_icon.png" }
    ] /* navbar a classes : pageA, showImg, showText, current_page */;
    let projectsNavElement = null;
    navBarList.forEach((item, index) => {
        const imgg = document.createElement("img"); imgg.src = item.alterimg; imgg.alt = ""; imgg.loading = "lazy"; imgg.decoding = "async"; imgg.setAttribute("importance", "low"); imgg.setAttribute("fetchpriority", "low");
        const spann = document.createElement("span"); spann.textContent = item.text;
        let temp_item = document.createElement("a"); temp_item.classList.add("pageA", "showImg");
        temp_item.dataset.listIndex = index; temp_item.href = window.location.origin + item.link; temp_item.title = item.text;
        if (window.location.pathname.includes("/" + new URL(item.link, window.location.origin).pathname.split('/').filter(Boolean).pop())) temp_item.classList.add("current_page");
        temp_item.appendChild(imgg); temp_item.appendChild(spann);
        if (item.text === "PROJELER") { projectsNavElement = temp_item; }
        navBar.appendChild(temp_item);
    })

    const menuButton = document.createElement("button"); menuButton.id = "headerMenuButton"; header.appendChild(menuButton);
    menuButton.innerHTML = "<span class=\"hamburger-line\"></span> <span class=\"hamburger-line\"></span> <span class=\"hamburger-line\"></span>"
    menuButton.addEventListener("click", () => { header.classList.toggle("menuShow"); }, { passive: true });
    window.addEventListener('click', function (event) { if (!header.contains(event.target)) header.classList.remove('menuShow'); }, { passive: true });
    window.addEventListener('touchstart', function (event) { if (!header.contains(event.target)) header.classList.remove('menuShow'); }, { passive: true });
    const menuDiv = document.createElement("div"); menuDiv.id = "headerMenuDiv"; header.appendChild(menuDiv);
    header.appendChild(menuDiv);

    /* Projects Big Menu Overlay */
    let projectsBigMenu = document.getElementById('projectsBigMenu');
    if (!projectsBigMenu) {
        projectsBigMenu = document.createElement('div');
        projectsBigMenu.id = 'projectsBigMenu';
        projectsBigMenu.setAttribute('aria-hidden', 'true');
        projectsBigMenu.innerHTML = "" +
            "<div class=\"projects-bigmenu-inner\">" +
            "  <div class=\"projects-bigmenu-header\">" +
            "    <h2>Projeler</h2>" +
            "    <button type=\"button\" class=\"projects-bigmenu-close\" aria-label=\"Kapat\">&times;</button>" +
            "  </div>" +
            "  <div class=\"projects-bigmenu-grid\" id=\"projectsBigMenuGrid\"></div>" +
            "</div>";
        document.body.appendChild(projectsBigMenu);
    }

    const projectsBigMenuGrid = document.getElementById('projectsBigMenuGrid');

    async function loadProjectsFromProjectsPage() {
        try {
            const resp = await fetch('/projects/index.html', { cache: 'no-store' });
            if (!resp.ok) return [];
            const htmlText = await resp.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');
            const sections = Array.from(doc.querySelectorAll('section.card'));
            const projects = [];
            sections.forEach(section => {
                const categoryTitle = (section.querySelector('h2')?.textContent || '').trim();
                const lis = Array.from(section.querySelectorAll('ul li'));
                lis.forEach(li => {
                    const link = li.querySelector('a');
                    const title = (link ? link.textContent : li.textContent || '').trim();
                    const href = link ? link.getAttribute('href') : null;
                    if (!title) return;
                    const description = li.getAttribute('data-language') || li.getAttribute('data-date') || '';
                    projects.push({
                        category: categoryTitle,
                        title: title,
                        href: href,
                        description: description
                    });
                });
            });
            return projects;
        } catch (e) {
            return [];
        }
    }

    async function fillProjectsBigMenu() {
        if (!projectsBigMenuGrid || projectsBigMenuGrid.childElementCount > 0) return;

        function renderProjects(list) {
            list.forEach(p => {
                if (!p || !p.title) return;
                const itemDiv = document.createElement('div');
                itemDiv.className = 'projects-bigmenu-item';

                if (p.category) {
                    const cat = document.createElement('div');
                    cat.className = 'projects-bigmenu-category';
                    cat.textContent = p.category;
                    itemDiv.appendChild(cat);
                }

                const hasHref = !!p.href;
                const linkOrDiv = hasHref ? document.createElement('a') : document.createElement('div');
                if (hasHref) {
                    linkOrDiv.href = p.href;
                    linkOrDiv.title = p.title || '';
                }

                const titleEl = document.createElement('h3');
                titleEl.className = 'projects-bigmenu-title';
                titleEl.textContent = p.title;

                const descEl = document.createElement('p');
                descEl.className = 'projects-bigmenu-description';
                if (p.description) descEl.textContent = p.description;

                linkOrDiv.appendChild(titleEl);
                if (p.description) linkOrDiv.appendChild(descEl);
                itemDiv.appendChild(linkOrDiv);
                projectsBigMenuGrid.appendChild(itemDiv);
            });
        }

        let allProjects = await loadProjectsFromProjectsPage();

        if (!allProjects || !allProjects.length) {
            let projects = [];
            try {
                const resp = await fetch('/navigation.json', { cache: 'no-store' });
                if (resp.ok) {
                    const data = await resp.json();
                    const menu = (data && data.menu) || [];
                    const pagesEntry = menu.find(m => Array.isArray(m.submenu));
                    let projectsEntry = null;
                    if (pagesEntry && Array.isArray(pagesEntry.submenu)) {
                        projectsEntry = pagesEntry.submenu.find(s => s.title === 'Projects');
                    }
                    if (projectsEntry && Array.isArray(projectsEntry.submenu)) {
                        projects = projectsEntry.submenu.filter(p => p.isVisible !== false);
                    }
                }
            } catch (e) { }

            if (!projects.length) {
                projects = [
                    { title: 'Dizin Listeleme', href: '/projects/dizin-listeleme/', description: 'Python dizin analiz aracı' },
                    { title: 'Kali Linux', href: '/projects/kali-linux/', description: 'Kali Linux notları' },
                    { title: 'Kali Boot Arkaplan', href: '/projects/kali-change-boot-background/', description: 'GRUB arkaplan değişimi' },
                    { title: 'HTML/CSS Kitaplığı', href: '/projects/html-css-book/', description: 'Web geliştirme rehberi' },
                    { title: 'Python To EXE', href: '/projects/python-to-exe/', description: 'Paketleme notları' },
                    { title: 'Image Meta Dataset', href: '/projects/image-meta-dataset/', description: 'Görsel meta verisi aracı' }
                ];
            }

            allProjects = projects.map(p => ({
                category: 'Projects',
                title: p.title,
                href: p.href,
                description: p.description
            }));
        }

        renderProjects(allProjects);
    }

    function openProjectsBigMenu() {
        if (!projectsBigMenu) return;
        try {
            const headerRect = header.getBoundingClientRect();
            const headerHeight = headerRect && headerRect.height ? headerRect.height : 0;
            projectsBigMenu.style.top = headerHeight + 'px';
            projectsBigMenu.style.height = 'calc(100vh - ' + headerHeight + 'px)';
        } catch (e) { }
        projectsBigMenu.classList.add('show');
        projectsBigMenu.setAttribute('aria-hidden', 'false');
        fillProjectsBigMenu();
    }

    function closeProjectsBigMenu() {
        if (!projectsBigMenu) return;
        projectsBigMenu.classList.remove('show');
        projectsBigMenu.setAttribute('aria-hidden', 'true');
    }

    if (projectsBigMenu) {
        const closeBtn = projectsBigMenu.querySelector('.projects-bigmenu-close');
        if (closeBtn) closeBtn.addEventListener('click', closeProjectsBigMenu, { passive: true });
        projectsBigMenu.addEventListener('click', (event) => { if (event.target === projectsBigMenu) closeProjectsBigMenu(); });
        projectsBigMenu.addEventListener('mouseleave', () => {
            setTimeout(() => { if (!projectsNavElement || !projectsNavElement.matches(':hover')) closeProjectsBigMenu(); }, 150);
        }, { passive: true });
        window.addEventListener('keyup', (event) => { if (event.key === 'Escape') closeProjectsBigMenu(); }, { passive: true });
    }

    if (projectsNavElement) {
        let hoverTimeout = null;
        projectsNavElement.addEventListener('mouseenter', () => {
            if (hoverTimeout) window.clearTimeout(hoverTimeout);
            openProjectsBigMenu();
        }, { passive: true });

        projectsNavElement.addEventListener('mouseleave', () => {
            hoverTimeout = window.setTimeout(() => {
                if (!projectsBigMenu || projectsBigMenu.matches(':hover')) return;
                closeProjectsBigMenu();
            }, 150);
        }, { passive: true });

        projectsNavElement.addEventListener('click', (event) => {
            event.preventDefault();
            if (projectsBigMenu && projectsBigMenu.classList.contains('show')) closeProjectsBigMenu();
            else openProjectsBigMenu();
        });
    }

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
}

