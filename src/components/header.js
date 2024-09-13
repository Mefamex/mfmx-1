CreateHeader();

function CreateHeader() {
    const header = document.querySelector("header");
    header.innerHTML = `<link rel="stylesheet" type="text/css" href="/src/components/header.css">`

    const headerDivLeftSpace = document.createElement("div"); header.appendChild(headerDivLeftSpace);
    headerDivLeftSpace.style.display = "flex"; //for divleft to center

    const divLeft = document.createElement("div"); header.appendChild(divLeft);
    divLeft.id = "headerDivLeft"
    divLeft.addEventListener('click', () => { window.location.href = "/" });
    divLeft.onmouseover = () => { divLeft.classList.add("headerDivLeftHover") }
    divLeft.onmouseout = function () { divLeft.classList.remove("headerDivLeftHover") };

    const divLeftIcon = document.createElement("img"); divLeft.appendChild(divLeftIcon);
    divLeftIcon.id = "headerDivLeftIcon"
    divLeftIcon.src = "/src/assets/images/mfmx_icon/mefamex_logo_bgb.png";
    divLeftIcon.alt = "mefamex_logo";

    const divLeftText = document.createElement("h1"); divLeft.appendChild(divLeftText);
    divLeftText.id = "headerDivLeftText";
    divLeftText.textContent = "MEFAMEX.com";


    const navBar = document.createElement("nav"); header.appendChild(navBar);
    navBar.id = "headerNavBar";

    const navBarList = [
        { text: "ANASAYFA", link: "https://mefamex.com/" },
        { text: "HAKKIMDA", link: "https://mefamex.com/public/pages/about/" },
        { text: "İLETİŞİM", link: "https://mefamex.com/public/pages/contact/" },
        { text: "YAZILIM", link: "https://mefamex.com/public/pages/software/" },
        { text: "PROJELER", link: "https://mefamex.com/public/pages/projects/" }
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
}

