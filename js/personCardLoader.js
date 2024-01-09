addEventListener("DOMContentLoaded", ev => {
    var personCardsContainer = document.querySelector("div.cards-container.person");
    if (personCardsContainer) {
        fetchPersonData(true);
    }
});

var personData = {};

async function fetchPersonData(updateElements=true) {
    var req = await fetch("./data/organizers.json");
    if (req.ok) {
        personData = await req.json();
        if (updateElements) updatePersonCards();
    }
}

function updatePersonCards() {
    clearNonTemplates("div.cards-container.person");
    var personCardsContainer = document.querySelector("div.cards-container.person");
    var personCardTemplate = document.querySelector("div.card.person.template");
    for (var i in personData) {
        var person = personData[i];
        var newPerson = personCardTemplate.cloneNode(true);
        newPerson.classList.remove("template");
        personCardsContainer.appendChild(newPerson);
        newPerson.querySelector("h1.section-title").innerText = person.name;
        newPerson.querySelector("h2.section-subtitle").innerText = person.role;
        newPerson.querySelector("p.desc").innerText = person.desc;
        var imgElem = newPerson.querySelector("img");
        imgElem.setAttribute("src", person.img);
        if (!person.img) {
            imgElem.style.display = "none";
            imgElem.setAttribute("data-no-img", 1);
        }
        var socials = person.socials;
        var socialsContainer = newPerson.querySelector("div.socials");
        for (var s in socials) {
            var socialLink = socialsContainer.querySelector(`a.${s}`);
            if (socialLink) {
                socialLink.style.display = "block";
                socialLink.setAttribute("href", socials[s]);
            }
        }
    }
}