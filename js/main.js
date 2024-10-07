const overlay = document.getElementsByClassName("overlay")[0];
window.addEventListener("scroll", () => {
    //window.scrollY does not work in Firefox
    if (window.pageYOffset > 0) {
        overlay.classList.remove("unhidden");
        overlay.classList.add("hidden");
    }
    if (document.scrollingElement.scrollTop === 0) {
        overlay.classList.remove("hidden");
        overlay.classList.add("unhidden");
    }
});