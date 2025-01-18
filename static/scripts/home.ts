const form = document.getElementById("menu-form") as HTMLFormElement;

form.addEventListener("submit", (event) => {
	event.preventDefault();
	for (const [, value] of form.querySelectorAll("input").entries()) {
		if (value.checked) {
			window.location.href = "game";
		}
	}
});
