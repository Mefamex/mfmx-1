/**
 * @fileoverview MEFAMEX pages-projects Script File
 * @author Mefamex <info@mefamex.com>
 * @copyright 2024 Mefamex
 * @license MIT
 * @version 1.0.0
 * @see https://mefamex.com/
 * @since 2024-12-02 
 * @lastModified 2025-03-07
 */



(async () => { await CreateAside(); })();
/*await CreateNavContainer();*/


document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('#main_container main > section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Bir kez görününce gözlemlemeyi bırak
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => { observer.observe(section); section.style.opacity = 0; });
});




/* abonded */
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
                    </ul> ww
                </div> 
    `
}


async function CreateAside() {
    const aside = document.getElementById("aside");
    //const aside = document.createElement('aside'); document.body.appendChild(aside); 

    aside.innerHTML = `
    <h2>SON DEĞİŞENLER</h2>
                <ul>
                    <li ><a href="https://mefamex.com/projects/kali-change-boot-background/" > Kali Bootloader Background </a> <p class="p_tooltip noSelect">07.03.2025</p></li>
                    <li ><a href="https://mefamex.com/projects/image-meta-dataset/" > Image Meta Dataset </a> <p class="p_tooltip noSelect">30.01.2025</p></li>
                    <li ><a href="https://mefamex.com/projects/html-css-book/" > Html-Css Kitaplığı </a>      <p class="p_tooltip noSelect">25.12.2024</p></li>
                    <li ><a href="https://mefamex.com/projects/python-to-exe/" > Python To Exe </a>           <p class="p_tooltip noSelect">18.12.2024</p></li>
                    <li ><a href="https://mefamex.com/projects/kali-linux/" > Kali Linux </a>                 <p class="p_tooltip noSelect">10.12.2024</p></li>
                    <li ><a href="https://mefamex.com/projects/dizin-listeleme/" > Dizin Listeme </a>         <p class="p_tooltip noSelect">09.12.2024</p></li>
                    <li>Tasarıma başlandı <p class="p_tooltip noSelect">07.12.2024</p></li>
                    <li>Sayfa tasarımı <p class="p_tooltip noSelect">05.12.2024</p></li>
                    <li>Talepler toplandı <p class="p_tooltip noSelect">18.11.2024</p></li>
                </ul>
    `
}

