console.log("JavaScript dosyası: src/circleMouse.js : yükleniyor.");
var body = document.querySelector("body"); console.log("cathced: circleMouse.js : body", body);

const canvaCircle = document.querySelector("#canvabalon"); console.log("cathced :CircleMouse.js : canvaCircle:", body);
canvaCircle.width = window.innerWidth; canvaCircle.height = window.innerHeight;

function getRandomColor() { return '#' + Math.floor(Math.random() * 16777215).toString(16); }



class canvasTail {
    constructor(element = null, options = {}) {
        this.canvas = canvaCircle;
        this.ctx = this.canvas.getContext('2d');
        this.tail = [];
        this.tailLength = 20;
        this.tailColor = '#000';
        this.tailSize = 2; // new variable to control the size of the this.tail segments
        this.targetElement = element; // Added element property
    }
    action() {
        const targetX = this.targetElement.offsetLeft + this.targetElement.offsetWidth / 2;
        const targetY = this.targetElement.offsetTop + this.targetElement.offsetHeight / 2;
        this.tail.push({ x: targetX, y: targetY });

        if (this.tail.length > this.tailLength) { this.tail.shift(); }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.tail.length; i++) {
            const t = this.tail[i];
            this.ctx.beginPath();
            this.ctx.arc(t.x, t.y, this.tailSize, 0, 2 * Math.PI);
            this.ctx.fillStyle = this.tailColor;
            this.ctx.fill();
            if (i > 0) {
                const prevT = this.tail[i - 1];
                this.ctx.beginPath();
                this.ctx.moveTo(prevT.x, prevT.y);
                this.ctx.lineTo(t.x, t.y);
                this.ctx.strokeStyle = this.tailColor;
                this.ctx.lineWidth = this.tailSize;
                this.ctx.stroke();
            }
        }
    }
}

class TrackingCircleWithSpeed {
    constructor(element, parentt = null, rand_color = "5000", rand_size = "100", rand_size_range = [5, 40, "px"], options = {}) {
        /* 
        rand_color: 0 => "default is blue"
        rand_color: "0" => "color is random but not changing with milisecond " 
        rand_color: "[>0]" => "color is random and change every [>0] milisecond exp: "1" or "5" 

        rand_size: 0 or null => default size is 25px
        rand_size: "0"  => "size is random but not changing with time"
        rand_size:  "[>0]" => "size is random and change every [>0] milisecond exp: "1" or "5" 

        rand_size_range : [ [min size]: int||float ,  [max size] int||float ,   [type] "px" "rem" "vw" ]
        */
        parentt = parentt ? parentt : document.querySelector("body");
        console.log("Tracking element added ", parentt ? parentt : "")

        // Create element if not provided
        this.element = element || document.createElement('div');

        // Set default styles
        this.element.style.width = rand_size ? Math.random() * (rand_size_range[1] - rand_size_range[0]) + rand_size_range[0] + rand_size_range[2] : "25px";
        this.element.style.height = this.element.style.width;
        this.element.style.borderRadius = '50%';
        this.element.style.backgroundColor = rand_color ? getRandomColor() : 'blue';
        this.element.style.position = 'absolute';
        this.element.style.top = window.innerHeight / 2 + "px";
        this.element.style.left = window.innerWidth / 2 + "px";
        this.element.style.zIndex = "-100";
        this.element.style.opacity= "20%";

        // Append to parent if provided
        if (parentt) { parentt.appendChild(this.element); }
        else { document.querySelector("body").appendChild(this.element) }

        this.targetX = window.innerWidth / 2;
        this.targetY = window.innerHeight / 2;
        this.centerX = this.element.offsetWidth / 2; // Center coordinates of the circle
        this.centerY = this.element.offsetHeight / 2;
        this.speed = 5; this.angle = 6.5;
        this.minSpeed = Math.random() * 10 + 5; this.maxSpeed = 40; this.minminspeed = this.minSpeed + 0;
        this.targetIsSameCord = [0, 0, 0]; // x y and duraction
        this.diagonalPixels = Math.sqrt(window.innerHeight ** 2 + window.innerWidth ** 2);
        this.then = Date.now(); this.interval = 1000 / 60;
        this.rand_color = rand_color;
        this.rand_size = rand_size; this.rand_size_go = [25, -1, 1]; // now , target , step || automation
        this.rand_size_range = rand_size_range;
        document.addEventListener('mousemove', (event) => {
            this.targetX = event.clientX;
            this.targetY = event.clientY;
        });
        this.animate = this.animate.bind(this); // !!! bind comes before animate() 
        setTimeout(this.animate, 1000);
        if (parseFloat(this.rand_color) > 0) { setInterval(() => { this.element.style.backgroundColor = getRandomColor(); }, parseFloat(this.rand_color)); }

    //  this.canvaCircle = new canvasTail(element = this.element);
    }

    random_element_size() {
        if (this.rand_size_go[1] == 0) {
            this.rand_size_go[1] = Math.random() * (this.rand_size_range[1] - this.rand_size_range[0]) + this.rand_size_range[0];
            this.rand_size_go[2] = (this.rand_size_go[1] - this.rand_size_go[0]) / (parseFloat(this.rand_color) / 30);
        }
        this.rand_size_go[0] += this.rand_size_go[2];
        this.element.style.width = this.rand_size_go[0] + this.rand_size_range[2];
        this.element.style.height = this.element.style.width;
        if (this.rand_size_go[2] > 0 && this.rand_size_go[0] > this.rand_size_go[1] || this.rand_size_go[2] < 0 && this.rand_size_go[0] < this.rand_size_go[1]) { this.rand_size_go[1] = 0; }
        if (this.rand_size_go[0] > this.rand_size_range[1]) { this.rand_size_go[0] = this.rand_size_range[1] }
        else if (this.rand_size_go[0] < this.rand_size_range[0]) { this.rand_size_go[0] = this.rand_size_range[0] }
    }

    animate() {
        if ((Date.now() - this.then) > this.interval) {
            this.then = Date.now() - ((Date.now() - this.then) % this.interval);

            // random element size animation
            if (parseFloat(this.rand_size) > 0) { this.random_element_size(); }


            // speed decrease if target is dead
            if (this.targetX == this.targetIsSameCord[0] && this.targetY == this.targetIsSameCord[1]) { this.targetIsSameCord[2] = Math.min(this.targetIsSameCord[2] + 1, 500); }
            else {
                this.targetIsSameCord[0] = this.targetX;
                this.targetIsSameCord[1] = this.targetY;
                this.targetIsSameCord[2] = 0;
            }
            this.minSpeed = this.minminspeed * (1 - this.targetIsSameCord[2] / 500)


            // Calculate distance to target
            const dx = this.targetX - (this.element.offsetLeft + this.centerX);
            const dy = this.targetY - (this.element.offsetTop + this.centerY);
            const distanceRatio = Math.sqrt(dx * dx + dy * dy) / this.diagonalPixels;

            // Update speed based on distance (consider a minimum speed)
            this.speed = this.maxSpeed * distanceRatio + this.minSpeed; // speed is between minSpeed and maxSpeed


            // Calculate desired angle towards target
            let desiredAngle = Math.atan2(dy, dx);
            let fark = (desiredAngle - this.angle)
            if (fark > Math.PI) { fark = fark - 2 * Math.PI; }
            else if (fark < -Math.PI) { fark = 2 * Math.PI + fark; }
            // Smoothly adjust angle towards desired angle
            this.angle += fark * ( (Math.random() * 0.10 )+0.05);

            // angle fit between PI
            if (this.angle < -Math.PI) { this.angle = Math.PI; }
            else if (this.angle > Math.PI) { this.angle = -Math.PI; }



            // Calculate movement based on speed and angle
            const dxMove = this.speed * Math.cos(this.angle);
            const dyMove = this.speed * Math.sin(this.angle);

            //  console.log(this.angle, desiredAngle, fark);
            // Update circle position
            this.element.style.left = Math.max(0, Math.min(window.innerWidth - this.element.offsetWidth, this.element.offsetLeft + dxMove)) + 'px';
            this.element.style.top = Math.max(0, Math.min(window.innerHeight - this.element.offsetHeight, this.element.offsetTop + dyMove)) + 'px';
      //          this.canvaCircle.action(this.element.offsetLeft + parseInt(this.element.style.left), this.element.offsetTop + parseInt(this.element.style.top));

        }
        requestAnimationFrame(this.animate);
    }
}


new TrackingCircleWithSpeed();
new TrackingCircleWithSpeed();
new TrackingCircleWithSpeed();
new TrackingCircleWithSpeed();
new TrackingCircleWithSpeed();
new TrackingCircleWithSpeed();
new TrackingCircleWithSpeed();
new TrackingCircleWithSpeed();
new TrackingCircleWithSpeed();
new TrackingCircleWithSpeed();
new TrackingCircleWithSpeed();
new TrackingCircleWithSpeed();




console.log("BAŞLATILDI: src/circleMouse.js");