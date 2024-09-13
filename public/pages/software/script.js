
/*
let jsonData = {};
const tableBody = document.getElementById('table-body');
fetch('/public/pages/software/output.json')
  .then(response => response.json()).then(data => { jsonData = data; console.log("data fetched with keys:", Object.keys(jsonData).length); createTable(jsonData, tableBody); })
  .catch(error => console.error('Error:', error));

function createTable(jsonData, tableBody) {
  console.log("jsonData size of keys:", Object.keys(jsonData).length);
  console.log("The TableBody", tableBody);

  Object.keys(jsonData).forEach(c1 => {
    let sectionn = document.createElement("section");
    sectionn.id = c1.toLowerCase().replaceAll(" ", "-"); tableBody.appendChild(sectionn);
    let d1title = document.createElement("h1"); d1title.textContent=c1; sectionn.appendChild(d1title);


    Object.keys(jsonData[c1]).forEach(c2 => {
      let field = document.createElement("fieldset"); sectionn.appendChild(field);
      let legentt = document.createElement("legend"); field.appendChild(legentt);
      let legenttH2 = document.createElement("h2"); legentt.appendChild(legenttH2);
      legenttH2.textContent = c2;legentt.id = c2.toLowerCase().replaceAll(" ", "-");

      let ull = document.createElement("ul"); field.appendChild(ull);

      jsonData[c1][c2].forEach(c3 => {
        let div3 = document.createElement("li"); ull.appendChild(div3);
        let div3tit = document.createElement("h3"); div3tit.textContent = c3[0]; div3.appendChild(div3tit);
        let div3p = document.createElement("p"); div3p.textContent = c3[1]; div3.appendChild(div3p);
      }); // c3
    }); // c2
  }); // c1
}

*/


window.addEventListener('scroll', function () { document.documentElement.style.setProperty('--scroll', window.scrollY + 'px'); });
document.querySelector("main").style.marginLeft = document.querySelector("#sidebar").offsetWidth;
