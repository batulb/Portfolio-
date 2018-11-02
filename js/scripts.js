const main = document.getElementById("main");

const abouts = document.getElementsByClassName("about-me");

const chevron = document.getElementById("chevron");
const dropdown = chevron.nextElementSibling;

const input = document.getElementsByTagName("input")[0];

const aboutContainer = document.getElementById("sidebar").lastElementChild;
const aboutBtn = abouts[1];

for (let i = 1; i <= document.getElementsByClassName("img").length; i++) {
	document.getElementById("img"+i).addEventListener("click", (event) => {
		window.location.href = "./work-pages/work" + i + ".html";
	});
}

let lastClick = 0;
let abortTopOff = false;
document.cookie = "triggerOnLoad=false";

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
// input.addEventListener("keypress", writeToJson)
abouts[0].addEventListener("click", toggleSidebar);
abouts[1].addEventListener("click", toggleSidebar);
abouts[2].addEventListener("click", toggleSidebar);
aboutContainer.addEventListener("transitionend", toggleBorder);

// This will only work with a server set up
document.addEventListener("DOMContentLoaded", event => {
	if(document.cookie.match(/^(.*;)?\s*MyCookie\s*=\s*[^;]+(.*)?$/)) {
		toggleSidebar(null);
	}
})

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

// Need this listener so border doesn't show while hidden and doesn't pop out of the screen

function toggleBorder(event) {
	if(dropdown.classList.contains("off")) {
		dropdown.style.border = "none";
	}
	if(!aboutContainer.classList.contains("on")) {
		aboutContainer.style.border = "none";
	}
}

function toggleSidebar(event) {
	if(aboutContainer.classList.contains("on")){
		aboutContainer.classList.remove("on");
		main.classList.remove("col-expand")
	} else {
		aboutContainer.style.border = "solid 3px black";
		aboutContainer.classList.add("on")
		main.classList.add("col-expand");
	}
}

// function writeToJson(event) {
// 	const key = event.which;
// 	if(key == 13)
// 	{
// 		updateJSON(appendInput);
// 	}
// }

// function updateJSON(callback) {
// 	let xobj = new XMLHttpRequest();
// 	xobj.overrideMimeType("application/json");
// 	xobj.open("GET", "responses.json");
// 	xobj.onreadystatechange = function () {
// 		if (xobj.readyState == 4 && xobj.status == "200") {
// 			let newData = callback(xobj.responseText);
// 		}
// 		xobj.send(newData);
// 	};
	
// }

// function appendInput(jsonObj) {
// 	let old = JSON.parse(jsonObj);
// 	old.table.push({responses: input.value});

// 	return JSON.stringify(old);
// }