console.log("JavaScript dosyası: src/home.js :yükleniyor.");

var body = document.querySelector("body");console.log("cathced: home.js : body", body);
const canvasol = document.createElement("canvas");
body.appendChild(canvasol);
canvasol.width = window.innerWidth; canvasol.height = window.innerHeight;


function getRandomColor() { return '#' + Math.floor(Math.random() * 16777215).toString(16); }



class canvasSM {
    constructor(options = {}) {
        this.canvas = canvasol;
        this.ctx = this.canvas.getContext('2d');
    }

    draw_ollipse(){
        
    }
}



console.log("BAŞLATILDI: src/home");