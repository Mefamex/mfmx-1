let jsonData = {};
const tableBody = document.getElementById('table-body');

fetch('/public/pages/software/output.json')
  .then(response => response.json()).then(data => { jsonData = data; console.log("data fetched with keys:", Object.keys(jsonData).length); createTable(jsonData, tableBody); })
  .catch(error => console.error('Error:', error));

function createTable(jsonData, tableBody) {
  console.log("jsonData size of keys:", Object.keys(jsonData).length);
  console.log("The TableBody", tableBody);


  Object.keys(jsonData).forEach(c1 => {
    let div1 = document.createElement("div");
    div1.classList = "div1"; tableBody.appendChild(div1);
    let d1title = document.createElement("h3"); div1.appendChild(d1title);
    d1title.textContent = c1;
    let div11 = document.createElement("div");
    div11.classList = "div11"; div1.appendChild(div11);
    Object.keys(jsonData[c1]).forEach(c2 => {
      let div2 = document.createElement("ul");
      div2.classList = "div2"; div11.appendChild(div2);
      let d2title = document.createElement("h6"); div2.appendChild(d2title);
      d2title.textContent = c2;
      jsonData[c1][c2].forEach(c3 => {
        let div3 = document.createElement("li");
        div3.classList = "div3"; div2.appendChild(div3);
        div3.textContent = "+ " + c3;
      }); // c3
    }); // c2
  }); // c1
}

