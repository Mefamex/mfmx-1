console.log("/src/components/header.js");
CreateHeader();


function CreateHeader() {
    const header = document.querySelector("header");
    console.log("catched header:", header);

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
    divLeftText.textContent = "MEFAMEX";




    const navBar = document.createElement("nav"); header.appendChild(navBar);
    navBar.id = "headerNavBar";

    const navBarHome = document.createElement("a"); navBar.appendChild(navBarHome);
    navBarHome.id = "navBarHome";
    navBarHome.textContent = "ANASAYFA"
    navBarHome.href = "https://mefamex.com"


    const navBarContact = document.createElement("a"); navBar.appendChild(navBarContact);
    navBarContact.id = "navBarContact";
    navBarContact.textContent = "İLETİŞİM";
    navBarContact.href = "/public/pages/contact"

    const navBarAbout = document.createElement("a"); navBar.appendChild(navBarAbout);
    navBarAbout.id = "navBarAbout";
    navBarAbout.textContent = "HAKKIMDA";
    navBarAbout.href = "/public/pages/about"

    const navBarSL = document.createElement("a"); navBar.appendChild(navBarSL);
    navBarSL.id = "navBarSL";
    navBarSL.textContent = "YAZILIM";
    navBarSL.href = "/public/pages/software"

    const navBarProj = document.createElement("a"); navBar.appendChild(navBarProj);
    navBarProj.id = "navBarProj";
    navBarProj.textContent = "PROJELER";
    navBarProj.href = "/public/pages/projects"
    devServer: {
        historyApiFallback: true
      }
}
devServer: {
    historyApiFallback: true
  }

