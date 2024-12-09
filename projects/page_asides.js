CreateNavContainer();
CreateAside();

/* NOT WORKING
importStylesheep();
function importStylesheep() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'page_aside.css';
    document.head.appendChild(link);
}*/

function CreateNavContainer() {
    const nav = document.getElementById("nav");
    //const nav = document.createElement('nav'); document.body.insertBefore(nav, document.getElementById("mainWellcome"));

    nav.innerHTML = `
                <div id="navContainer">
                    <h2>MENU</h2>
                    <ul>
                        <li><a href="#yapayZeka">Yapay Zeka ve Makine Öğrenimi</a></li>
                        <li><a href="#agVeGuvenlik">Ağ ve Güvenlik</a></li>
                        <li><a href="#webGelistirme">Web Geliştirme ve API'ler</a></li>
                        <li><a href="#diger">Diğer Projeler</a></li>
                    </ul>
                </div>
    `

}


function CreateAside() {
    const aside = document.getElementById("aside");
    //const aside = document.createElement('aside'); document.body.appendChild(aside); 

    aside.innerHTML = `
    <h2>SON DEĞİŞENLER</h2>
                <ul>
                    <li>Sayfa Tasarımı seçildi</li>
                    <li>Tasarıma başlandı</li>
                    <li>Talepler toplandı</li>
                </ul>
    `
}

