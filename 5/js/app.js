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
    class Card {
        options={
            CARD_SIZE: 100
        };
        constructor(container, cardNumber, flip) {
            this.container = container;
            this.flip = flip;
            this.createElement(cardNumber);
        }
        createElement(cardNumber) {
            this.card = document.createElement("div");
            this.card.addEventListener("click", (() => {
                this.flip(this);
            }));
            this.card.classList.add("card");
            this.open = "0";
            this.cardNumber = cardNumber;
            this.card.style.width = `${this.options.CARD_SIZE}px`;
            this.card.style.height = `${this.options.CARD_SIZE}px`;
            this.card.style.fontSize = `${this.options.CARD_SIZE / 2}px`;
            this.container.append(this.card);
        }
        set cardNumber(value) {
            const cardNumbersArray = [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ];
            this.card.innerText = cardNumbersArray[value] + "";
        }
        get cardNumber() {
            return this.card.innerText;
        }
        set open(value) {
            this.card.dataset.open = value;
            if (!!parseInt(value)) this.card.classList.add("open"); else this.card.classList.remove("open");
        }
        get open() {
            return parseInt(this.card.dataset.open);
        }
        set success(value) {
            if (value) this.card.classList.add("success");
        }
        get success() {
            return this.card.classList.contains("success");
        }
    }
    class AmazingCard extends Card {
        constructor(container, cardNumber, flip) {
            super(container, cardNumber, flip);
        }
        set cardNumber(value) {
            const cardsImgArray = [ "https://via.placeholder.com/100x100?text=0", "https://via.placeholder.com/100x100?text=1", "https://via.placeholder.com/100x100?text=2", "https://via.placeholder.com/100x100?text=3", "https://via.placeholder.com/100x100?text=4", "https://via.placeholder.com/100x100?text=5", "https://via.placeholder.com/100x100?text=6", "https://via.placeholder.com/100x100?text=7", "https://via.placeholder.com/100x100?text=8" ];
            const img = document.createElement("img");
            img.onerror = () => {
                img.src = "https://via.placeholder.com/100x100?text=Error";
            };
            img.src = cardsImgArray[value];
            this.card.append(img);
        }
        get cardNumber() {
            return this.card.innerHTML;
        }
    }
    function generateArrayNumToCards(n) {
        return Array.from({
            length: n
        }, ((_, i) => i));
    }
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [ array[j], array[i] ];
        }
        return array;
    }
    const NUMBERS = 16;
    const arr = shuffleArray(generateArrayNumToCards(NUMBERS));
    let cardChoose = null;
    for (let cardNumber = 0; cardNumber < NUMBERS; cardNumber++) new AmazingCard(document.getElementById("game"), arr[cardNumber], (function(card) {
        if (cardChoose === null) {
            card.open = 1;
            cardChoose = card;
        } else if (card.open === 1) {
            card.open = 0;
            cardChoose = null;
        } else {
            card.open = 1;
            const tempCardChoose = cardChoose;
            if (cardChoose.cardNumber === card.cardNumber) {
                cardChoose.success = true;
                card.success = true;
            } else setTimeout((function() {
                card.open = 0;
                tempCardChoose.open = 0;
            }), 500);
            cardChoose = null;
        }
    }));
    window["FLS"] = true;
    isWebp();
})();