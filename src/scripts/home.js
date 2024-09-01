setTimeout(function (e) { go(); }, 1000);

var main = document.querySelector("main"); console.log("cathced: home.js : main", main);
const h1mfmx = document.querySelector("#h1mfmx");
const mfmx_symbol = document.querySelector("#mfmx_symbol");
var divSag = document.createElement("div"); divSag.id = "divSag"
var hakkimdaSagBas = document.createElement("h2"); hakkimdaSagBas.id = "hakkimdaSagBas"; hakkimdaSagBas.textContent = "HAKKIMDA";
var mailSagBas = document.createElement("h3"); mailSagBas.id = "mailSagBas"; mailSagBas.textContent = "support@mefamex.com";
var hakkimdaPrgf = document.createElement("p"); hakkimdaPrgf.id = "hakkimdaPrgf"; hakkimdaPrgf.textContent = "loading..."
const icons_path = [
    "/src/assets/icons/cloudflare.png",
    "/src/assets/icons/facebook_icon.png",
    "/src/assets/icons/github_icon.png",
    "/src/assets/icons/instagram_icon.png",
    "/src/assets/icons/linkedin_icon.png",
    "/src/assets/icons/x_twitter_icon.png",
    "/src/assets/icons/youtube_icon.png",
    "/src/assets/icons/cloudflare.png",
    "/src/assets/icons/cloudflare.png",
    "/src/assets/icons/cloudflare.png",
]
const links = [
    "https://mefamex.com",
    "https://www.facebook.com/mefamex58/",
    "https://github.com/Mefamex",
    "https://www.instagram.com/mefamex",
    "https://www.linkedin.com/in/mefamex/",
    "https://x.com/Mefamex",
    "https://www.youtube.com/@mefamex",
    "https://mefamex.com",
    "https://mefamex.com",
    "https://mefamex.com",
]

const divSol = document.querySelector("#divSol");


class LEFT_BUTTONS {
    constructor(element) {
        this.element = element;
        this.ellipseCenterX = 0;
        this.numButtons = 10;
        this.startAngle = -Math.PI * 0.5; this.endAngle = Math.PI * 0.6; this.stepAngle = -Math.PI / 2 + (Math.PI / (this.numButtons-1));

        this.buttons = new Array(); this.button_animating = new Array();
        this.buttonWidth = (this.element.clientHeight * 0.3 + this.element.clientWidth * 0.3);
        this.buttonHeight = this.buttonWidth + 0;

        this.isAnimating = true; this.movementSpeed = 0.008;
        this.then = 0; this.interval = 1000 / 30;
        this.frame = 0;
        this.card=NaN;
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
    }

    create_buttons() {
        for (let i = 0; i < this.numButtons; i++) {
            const button = document.createElement("img");
            button.classList.add("buttonsLeft");
            button.src = icons_path[i];
            button.href = links[i]; button.target = "_blank";
            button.addEventListener('click', function () { window.location.href = links[i]; });

            button.addEventListener('mouseenter', () => { this.isAnimating = false; this.showCard(button) });
            button.addEventListener('mouseleave', () => { this.isAnimating = true; this.unshowCard(button)});
            this.element.appendChild(button);
            button.angle = this.startAngle + 0; button.sira = i;
            this.buttons.push(button);

        }
        this.button_animating.push(this.buttons[0]);
    }

    showCard(sm){
        let card=document.createElement("div");
        card.id="cardLink";
        card.sm=sm;
        card.textContent=sm.href+"";
        this.card=card;
        this.updateCard();
        this.element.appendChild(this.card);
    }
    updateCard(){
        let sm=this.card.sm;
        this.card.style.left=parseFloat(sm.style.left) + sm.clientWidth*1.3 + "px";
        this.card.style.top= parseFloat(sm.style.top) + this.buttonHeight/2 -  this.card.clientHeight /2 + "px";
        console.log("updated");
        
    }
    unshowCard(){
        this.element.removeChild(this.card);
        this.card=NaN;
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
            if (!this.isAnimating && this.movementSpeed > 0) { this.movementSpeed *= 0.9;if(this.card){this.updateCard();}  }
            else if (this.movementSpeed < 0.008) { this.movementSpeed += 0.0001; }

            if (this.button_animating[0].angle > this.stepAngle && this.button_animating.length < this.numButtons) {
                this.button_animating.unshift((this.buttons[(this.button_animating[0].sira + 1) % this.numButtons]))
                this.button_animating[0].angle = this.startAngle + 0
                this.button_animating[0].display="flex";
            }

            this.button_animating.forEach((button, index) => {
                button.angle += this.movementSpeed;

                if (button.angle > this.endAngle) {
                    this.button_animating[index].angle = -Math.PI * 0.6;
                    this.button_animating[index].display="none";
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


const left_buttons = new LEFT_BUTTONS(divSol);
function go() {
    divSag.appendChild(hakkimdaSagBas);
    divSag.appendChild(hakkimdaPrgf); setTimeout(function (e) { hakkimda_al(); }, 1000);
    divSag.appendChild(mailSagBas);
    main.appendChild(divSag);
    left_buttons.start()

    setTimeout(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) { if (entry.target === main) { resized(entries); } }
        }); resizeObserver.observe(main);
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
    // left_ellipse.size_changed();
    left_buttons.size_changed();
}



