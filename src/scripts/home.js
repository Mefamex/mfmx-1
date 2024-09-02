setTimeout(function (e) { go(); }, 1000);

var main = document.querySelector("main");
const h1mfmx = document.querySelector("#h1mfmx");
const mfmx_symbol = document.querySelector("#mfmx_symbol");
var divSag = document.createElement("div"); divSag.id = "divSag";
var hakkimdaSagBas = document.createElement("h2"); hakkimdaSagBas.id = "hakkimdaSagBas"; hakkimdaSagBas.textContent = "HAKKIMDA";
var mailSagBas = document.createElement("h3"); mailSagBas.id = "mailSagBas"; mailSagBas.textContent = "support@mefamex.com";
var hakkimdaPrgf = document.createElement("p"); hakkimdaPrgf.id = "hakkimdaPrgf"; hakkimdaPrgf.textContent = "loading..."
const icons_path = [
    "/src/assets/icons/facebook_icon.png",
    "/src/assets/icons/github_icon.png",
    "/src/assets/icons/instagram_icon.png",
    "/src/assets/icons/linkedin_icon.png",
    "/src/assets/icons/x_twitter_icon.png",
    "/src/assets/icons/youtube_icon.png",
]
const links = [
    "https://www.facebook.com/mefamex58/",
    "https://github.com/Mefamex",
    "https://www.instagram.com/mefamex",
    "https://www.linkedin.com/in/mefamex/",
    "https://x.com/Mefamex",
    "https://www.youtube.com/@mefamex",
]

const divSol = document.querySelector("#divSol");
const divSolCard = document.createElement("div"); divSolCard.id = "cardLink";
divSolCard.addEventListener('click', () => { linked(divSolCard.href) }); divSolCard.href = "https://mefamex.com";
divSol.appendChild(divSolCard);

const divCardContainer = document.createElement("div"); divCardContainer.id = "divCardContainer";
const infoCards = [
    { title: "WEB SİTESİ HAKKINDA", content: " Bu internet sayfası,yazılım ve Mefamex hakkında bazı bilgileri <b>'/public'</b> bölümünde paylaşmak için açılmıştır." },
    { title: "Yazılım", content: "<a href='/public/pages/software_lang/index.html'>mefamex.com/yazilim </a>" },
    { title: "MEFAMEX KİMDİR?", content: "yakında..." },
    { title: "PROJELER", content: "Paylaşmak istediğim yazılım - kodlama - programa ile ilgili projeler. <br> yakında..." },
    { title: "CV", content: " " },
    { title: "BLOG", content: "yakında..." },
]

class CARD_CONTAINER {
    constructor(element, cards = []) {
        this.element = element;
        this.infoCards = cards;
    }

    createCards(cards) {
        if (cards){this.infoCards.add(cards);}
        this.infoCards.forEach((infoCard) => {
            let card = document.createElement("div"); card.classList.add("card");
            this.element.appendChild(card);
            let title = document.createElement("h5"); title.classList.add("cardTitle"); card.appendChild(title);
            title.textContent = infoCard.title + "";
            let prgf = document.createElement("p"); prgf.classList.add("cardPrgf"); card.appendChild(prgf);
            prgf.innerHTML = infoCard.content + "";

        })
    }



} const cardContainer = new CARD_CONTAINER(divCardContainer, infoCards);


function linked(href) {
    document.querySelector("body").innerHTML = "";
    let div = document.createElement("div");
    document.querySelector("body").appendChild(div);
    div.style.zIndex = 100; div.style.position = "absolute"; div.style.display = "grid";
    div.style.placeSelf = "center"; div.style.placeContent = "center";
    div.style.width = "100dvw"; div.style.height = "100dvh";
    div.style.backgroundColor = "black"; div.style.color = "white";
    div.style.textAlign = "center"; div.style.textWrap = "wrap";
    div.style.transition = "all 2s";
    let p = document.createElement("p");
    p.innerHTML = "Connecting to: <br>" + href + "<br><br>";
    let p1 = document.createElement("p");
    p1.textContent = "please wait 3 second...";
    p.style.maxWidth = "100vw";
    div.style.fontSize = "xx-large";
    div.appendChild(p); div.appendChild(p1);
    setTimeout(() => { window.location.href = href; }, 1500);
    setTimeout(() => { p1.textContent = 'please wait --> 2 <-- second...' }, 1000);
    setTimeout(() => { p1.textContent = 'please wait --> 1 <-- second...' }, 2000);
    setTimeout(() => { p1.textContent = 'please wait...' }, 3000);
    setTimeout(() => { p1.innerHTML = 'Your connection is slow <br> you can copy paste the link <br> or allow the permissions <br> yönlendirmeye izin veriniz...' }, 5000);
    console.log(href);


}



class LEFT_BUTTONS {
    constructor(element, card) {
        this.element = element;
        this.ellipseCenterX = 0;
        this.numButtons = 6;
        this.startAngle = -Math.PI * 0.5; this.endAngle = Math.PI * 0.6; this.stepAngle = -Math.PI / 2 + (Math.PI / (this.numButtons - 1));

        this.buttons = new Array(); this.button_animating = new Array();
        this.buttonWidth = (this.element.clientHeight * 0.3 + this.element.clientWidth * 0.3);
        this.buttonHeight = this.buttonWidth + 0;

        this.isAnimating = true; this.movementSpeed = 0.008;
        this.then = 0; this.interval = 1000 / 30;
        this.frame = 0;
        this.card = card; this.card.timer = 0;
    }

    start() {
        this.create_buttons();
        this.size_changed();
        setTimeout(() => { this.animate(); }, 1000);
    }

    size_changed() {
        this.buttonWidth = (main.clientHeight * 0.02 + main.clientWidth * 0.02);
        this.buttonHeight = this.buttonWidth + 0;
        this.ellipseCenterY = main.clientHeight * 0.5;
        this.ellipseRadiusX = main.clientWidth * 0.1;
        this.ellipseRadiusY = main.clientHeight * 0.45;
        this.reOrganizeButtons();
        this.reOrganizeCard();
    }

    create_buttons() {
        for (let i = 0; i < this.numButtons; i++) {
            const button = document.createElement("img");
            button.classList.add("buttonsLeft");
            button.src = icons_path[i];
            button.href = links[i]; button.target = "_blank";
            button.addEventListener('click', function () { linked(links[i]) });

            button.addEventListener('mouseenter', () => { this.isAnimating = false; this.showCard(button) });
            button.addEventListener('mouseleave', () => { this.isAnimating = true; this.card.timer = Date.now(); this.unshowCard() });
            this.element.appendChild(button);
            button.angle = this.startAngle + 0; button.sira = i;
            this.buttons.push(button);

        }
        this.button_animating.push(this.buttons[0]);
    }

    showCard(sm) {
        this.card.sm = sm;
        this.card.textContent = sm.href + "";
        this.card.href = sm.href + "";
        
        this.reOrganizeCard();
    }
    reOrganizeCard() {
        if (!this.card.sm) {
            let sm = this.button_animating[0];
            this.card.style.left = "5vw"
            this.card.style.top = "0";
            this.card.textContent = sm.href + "";
            this.card.href = sm.href + "";
        }
        else {
            this.card.style.left = parseFloat(this.card.sm.style.left) + this.card.sm.clientWidth * 1.3 + "px";
            this.card.style.top = parseFloat(this.card.sm.style.top) + this.buttonHeight / 2 - this.card.clientHeight / 2 + "px";
        }
    }
    unshowCard() {
        if (Date.now() - this.card.timer > 2000 && this.isAnimating) { this.card.sm = NaN }
        else { setTimeout(() => { this.unshowCard() }, 2000);}
    }

    reOrganizeButtons() {
        for (let i = 0; i < this.numButtons; i++) {
            let button = this.buttons[i];
            const angle = this.buttons[i].angle;
            const buttonX = this.ellipseCenterX + this.ellipseRadiusX * Math.cos(angle) - this.buttonWidth / 2 + this.element.offsetLeft;
            const buttonY = this.ellipseCenterY + this.ellipseRadiusY * Math.sin(angle) - this.buttonHeight / 2 + this.element.offsetTop;

            button.style.width = this.buttonWidth + "px";
            button.style.height = this.buttonHeight + "px";
            button.style.left = buttonX + "px";
            button.style.top = buttonY + "px";
        }
        this.then = Date.now() + 500;
    }

    animate() {

        if (Date.now() - this.then > this.interval) {
            this.then = Date.now() - ((Date.now() - this.then) % this.interval);
            if (!this.isAnimating && this.movementSpeed > 0) { this.movementSpeed *= 0.9; this.card.classList.add("hover"); }
            else if (this.movementSpeed < 0.008) { this.movementSpeed += 0.0001;  this.card.classList.remove("hover"); }
            this.reOrganizeCard();
            if (this.button_animating[0].angle > this.stepAngle && this.button_animating.length < this.numButtons) {
                this.button_animating.unshift((this.buttons[(this.button_animating[0].sira + 1) % this.numButtons]))
                this.button_animating[0].angle = this.startAngle + 0
                this.button_animating[0].display = "flex";
            }

            this.button_animating.forEach((button, index) => {
                button.angle += this.movementSpeed;

                if (button.angle > this.endAngle) {
                    this.button_animating[index].angle = -Math.PI * 0.6;
                    this.button_animating[index].display = "none";
                    this.button_animating.splice(index, 1);
                }
                let newX = this.ellipseCenterX + this.ellipseRadiusX * Math.cos(button.angle) - this.buttonWidth / 2 + this.element.offsetLeft;
                let newY = this.ellipseCenterY + this.ellipseRadiusY * Math.sin(button.angle) - this.buttonHeight / 2 + this.element.offsetTop;

                button.style.left = newX + "px";
                button.style.top = newY + "px";
            });



        } requestAnimationFrame(() => this.animate());
    }
}


const left_buttons = new LEFT_BUTTONS(divSol, divSolCard);
function go() {
    divSag.appendChild(hakkimdaSagBas);
    divSag.appendChild(hakkimdaPrgf); setTimeout(function (e) { hakkimda_al(); }, 1000);
    divSag.appendChild(mailSagBas);
    main.appendChild(divSag);
    left_buttons.start()
    main.appendChild(divCardContainer);
    cardContainer.createCards();
    resized();

    setTimeout(() => {


        const resizeObserver = new ResizeObserver(() => { resized(); });
        resizeObserver.observe(main);
    }, 2000)
}


function hakkimda_al() {
    let text = "checking humantiy activity..."; hakkimdaPrgf.textContent = text + "";
    fetch('/src/assets/texts/main_hakkimda.txt')
        .then(response => response.text()).then(data => { text = data; })
        .catch(error => { console.error('Hata oluştu:', error); text = 'Hata oluştu:' + error; });
    let index = 0; hakkimdaPrgf.textContent = text.slice(0, index);
    const write = () => {
        if (index < text.length && index < 500) {
            hakkimdaPrgf.textContent = text.slice(0, index + 1);
            index++; setTimeout(write, (1000 - index) / 40);
        }
        else { hakkimdaPrgf.textContent = text; }
    }; write();
}



function resized() {
    mfmx_symbol.style.height = (main.clientHeight - h1mfmx.offsetHeight) + "px";
    divCardContainer.style.height =( main.clientHeight - h1mfmx.clientHeight)*0.99 + "px";

    // left_ellipse.size_changed();
    left_buttons.size_changed();
}



