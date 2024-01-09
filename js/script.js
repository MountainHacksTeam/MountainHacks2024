const TOP_SCROLL_THRESHOLD = 10;

var atTop = true;
var growInterval;

function isHomePage() {
    return (location.pathname == "/" || location.pathname == "/index.html" || location.pathname == "");
}

function adjustStuff(repeat = 0, minScroll = 0.01) {
    // stuff to update repeatedly
    // that isn't dependent on other
    // event listeners such as scroll

    if (repeat) {
        setTimeout(adjustStuff, repeat);
    }
}

// setInterval(adjustStuff, 200);

var socialsContainer = document.querySelector(".socials-container");

function adjustScrollUpdateStuff() {
    if (window.scrollY < TOP_SCROLL_THRESHOLD) {
        socialsContainer.setAttribute('smallified', '0');

        atTop = true;
    }
    else {
        socialsContainer.setAttribute('smallified', '1');

        if (atTop) {
            atTop = false;
            startGrowNumberAnim(120, 2, true);
        }
    }
}

addEventListener("scroll", adjustScrollUpdateStuff);

function startGrowNumberAnim(fractions, time, replace) {
    if (!replace && growInterval) {
        return;
    }
    var animatedNums = document.getElementsByClassName("big-num-anim");
    for (var e = 0; e < animatedNums.length; e++) {
        var el = animatedNums.item(e);
        el.setAttribute("grow-progress", "0");
        if (!el.getAttribute("grow-target")) {
            el.setAttribute("grow-target", el.innerText);
        }
    }
    if (growInterval) clearInterval(growInterval);
    growInterval = setInterval(() => { growAllNumberAnim(fractions) }, 1000 * time / fractions);
}

function growNumberAnim(e, fractions) {
    var growTarget = e.getAttribute("grow-target");
    var growProgress = e.getAttribute("grow-progress");
    if (parseFloat(growProgress) >= 1) {
        e.innerText = growTarget;
        e.setAttribute("grow-progress", 1);
        return;
    }

    var newGrowProgress = parseFloat(growProgress) + (1 / fractions);
    var nextNum = parseFloat(growTarget) * newGrowProgress;
    e.setAttribute("grow-progress", newGrowProgress.toString());
    e.innerText = Math.round(nextNum);
}

function growAllNumberAnim(fractions) {
    var animatedNums = document.getElementsByClassName("big-num-anim");
    for (var e = 0; e < animatedNums.length; e++) {
        growNumberAnim(animatedNums.item(e), fractions);
    }
}

var topBar = document.querySelector(".top-bar");

function scrollToContent() {
    window.scroll({
        left: 0,
        top: window.innerHeight - topBar.offsetHeight,
        behavior: "smooth"
    });
}

function clearNonTemplates(containerSelector, element) {
    var container = containerSelector ? document.querySelector(containerSelector) : element;
    for (var e in container.children) {
        var elem = container.children.item(e);
        if (!elem.classList.contains("template")) elem.remove();
    }
}

function copyBtnClicked(element) {
    var text = element.getAttribute("data-copy-text");
    navigator.clipboard.writeText(text).then(() => {
        console.log("copied " + text);
        var ogText = element.querySelector("p").innerText;
        if (ogText != "copied") {
            element.querySelector("p").innerText = "copied";
            setTimeout(() => {
                element.querySelector("p").innerText = ogText;
            }, 1000);
        }
    }).catch(reason => {
        console.log("error:", reason);
    });
}



function scrollToSection(section) {
    document.querySelector("[data-section=" + section + "]").scrollIntoView({behavior: "smooth", block: "nearest"});
}