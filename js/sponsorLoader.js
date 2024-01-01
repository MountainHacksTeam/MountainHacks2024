addEventListener("DOMContentLoaded", ev => {
    var sponsorCardsContainer = document.querySelector("div.cards-container.sponsor");
    if (sponsorCardsContainer) {
        fetchSponsorData(true);
    }
});

var sponsorData = {};

async function fetchSponsorData(updateElements=true) {
    var req = await fetch("./data/sponsors.json");
    if (req.ok) {
        sponsorData = await req.json();
        if (updateElements) updateSponsorCards();
    }
}

function updateSponsorCards() {
    clearNonTemplates("div.cards-container.sponsor");
    var sponsorCardsContainer = document.querySelector("div.cards-container.sponsor");
    var sponsorCardTemplate = document.querySelector(".card.sponsor.template");
    for (var i in sponsorData) {
        var sponsor = sponsorData[i];
        var newSponsor = sponsorCardTemplate.cloneNode(true);
        newSponsor.classList.remove("template");
        sponsorCardsContainer.appendChild(newSponsor);
        newSponsor.querySelector(".sponsor-name").innerText = sponsor.name;
        newSponsor.querySelector("img").setAttribute("src", sponsor.img);
        if (sponsor.url) newSponsor.setAttribute("href", sponsor.url);
        if (!sponsor.filter) {
            newSponsor.classList.add("no-filter");
        }
    }
}