document.querySelectorAll('#divSol a').forEach((element, index) => {
    element.style.animationDelay = (4 + index * 0.3) + "s"; // adjust the delay value as needed
});

document.querySelectorAll('main #divCardContainer .card').forEach((element, index) => {
    element.style.animationDelay = (2 + index * 0.3) + "s"; // adjust the delay value as needed
});



// slide down animation for left buttons
const cardLink = document.querySelector('#cardLink'); let cardLink_target_time = new Date().getTime(); cardLink.style.top = window.innerHeight - cardLink.offsetHeight + "px";
let cardLink_target = NaN; let cardLink_secret_target = document.querySelector('main #divSol a'); let mouseOnCardLink = false;
const leftButtons = document.querySelectorAll('main #divSol a');
let leftButtonsTop = []; const leftButtonsCount = leftButtons.length; let leftButtonsActive = true;
function slideDownAnimation() {
    leftButtons.forEach((element, index) => {
        element.style.position = "fixed";
        leftButtonsTop.push(index / leftButtonsCount * 100);
        element.style.top = leftButtonsTop[index] + "vh";
        element.addEventListener('mouseover', () => { leftButtonsActive = false; cardLink_target = element; cardLink_secret_target = element; cardLink_target_time = new Date().getTime(); });
        element.addEventListener('mouseout', () => { leftButtonsActive = true; cardLink_target = NaN; });
        cardLink.addEventListener('mouseover', () => { leftButtonsActive = false; mouseOnCardLink = true; });
        cardLink.addEventListener('mouseout', () => { leftButtonsActive = true; mouseOnCardLink = false; });
    })
    slideDownAnimationNext();
}
function slideDownAnimationNext() {
    if (leftButtonsActive) {
        leftButtons.forEach((element, index) => {
            leftButtonsTop[index] += 0.25;
            element.style.top = leftButtonsTop[index] + "vh";
            if (leftButtonsTop[index] > 90) {
                leftButtonsTop[index] = -10; cardLink_secret_target = leftButtons[index - 1 < 0 ? leftButtonsCount - 1 : index - 1];
            }
            if (leftButtonsTop[index] < 0) { element.style.left = leftButtonsTop[index] + "vw"; element.style.opacity = 0; }
            else { element.style.left = 0; element.style.opacity = 1; }
        });
    }
    setTimeout(slideDownAnimationNext, 50);
    if (window.innerWidth > 750) { cardLink_Organize(); cardLink.style.display = "flex" } else { cardLink.style.display = "none" }
}
function cardLink_Organize() {
console.log(cardLink_target);

    if (cardLink_target) {
        cardLink.style.left = cardLink_target.getBoundingClientRect().right + "px";
        cardLink.style.top = cardLink_target.getBoundingClientRect().top + cardLink_target.offsetHeight / 2 - cardLink.offsetHeight / 2 + "px";
        cardLink.classList.add("active");
        cardLink.href = cardLink_target.href; cardLink.textContent = "www."+ cardLink_target.href.slice(8);
        cardLink_target_time = new Date().getTime();
    }
    else if (mouseOnCardLink) {
        cardLink.classList.add("active");
        cardLink_target_time = new Date().getTime();
    }
    else if (new Date().getTime() - cardLink_target_time < 1500) {
        cardLink.classList.remove("active");
    }
    else if (new Date().getTime() - cardLink_target_time > 1500) {
        cardLink.classList.remove("active");
        cardLink.style.top = window.innerHeight - cardLink.offsetHeight + "px";
        if (cardLink_secret_target) {
            cardLink.href = cardLink_secret_target.href; cardLink.textContent = "www."+ cardLink_secret_target.href.slice(8);
        }
    }
}
setTimeout(slideDownAnimation, 5000);

