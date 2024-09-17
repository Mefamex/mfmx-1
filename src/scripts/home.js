

document.querySelectorAll('#divSol a').forEach((element, index) => {
    element.style.animationDelay = (4 + index * 0.3) + "s"; // adjust the delay value as needed
});

document.querySelectorAll('main #divCardContainer .card').forEach((element, index) => {
    element.style.animationDelay = (2 + index * 0.3) + "s"; // adjust the delay value as needed
});

