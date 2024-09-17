/*
document.querySelectorAll('#divSol a').forEach((element, index) => {
    element.style.animationDelay = (4 + index * 0.3) + "s"; // adjust the delay value as needed
});

document.querySelectorAll('main #divCardContainer .card').forEach((element, index) => {
    element.style.animationDelay = (2 + index * 0.3) + "s"; // adjust the delay value as needed
});
*/
const leftButtons=document.querySelectorAll('main #divSol a');
let leftButtonsTop=[];
const leftButtonsCount = leftButtons.length;
let leftButtonsActive = true;
function slideDownAnimation() {
    leftButtons.forEach( (element, index)=>{
        element.style.position= "fixed";
        leftButtonsTop.push( index/leftButtonsCount * 100);
        element.style.top = leftButtonsTop[index]+"vh";
        //if mouse is on the element : leftButtonActive=true ... with element add listener mosue 
        element.addEventListener('mouseover', ()=>{leftButtonsActive = false;});
        element.addEventListener('mouseout', ()=>{leftButtonsActive = true;});
    })
    slideDownAnimationNext();
}
function slideDownAnimationNext(){
    if(leftButtonsActive){
    leftButtons.forEach( (element, index)=>{
        leftButtonsTop[index]+=0.5;
        
        if(leftButtonsTop[index]>100){
            leftButtonsTop[index]=-10;
        }
        if(leftButtonsTop[index]<0){
            element.style.left = leftButtonsTop[index]+"vw"
        }else{element.style.left = 0;}
        
        element.style.top = leftButtonsTop[index]+"vh";
        
    });
    }
    setTimeout(slideDownAnimationNext,50);
}
setTimeout(slideDownAnimation, 500);

