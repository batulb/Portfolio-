const about = document.getElementById("about");

const chevron = document.getElementById("chevron");
const dropdown = chevron.nextElementSibling;

let abortTopOff = false;
let lastClick = 0;

chevron.addEventListener("mouseenter", topOn);
chevron.addEventListener("mouseleave", (event) => {
	if(!abortTopOff) {
		if(Date.now() - lastClick < 500){
			setTimeout(topOff, 500 - (Date.now() - lastClick) + 25);
		} else {
			topOff(event);
		}
	}
});
dropdown.addEventListener("mouseenter", (event) => {abortTopOff = false;})
dropdown.addEventListener("mouseleave", topOff)
dropdown.addEventListener("transitionend", toggleBorder);


about.addEventListener("click", event => {
	document.cookie = "triggerOnLoad=true";
});

function toggleTop(event) {
		if(dropdown.classList.contains("off")) {
			topOn(event);
		} else {
			topOff(event);
		}
}

function topOn(event) {
	if(Date.now() - lastClick > 500) {
		dropdown.style.border = "solid 3px black";
		dropdown.classList.replace("off", "on");
		chevron.classList.replace("spin-off", "spin-on");
	}
}

function topOff(event) {
	abortTopOff = true;
	if(Date.now() - lastClick > 500) {
		dropdown.classList.replace("on", "off");
		chevron.classList.replace("spin-on", "spin-off");
		lastClick = Date.now();
	}
}

function toggleBorder(event) {
	if(dropdown.classList.contains("off")) {
		dropdown.style.border = "none";
	}
}