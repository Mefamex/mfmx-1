
window.addEventListener('scroll', function () { document.documentElement.style.setProperty('--scroll', window.scrollY + 'px'); });


const sidebar = document.getElementById('sidebar');
const tooltip = document.getElementById('sidebar-tooltip');
const sidebarShowButton = document.getElementById('sidebarShowButton');

let lastToolTipSeen = new Date();
let lastToolTipSeenControlCount = 0;
let mouseOn;

function sideBarFunc(event) {
  lastToolTipSeen = new Date; tooltip.innerHTML = '';
  const parentTitle = event.target.getAttribute('href').split("#")[1];
  const sectionElement = document.querySelector("#table-body > #" + parentTitle);
  sectionElement.querySelectorAll('fieldset > legend').forEach((legend) => {
    let sideList2a = document.createElement("a"); sideList2a.className = "sidebar-tooltip-child"
    sideList2a.textContent = legend.children[0].textContent;
    sideList2a.href = "#" + legend.id;
    tooltip.appendChild(sideList2a)
  });
  const sectionRect = document.querySelector("#sidebarSection").getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  let top = event.target.getBoundingClientRect().top;
  if (top + tooltipRect.height > sectionRect.bottom) { top = sectionRect.bottom - tooltipRect.height; }
  tooltip.style.top = `${top}px`;
  tooltip.style.left = event.target.getBoundingClientRect().right + "px";
  tooltip.style.display = 'flex';
  checkToolTipDisplay(event);
};

function checkToolTipDisplay(event, kontrol = false) {
  if (new Date() - lastToolTipSeen > 1000 && !sidebar.contains(mouseOn.target) && !tooltip.contains(mouseOn.target)) {
    tooltip.style.display = 'none'; tooltip.innerHTML = ''; if (sidebarShowButton.classList.contains('active')) { sidebarShowButton.classList.remove('active'); };

    if (kontrol) { lastToolTipSeenControlCount -= 1; } return;
  }
  if (kontrol && lastToolTipSeenControlCount <= 1 || lastToolTipSeenControlCount < 1) {
    setTimeout(() => { checkToolTipDisplay(event, kontrol = true) }, 100);
    lastToolTipSeenControlCount = 1;
  }
}

document.getElementById('sidebarList').addEventListener('mouseover', (event) => { if (event.target.tagName.toLowerCase() === 'a') { sideBarFunc(event); } });
tooltip.addEventListener('mouseover', () => { lastToolTipSeen = new Date; });
window.addEventListener('mouseover', (event) => { mouseOn = event; })

sidebarShowButton.addEventListener('click', () => { if (sidebarShowButton.style.display != 'none') { sidebarShowButton.classList.toggle("active"); } });
/*
let jsonData = {};
const tableBody = document.getElementById('table-body');
fetch('/public/software/output.json')
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

