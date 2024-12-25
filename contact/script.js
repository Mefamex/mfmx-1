document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                iframe.src = iframe.dataset.src;
                observer.unobserve(iframe);
            }
        });
    });
    const iframe = document.getElementById("ContactForm");
    observer.observe(iframe);
});
/*function resizeIframe(ifframe) {
    ifframe.style.height = ifframe.contentWindow.document.body.scrollHeight + "px";
}
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const iframe = document.getElementById("ContactForm");
        iframe.src = iframe.getAttribute("data-src");
        resizeIframe(iframe);
    }, 1000);
});*/