CreateFooter();
CreateHeader();




function CreateFooter() {
    //const footer = document.querySelector("footer");
    const footer = document.createElement('footer'); document.body.appendChild(footer);

    //footer.innerHTML = `<link rel="stylesheet" type="text/css" href="/src/components/footer.css">`

    const footerText = document.createElement("h1"); footer.appendChild(footerText);
    footerText.id = "footerText";
    footerText.innerHTML = "&copy; 2024 MEFAMEX , ALL RIGHT RESERVED";

    //set style to footer
    const style = document.createElement('style');
    style.innerHTML = `
body{
    width: 99.5vw !important;
    overflow-x: hidden !important;
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
    font-size: 2dvh;
}
`;
    footer.appendChild(style);

}


function CreateHeader() {
    //const header = document.querySelector("header"); 
    const header = document.createElement('header'); document.body.insertBefore(header, document.body.firstChild);

    header.id = "header"
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
    width: calc(0.5vw + 6px); /* width of the scrollbar */
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
    background-color: #2f2f2f79; /* dark gray track color */
    border-radius: 1px; /* rounded corners for the track */
    box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.527); /* subtle shadow effect */
}
::-webkit-scrollbar-button {
    display: none;
}
@keyframes entranceTop {
    from {
        opacity: 0;
        transform: translateY(-3rem);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
header {
    display: flex;
    flex-direction: row;
    position: relative;
    top: 0px;
    width: 100%;
    height: 5rem;
    background-color: #0e1013;
    justify-content: space-between;
    border-bottom: 0.1dvh solid white;
    margin-bottom: 1dvh;
}

#headerDivLeft {
    display: flex;
    position: fixed;
    left: 0px;
    height: 5rem; /*same as header height */
    width: fit-content;
    align-items: center;
    gap: 0.5vw;
    margin-left: 0.5vw;
    cursor: pointer;
    transition: all 500ms normal;
    -webkit-user-select: none;
    user-select: none;
    background-color: #0e101348;
    border-radius: 2rem;
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
    border: 0.1rem solid white;
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
    filter: drop-shadow(0 0 0.2rem white);
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
}
#navBarHideButton.unselected {
    content: url("../assets/icons/=.ico");
}
#navBarHideButton.selected {
    content: url("../assets/icons/x.ico");
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
    animation: entranceTop 0.7s  normal forwards;
}
/*#navBarHidden ~ .unseleceted{
    animation: entranceTop 0.7s  normal forwards !important;
}*/

@media screen and (max-width: 768px) {
    header {
        height: 3rem;
        position: sticky;
    }
    #headerDivLeft {
        position: relative;
        height: 3rem;
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
}
`;
    header.appendChild(style);

}

