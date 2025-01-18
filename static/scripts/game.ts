const newGame = document.getElementById("new-game") as HTMLButtonElement;
const board = document.getElementById("board") as HTMLElement;
for (let i = 0; i < 16; i++) {
	board.appendChild(document.createElement("button"));
}

newGame.addEventListener("click", () => {
	window.location.href = "../";
});
