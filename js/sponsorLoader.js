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
    var sponsorSectionContainer = document.querySelector("div.sponsor-section-container");
    var sponsorSections = sponsorSectionContainer.querySelectorAll("div.cards-container.sponsor");
    var firstSponsorSection = sponsorSectionContainer.firstElementChild;
    for (var e in sponsorSections.values) {
        clearNonTemplates(null, sponsorSections.item(e));
    }
    var sponsorCardTemplate = document.querySelector(".card.sponsor.template");
    for (var i in sponsorData) {
        var sponsor = sponsorData[i];
        var newSponsor = sponsorCardTemplate.cloneNode(true);
        newSponsor.classList.remove("template");
        var s = sponsorSectionContainer.querySelector(`[data-sponsor-type=${sponsor.type}]`)
        if (sponsor.type) {
            if (s) {
                s.appendChild(newSponsor);
            }
            else {
                var newSec = sponsorSectionContainer.appendChild(firstSponsorSection.cloneNode(false));
                newSec.setAttribute("data-sponsor-type", sponsor.type);
                newSec.appendChild(newSponsor);
            }
        }
        else {
            firstSponsorSection.appendChild(newSponsor);
        }
        newSponsor.querySelector(".sponsor-name").innerText = sponsor.name;
        newSponsor.querySelector(".sponsor-desc").innerText = sponsor.desc ? sponsor.desc : "";
        newSponsor.querySelector("img").setAttribute("src", sponsor.img);
        if (sponsor.url) newSponsor.setAttribute("href", sponsor.url);
        if (sponsor.filter) {
            newSponsor.classList.add("filter");
        }
    }
}