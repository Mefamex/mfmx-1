/**
 * @fileoverview MEFAMEX pages-projects Script File
 * @author Mefamex <info@mefamex.com>
 * @copyright 2024 Mefamex
 * @license MIT
 * @see https://mefamex.com/
 * @since 2024-12-02 
 * @lastModified 2025-09-03-T00:00:00Z
 */

'use strict';

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
else init();

function init() {
    domLoaded();
}

/*await CreateNavContainer();*/
function domLoaded() {
    const sections = document.querySelectorAll('#main_container main > section');
    if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                        entry.target.style.opacity = '';
                    });
                }
            });
        }, { threshold: [0.1, 0.2, 0.3], rootMargin: '50px 0px', });
        sections.forEach(section => {
            try { section.style.opacity = '0'; observer.observe(section); }
            catch (error) { section.style.opacity = '1'; section.classList.add('visible'); console.warn('Section gözlemleme hatası:', error); }
        });
    } else {
        console.warn('IntersectionObserver desteklenmiyor. Fallback kullanılıyor.');
        const checkVisibility = () => {
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) { section.classList.add('visible'); section.style.opacity = ''; }
            });
        };
        let ticking = false;
        window.addEventListener('scroll', () => { if (!ticking) { window.requestAnimationFrame(() => { checkVisibility(); ticking = false; }); ticking = true; } }, { passive: true });
        window.addEventListener('load', checkVisibility);
    }
};




/* abonded *//*
async function CreateNavContainer() {
    const nav = document.getElementById("nav");
    //const nav = document.createElement('nav'); document.body.insertBefore(nav, document.getElementById("mainWellcome"));

    nav.innerHTML = ` 
                <div id="navContainer"> 
                    <h2>MENU</h2> 
                    <ul>
                        <li><a href="#yapay_zeka">      Yapay Zeka ve Makine Öğrenimi   </a></li> 
                        <li><a href="#ag_ve_guvenlik">  Ağ ve Güvenlik                  </a></li> 
                        <li><a href="#web_gelistirme">  Web Geliştirme ve API'ler       </a></li> 
                        <li><a href="#kali-linux">      Kali Linux                      </a></li> 
                        <li><a href="#diger">           Diğer Projeler                  </a></li> 
                    </ul>
                </div> 
    `
}
*/