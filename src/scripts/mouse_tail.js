const body = document.querySelector("body"); console.log(body);
 
 
const canvas = document.querySelector("canvas"); console.log(canvas);
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let tail = [];
let tailLength = 50;
let tailColor = '#000';
let tailSize = 2; // new variable to control the size of the tail segments

canvas.addEventListener('mousemove', (e) => {
    const x = e.clientX - canvas.offsetLeft; // clientX
    const y = e.clientY - canvas.offsetTop;  // clientY

    tail.push({ x, y });

    if (tail.length > tailLength) { tail.shift() }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < tail.length; i++) {
        const t = tail[i];
        ctx.beginPath();
        ctx.arc(t.x, t.y, tailSize, 0, 2 * Math.PI);
        ctx.fillStyle = tailColor;
        ctx.fill();

        if (i > 0) {
            const prevT = tail[i - 1];
            ctx.beginPath();
            ctx.moveTo(prevT.x, prevT.y);
            ctx.lineTo(t.x, t.y);
            ctx.strokeStyle = tailColor;
            ctx.lineWidth = tailSize * ((i + 4) ** 0.7);
            ctx.stroke();
        }
    }
});