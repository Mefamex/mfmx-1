/**
 * @fileoverview MEFAMEX pages-blog Script File
 * @author Mefamex <info@mefamex.com>
 * @copyright 2024 Mefamex
 * @license MIT
 * @version 1.0.0
 * @see https://mefamex.com/
 * @since 2025-02-22
 * @lastModified 2025-02-22
 */


(async () => { await Greeting(); })();
/* await CreateAside(); */
/*await CreateNavContainer();*/



async function Greeting() {
    console.log('%cWelcome to MEFAMEX Blog', '                            color: #fff; background-color: #333; padding: 1em;   border-radius: 0.5em; font-size: 2rem; font-weight: bold; text-shadow: 0.1rem 0.1rem 0.1rem #fff;');
    console.log('%cI dont know what you want but you can text to me...', 'color: #333; background-color: #fff; padding: 0.5em; border-radius: 0.5em; font-size: 1rem; font-weight: bold; text-shadow: 0.05em 0.05em 0.05em #000;');
    console.log('%cThis is a blog page.', '                               color: #333; background-color: #fff; padding: 0.5em; border-radius: 0.5em; font-size: 1rem; font-weight: bold; text-shadow: 0.05em 0.05em 0.05em #000;');
    console.log('%cHave a good time ^^ ', '                               color: #333; background-color: #fff; padding: 0.5em; border-radius: 0.5em; font-size: 1rem; font-weight: bold; text-shadow: 0.05em 0.05em 0.05em #000;');
}




/* NOT WORKING I WILL RETURN 
importStylesheep();
function importStylesheep() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'page_aside.css';
    document.head.appendChild(link);
}*/

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
                        <li><a href="#kali_linux">      Kali Linux                      </a></li> 
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
                    <li ><a href="https://mefamex.com/projects/image-meta-dataset/" > Image Meta Dataset </a> <p class="p_tooltip noSelect">30.01.2025</p></li>
                    <li ><a href="https://mefamex.com/projects/html_css_book/" > Html-Css Kitaplığı </a>      <p class="p_tooltip noSelect">25.12.2024</p></li>
                    <li ><a href="https://mefamex.com/projects/python_to_exe/" > Python To Exe </a>           <p class="p_tooltip noSelect">18.12.2024</p></li>
                    <li ><a href="https://mefamex.com/projects/kali_linux/" > Kali Linux </a>                 <p class="p_tooltip noSelect">10.12.2024</p></li>
                    <li ><a href="https://mefamex.com/projects/dizin_listeleme/" > Dizin Listeme </a>         <p class="p_tooltip noSelect">09.12.2024</p></li>
                    <li>Tasarıma başlandı <p class="p_tooltip noSelect">07.12.2024</p></li>
                    <li>Sayfa tasarımı <p class="p_tooltip noSelect">05.12.2024</p></li>
                    <li>Talepler toplandı <p class="p_tooltip noSelect">18.11.2024</p></li>
                </ul>
    `
}

