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
    document.addEventListener("DOMContentLoaded", (function() {
        function loadResource(url) {
            return fetch(url).then((res => res.json()));
        }
        function createListItem(text) {
            const listItem = document.createElement("li");
            listItem.classList.add("film__item");
            listItem.textContent = text;
            return listItem;
        }
        function createPlanetsBlock(planets) {
            const planetsBlock = document.createElement("div");
            planetsBlock.classList.add("film__planets");
            const planetsTitle = document.createElement("h2");
            planetsTitle.classList.add("film__planet");
            planetsTitle.textContent = "Planets";
            const planetsList = document.createElement("ul");
            planetsList.classList.add("film__items");
            planets.forEach((planet => {
                const listItem = createListItem(planet);
                planetsList.appendChild(listItem);
            }));
            planetsBlock.appendChild(planetsTitle);
            planetsBlock.appendChild(planetsList);
            return planetsBlock;
        }
        function createSpeciesBlock(species) {
            const speciesBlock = document.createElement("div");
            speciesBlock.classList.add("film__species");
            const speciesTitle = document.createElement("h2");
            speciesTitle.classList.add("film__species");
            speciesTitle.textContent = "Species";
            const speciesList = document.createElement("ul");
            speciesList.classList.add("film__items");
            species.forEach((specie => {
                const listItem = createListItem(specie);
                speciesList.appendChild(listItem);
            }));
            speciesBlock.appendChild(speciesTitle);
            speciesBlock.appendChild(speciesList);
            return speciesBlock;
        }
        function createFilmBlock(title, number, textAbout, planets, species) {
            const filmContainer = document.createElement("div");
            filmContainer.classList.add("film__container");
            const filmBlock = document.createElement("div");
            filmBlock.classList.add("film__block");
            const filmHeader = document.createElement("div");
            filmHeader.classList.add("film__header");
            const filmTitle = document.createElement("h2");
            filmTitle.classList.add("film__title");
            filmTitle.textContent = title;
            const filmNumber = document.createElement("div");
            filmNumber.classList.add("film__number");
            filmNumber.textContent = number;
            filmHeader.appendChild(filmTitle);
            filmHeader.appendChild(filmNumber);
            const filmTextAbout = document.createElement("div");
            filmTextAbout.classList.add("film__text-about");
            filmTextAbout.textContent = textAbout;
            const planetsBlock = createPlanetsBlock(planets);
            const speciesBlock = createSpeciesBlock(species);
            filmBlock.appendChild(filmHeader);
            filmBlock.appendChild(filmTextAbout);
            filmBlock.appendChild(planetsBlock);
            filmBlock.appendChild(speciesBlock);
            filmContainer.appendChild(filmBlock);
            return filmContainer;
        }
        loadResource("https://swapi.dev/api/films").then((data => {
            if (document.querySelector(".starwars__films")) {
                const filmsConteiner = document.querySelector(".starwars__films");
                let counter = 1;
                data.results.forEach((item => {
                    const episodeCounter = counter++;
                    const newEpisode = document.createElement("div");
                    newEpisode.classList.add("starwars__film");
                    const linkEpisode = document.createElement("a");
                    linkEpisode.classList.add("starwars__link");
                    linkEpisode.href = `film-${episodeCounter}.html`;
                    const episodeNumber = document.createElement("p");
                    episodeNumber.classList.add("starwars__film-number");
                    episodeNumber.textContent = episodeCounter;
                    const episodeTitle = document.createElement("div");
                    episodeTitle.classList.add("starwars__title");
                    episodeTitle.textContent = item.title;
                    linkEpisode.appendChild(episodeNumber);
                    linkEpisode.appendChild(episodeTitle);
                    newEpisode.appendChild(linkEpisode);
                    filmsConteiner.appendChild(newEpisode);
                }));
            }
        }));
        const containerElement = document.querySelector(".film");
        const currentUrl = window.location.href;
        const lastIndex = currentUrl.lastIndexOf("-");
        const filmId = currentUrl.slice(lastIndex + 1, -5);
        console.log(filmId);
        if (containerElement) loadResource(`https://swapi.dev/api/films/${filmId}`).then((data => {
            console.log(data);
            const title = data.title;
            const number = data.episode_id;
            const textAbout = data.opening_crawl;
            const planets = data.planets;
            const species = data.species;
            const filmContainer = createFilmBlock(title, number, textAbout, planets, species);
            containerElement.appendChild(filmContainer);
        })).catch((error => {
            console.error("Error fetching film data:", error);
        }));
    }));
    window["FLS"] = true;
    isWebp();
})();