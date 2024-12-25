CreateFooter();
CreateHeader();




function CreateFooter() {
    //const footer = document.querySelector("footer");
    let footer = document.querySelector('body > footer') || document.createElement('footer');
    if (footer !== document.body.lastChild) { document.body.appendChild(footer); }
    //footer.innerHTML = `<link rel="stylesheet" type="text/css" href="/src/components/footer.css">`

    
    // CSS dosyasını yükle
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = document.currentScript.src.replace('importHeaderFooter.js', 'footer.css');
    document.head.appendChild(link);


    footer.id = "footer"; footer.innerHTML = "";

    const footerText = document.createElement("h1"); footer.appendChild(footerText);
    footerText.id = "footerText";
    footerText.innerHTML = "&copy; 2024 MEFAMEX , ALL RIGHT RESERVED";

    /*
    //set style to footer
    const style = document.createElement('style');
    style.innerHTML = `
html{
    display: flex ;
    flex-direction: column ;
    width: 100% ;
    min-height: 100vh ;
    box-sizing: border-box ;
    overflow-x: hidden ;
    overflow-y: auto ;
    margin: 0 ;
    padding: 0 ;
    background-color: rgb(15, 15, 15) ;
    color: white ;
}
body {
    width: 100% ;
    min-height: 100vh ;
    display: flex ;
    flex-direction: column ;
    box-sizing: border-box ;
    margin: 0 ;
    padding: 0 ;
    background-color: rgb(15, 15, 15) ;
}
footer {
    display: flex;
    flex-direction: row;
    bottom: 0px;
    width: 100%;
    height: 5dvh;
    background-color:  #0e1013;
    align-content: center;
    justify-content: center;
    border-top: 0.1dvh solid white;
    margin-top: 1dvh;
}
#footerText{
    color: white;
    font-size: 1.8vh;
}
`;
    footer.appendChild(style);
*/
}


function CreateHeader() {
    let header = document.querySelector('body > header') || document.createElement('header');
    if (header !== document.body.firstChild) { document.body.insertBefore(header, document.body.firstChild); }

    header.id = "header"; header.innerHTML = "";
    //header.innerHTML = `<link rel="stylesheet" type="text/css" href="/src/components/header.css">`
    

    const headerDivLeftSpace = document.createElement("div"); header.appendChild(headerDivLeftSpace);
    headerDivLeftSpace.style.display = "flex"; //for divleft to center

    const divLeft = document.createElement("a"); header.appendChild(divLeft);
    divLeft.id = "headerDivLeft"; divLeft.href = "https://mefamex.com"
    divLeft.addEventListener('click', () => { window.location.href = "https://mefamex.com" });
    divLeft.onmouseover = () => { divLeft.classList.add("headerDivLeftHover") }
    divLeft.onmouseout = function () { divLeft.classList.remove("headerDivLeftHover") };

    const divLeftIcon = document.createElement("img"); divLeft.appendChild(divLeftIcon);
    divLeftIcon.id = "headerDivLeftIcon"

    divLeftIcon.src = document.currentScript.src.replace(/\/[^/]*$/, '/mefamex_logo_bgb.png');
    //divLeftIcon.src = "/src/assets/images/mfmx_icon/mefamex_logo_bgb.png";
    divLeftIcon.alt = "mefamex_logo";

    const divLeftText = document.createElement("h1"); divLeft.appendChild(divLeftText);
    divLeftText.id = "headerDivLeftText";
    divLeftText.textContent = "MEFAMEX.com";


    const navBar = document.createElement("nav"); header.appendChild(navBar);
    navBar.id = "headerNavBar";

    const navBarList = [
        { text: "ANASAYFA", link: "https://mefamex.com/" },
        { text: "HAKKIMDA", link: "https://mefamex.com/about/" },
        { text: "İLETİŞİM", link: "https://mefamex.com/contact/" },
        { text: "BLOG", link: "https://mefamex.com/blog/" },
        { text: "PROJELER", link: "https://mefamex.com/projects/" }
    ]
    navBarList.forEach((item) => {
        let temp_item = document.createElement("a"); navBar.appendChild(temp_item);
        temp_item.textContent = item.text; temp_item.href = item.link;
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
        temp_item.style.display = "block"; temp_item.style.color = "white";
    })
    window.addEventListener('scroll', function () { navBarHideButton.className = 'unselected'; });

    //set style to header
    const style = document.createElement('style');
    style.innerHTML = `
::-webkit-scrollbar {
    width: 0.8vw; /*calc(0.5vw + 6px); width of the scrollbar */
    height: 12px; /* height of the scrollbar */
    background-color: #00000067; /* dark gray background color */
    border-radius: 10px; /* rounded corners for the scrollbar */
}

::-webkit-scrollbar-thumb {
    background-color: #b8b8b8; /* dark gray thumb color */
    border-radius: 12px; /* rounded corners for the thumb */
    border: 0.1vw solid #ff0000; /* dark gray border around the thumb */
}

::-webkit-scrollbar-track {
    background-color: #1d1d1d; /* dark gray track color */
    border-radius: 1px; /* rounded corners for the track */
    box-shadow: inset 0 0 0.3rem rgba(255, 255, 255, 0.9); /* subtle shadow effect */
    }
::-webkit-scrollbar-button {
    display: none;
}
@keyframes entranceRight {
    0% {
        opacity: 0;
        transform: translateX(5rem) translateY(-1rem) ;
        scale:0.9;
    }
    90% {
        opacity: 1;
        transform: translateX(-0.2rem) translateY(0.3rem);
        scale:1;
    }
    100% {
        opacity: 1;
        transform: translateX(0rem) translateY(0rem);
        scale:1;
    }
}
header {
    display: flex;
    flex-direction: row;
    position: relative;
    top: 0px;
    width: 100%;
    height: 5rem;
    margin: 0;
    background-color: #0e1013;
    justify-content: space-between;
    border-bottom: 0.1dvh solid white;
    box-shadow: 0 0.3vh 0.5vh rgba(255, 255, 255, 0.4), 0 1vh 0.5vh rgba(0, 0, 0, 0.4), 0 2vh 1vh rgba(0, 0, 0, 0.4);
    z-index: 1000;
}

#headerDivLeft {
    display: flex;
    position: fixed;
    left: 0px;
    height: 4.8rem; 
    width: fit-content;
    align-items: center;
    gap: 0.5vw;
    margin-left: 0.5vw;
    cursor: pointer;
    transition: all 500ms normal;
    -webkit-user-select: none;
    user-select: none;
    background-color:  #0e1013e0;
    box-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.6), 0 0 1rem rgba(0, 0, 0, 1), 0 0 2rem rgba(0, 0, 0, 1);
    border: 0.1vw solid rgba(100, 100, 100, 0.5);
    border-radius: 1.5rem;
    padding-inline: 1rem;
    z-index: 1000;
}
#headerDivLeftIcon {
    height: 80%;
}
#headerDivLeftText {
    margin: 0px;
    padding: 0px;
    color: white;
    text-decoration:rgb(168, 75, 255) underline;
    font-size: 1rem;
}
#headerDivLeft:hover #headerDivLeftText{
    text-decoration-color: rgb(255, 0, 0) !important;
}
.headerDivLeftHover {
    background-color: #0e1013 !important;
    border: 0.1rem solid white !important;
    scale:1.05;
    transform:translateX(0.25rem) translateY(0.25rem);
    box-shadow: 0 0 0.5rem rgba(255, 255, 255, 1), 0 0 1rem rgba(0, 0, 0, 1), 0 0 2rem rgba(0, 0, 0, 1);
}

#headerNavBar {
    display: flex;
    flex-direction: row;
    list-style: none;
    background-color: rgba(0, 0, 0, 0.356);
    height: 80%;
    align-self: center;
    align-items: center;
    gap: 2dvw;
    border-radius: 1rem;
    padding-inline: 0.5dvw;
}
#headerNavBar > a {
    display: block;
    align-content: center;
    text-decoration: none;
    padding-inline: 1dvw;
    height: 80%;
    background-color: #000000;
    color: #f0f0ff;
    font-size: 1rem;
    border-radius: 1rem;
    transition: all 0.3s ease-in-out;
}
#headerNavBar > a:hover {
    background-color: whitesmoke;
    color: black;
}

#navBarHideButton {
    margin-right: 5dvw;
    display: none;
    height: 70%;
    align-self: center;
    /*filter: drop-shadow(0 0 0.1rem white);*/
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
    opacity:0.8;
}
#navBarHideButton.unselected {
    content: url("/src/assets/icons/=.ico");
}
#navBarHideButton.selected {
    content: url("/src/assets/icons/x.ico");
    opacity:1;
    filter: drop-shadow(0 0 0.1rem white);
}

#navBarHidden {
    border: 2px solid white;
    position: absolute;
    display: none;
    flex-direction: column;
    right: 0;
    top: 3rem;
    background-color: #0e1013;
    gap: 4dvw;
    padding-block: 3dvw;
    padding-inline: 5dvw;
    font-size: 1.1rem;
    border-radius: 1rem 0 0 3rem;
    counter-reset: i;
    animation: entranceRight 0.3s  ease-out forwards;
}


@media screen and (max-width: 768px) {
    header {
        height: 3rem;
        position: fixed;
        top: 0;
        left: 0;
    }
    #headerDivLeft {
        position: relative;
        height: 2.75rem;
    }
    #headerDivLeftText {
        font-size: 1rem;
    }
    #headerNavBar {
        display: none;
    }
    #navBarHideButton {
        display: flex;
    }
    #navBarHideButton.selected ~ #navBarHidden {
        display: flex;
    }
    body{
        padding-top: 3.1rem !important
    };
}
`;
    header.appendChild(style);

}

