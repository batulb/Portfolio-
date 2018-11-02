const about = document.getElementById("about");
const subject = document.getElementById("subject");
const msg = subject.nextElementSibling;
const submitInfo = document.getElementById("submit");

about.addEventListener("click", event => {
	document.cookie = "triggerOnLoad=true";
});

subject.addEventListener("focusin", enterField);
msg.addEventListener("focusin", enterField);
subject.addEventListener("focusout", exitField);
msg.addEventListener("focusout", exitField);

function enterField (event) {
	if(this.value === this.getAttribute("data-default")) {
		this.value = "";
	} else {
		this.select();
	}
}

function exitField (event) {
	if(this.value === "") {
		this.value = this.getAttribute("data-default");
	}
	updateMailInfo();
}

function updateMailInfo () {
	const newString = "mailto:bbahrainwala@cca.edu?subject=" +
		subject.value + "&body=" + msg.value;
	submitInfo.setAttribute("href", newString);
}