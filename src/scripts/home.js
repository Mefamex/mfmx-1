setTimeout(function (e) { go(); }, 1000);

var body = document.querySelector("body"); console.log("cathced: home.js : body", body);
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
//divSol.width = "13vw"; divSol.height = window.innerHeight+0;
const canva = document.querySelector("#canvaSM"); console.log(canva);
canva.width = window.innerWidth * 0.13; canva.height = window.innerHeight+0;



class LEFT_ELLIPSE {
    constructor(canvas) {
        this.canvas = canvas;
        this.ellipseCenterX = 0;
        this.ctx = this.canvas.getContext("2d");
        this.numButtons = 10; this.startAngles = [];
        this.buttons = [];
        this.buttonWidth = (window.innerHeight * 0.02 + window.innerWidth * 0.02);
        this.buttonHeight = this.buttonWidth + 0;

        this.isAnimating = true; this.movementSpeed = 0.008;
        this.then = 0; this.interval = 1000 / 30;
        this.frame = 0;
    }

    start() {
        this.create_buttons();
        this.size_changed();
        setTimeout(() => { this.animate(); }, 1000);
    }

    size_changed() {
        this.buttonWidth = (window.innerHeight * 0.02 + window.innerWidth * 0.02);
        this.buttonHeight = this.buttonWidth + 0;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ellipseCenterY = window.innerHeight * 0.5;
        this.ellipseRadiusX = window.innerWidth * 0.1;
        this.ellipseRadiusY = window.innerHeight * 0.45;
        this.draw_ellipse();
        this.reOrganizeButtons();
    }

    draw_ellipse() {
        this.ctx.lineWidth = this.buttonWidth * 1.2;
        this.ctx.strokeStyle = '#29399283';
        this.ctx.beginPath();
        this.ctx.ellipse(this.ellipseCenterX, this.ellipseCenterY, this.ellipseRadiusX, this.ellipseRadiusY, 0, -Math.PI / 2, Math.PI * 3 / 2);
        this.ctx.stroke();
    }

    create_buttons() {
        for (let i = 0; i < this.numButtons; i++) {
            const button = document.createElement("img");
            button.classList.add("buttonsLeft");
            button.src = icons_path[i];
            button.href = links[i]; button.target = "_blank";
            button.addEventListener('click', function () { window.location.href = links[i]; });
            // Add event listeners for mouseenter and mouseleave
            button.addEventListener('mouseenter', () => { this.isAnimating = false; });
            button.addEventListener('mouseleave', () => { this.isAnimating = true; });
            this.canvas.parentElement.appendChild(button);
            this.buttons.push(button);
        }
    }


    reOrganizeButtons() {
        for (let i = 0; i < this.numButtons; i++) {
            let button = this.buttons[i];
            const angle = -Math.PI + i * (2* Math.PI) / this.numButtons; // yarim -Math.PI/2 + i * ( Math.PI) / this.numButtons;
            const buttonX = this.ellipseCenterX + this.ellipseRadiusX * Math.cos(angle) - this.buttonWidth / 2 + this.canvas.offsetLeft;
            const buttonY = this.ellipseCenterY + this.ellipseRadiusY * Math.sin(angle) - this.buttonHeight / 2 + this.canvas.offsetTop;
            this.startAngles.push(angle+0);

            button.style.width = this.buttonWidth + "px";
            button.style.height = this.buttonHeight + "px";
            button.style.left = buttonX + "px";
            button.style.top = buttonY + "px";
        }
        this.then = Date.now() + 500;
    }

    animate() {
        if (Date.now() - this.then > this.interval) {
            if (!this.isAnimating && this.movementSpeed > 0) { this.movementSpeed *= 0.9; }
            else if (this.movementSpeed < 0.008) { this.movementSpeed += 0.0001; }
            this.then = Date.now() - ((Date.now() - this.then) % this.interval);

            this.buttons.forEach((button, index) => {
                this.startAngles[index] += this.movementSpeed;

                let newX = this.ellipseCenterX + this.ellipseRadiusX * Math.cos(this.startAngles[index]) - this.buttonWidth / 2 + this.canvas.offsetLeft;
                let newY = this.ellipseCenterY + this.ellipseRadiusY * Math.sin(this.startAngles[index]) - this.buttonHeight / 2 + this.canvas.offsetTop;
                if (newX < this.ellipseCenterX - this.buttonWidth) {
                    this.startAngles[index] += this.movementSpeed*2;
                    newX = this.ellipseCenterX + this.ellipseRadiusX * Math.cos(this.startAngles[index]) - this.buttonWidth / 2 + this.canvas.offsetLeft;
                    newY = this.ellipseCenterY + this.ellipseRadiusY * Math.sin(this.startAngles[index]) - this.buttonHeight / 2 + this.canvas.offsetTop;
                }
                button.style.left = newX + "px";
                button.style.top = newY + "px";

                if (this.startAngles[index] > 2 * Math.PI) { this.startAngles[index] -= 2 * Math.PI;}
            });
        } requestAnimationFrame(() => this.animate());
    }
}

const left_ellipse = new LEFT_ELLIPSE(canva);
function go() {
    divSag.appendChild(hakkimdaSagBas);
    divSag.appendChild(hakkimdaPrgf); setTimeout(function (e) { hakkimda_al(); }, 1000);
    divSag.appendChild(mailSagBas);
    body.appendChild(divSag);
    left_ellipse.start();

    setTimeout(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) { if (entry.target === body) { resized(entries); } }
        }); resizeObserver.observe(body);
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
    mfmx_symbol.style.height = (window.innerHeight - h1mfmx.offsetHeight) + "px";
    left_ellipse.size_changed();
}



