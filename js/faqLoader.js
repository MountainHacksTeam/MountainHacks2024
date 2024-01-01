addEventListener("DOMContentLoaded", ev => {
    var faqContainer = document.querySelector(".faq-container");
    if (faqContainer) {
        fetchFaqData(true);
    }
});

var faqData = {};

async function fetchFaqData(updateElements=true) {
    var req = await fetch("./data/faq.json");
    if (req.ok) {
        faqData = await req.json();
        if (updateElements) updateFaqElements();
    }
}

function updateFaqElements() {
    clearNonTemplates(".faq-container");
    var faqContainer = document.querySelector(".faq-container");
    var faqTemplate = document.querySelector(".faq.template");
    for (var i in faqData) {
        var faq = faqData[i];
        var newFaq = faqTemplate.cloneNode(true);
        newFaq.classList.remove("template");
        faqContainer.appendChild(newFaq);
        newFaq.querySelector(".faq-question").innerText = faq.question;
        newFaq.querySelector(".faq-answer").innerText = faq.answer;
    }
}