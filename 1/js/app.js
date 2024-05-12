(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.addEventListener("DOMContentLoaded", (() => {
        const info = document.querySelector(".page__text");
        const buttonShowMore = document.querySelector(".page__button");
        document.addEventListener("click", (e => {
            if (e.target == buttonShowMore) info.classList.add("active"); else if (!info.contains(e.target)) info.classList.remove("active");
        }));
        const buttonUp = document.querySelector(".page__rise-up");
        buttonUp.addEventListener("click", (e => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }));
        window.addEventListener("scroll", (e => {
            const position = window.scrollY;
            if (position > 100) buttonUp.classList.add("button-up"); else buttonUp.classList.remove("button-up");
        }));
    }));
    window["FLS"] = true;
    isWebp();
})();