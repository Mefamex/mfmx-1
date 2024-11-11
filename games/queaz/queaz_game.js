table_body = document.querySelector("#table-body"); console.log("cathced: queaz_gmae.js : table_body", table_body);


class queaz {
    constructor(element, table_size = [6, 10]) {
        this.element = element
        this.table_size = table_size;
        this.actives = {};
        this.create_table();
    }

    check_actives() {

    }

    change_active(element = NaN) {
        let id = element.id;
        console.log(element);
        if (this.actives[element.sira]) {element.classList.remove("active");this.actives[element.sira]=false;}
        else{element.classList.add("active");this.actives[element.sira]=true;}
    }

    create_table() {
        this.element.style.gridTemplateColumns = Array(this.table_size[1]).fill("1fr").join(" ");
        this.element.addEventListener("click", (a) => { if ("BUTTON" == a.target.nodeName) { this.change_active(a.target) } });

        for (let y = 0; y < this.table_size[0] + 0; y++) {
            for (let x = 0; x < this.table_size[1]; x++) {
                let kutu = document.createElement("button");
                kutu.style.width = 40 / this.table_size[1] + "vw";
                kutu.style.height = kutu.style.width;
                kutu.classList.add("kutu"); kutu.textContent = "x"
                kutu.sira = this.table_size[1] * y + x; kutu.id = "kutu" + kutu.sira;
                this.actives[this.table_size[1] * y + x] = false;
                this.element.appendChild(kutu);
            }
        }
    }
}



const game = new queaz(table_body);