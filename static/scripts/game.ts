const newGame = document.getElementById("new-game") as HTMLButtonElement;
const board = document.getElementById("board") as HTMLElement;
const boardClasses = [] as string[];
let moveCount = 0;
let previousElementClass: string | undefined;
let previousElementNode: HTMLButtonElement | undefined;
for (let i = 0; i < 8; i++) {
	for (let j = 0; j < 2; j++) {
		boardClasses.push(`_${i + 1}`);
	}
}

for (let i = 0; i < 16; i++) {
	const randomIndex = Math.floor(Math.random() * boardClasses.length);
	const currentClass = boardClasses.splice(randomIndex, 1)[0];
	const boardButton = document.createElement("button");
	boardButton.classList.add(currentClass);
	boardButton.addEventListener("click", (event) => {
		resolveMove(event, currentClass, event.target as HTMLButtonElement);
	});
	board.appendChild(boardButton);
}
const resolveMove = (
	event: MouseEvent,
	currentClass: string,
	currentNode: HTMLButtonElement,
) => {
	const currentButton = event.target as HTMLButtonElement;
	if (
		currentButton.classList.contains("clicked") ||
		currentButton.classList.contains("found")
	)
		return;
	currentButton.classList.add("clicked");

	moveCount++;
	if (moveCount === 2) {
		const clickedButtons = document.querySelectorAll(".clicked");
		for (const button of clickedButtons) {
			button.classList.remove("clicked");
		}
		moveCount = 0;
	}
	if (previousElementClass && previousElementNode) {
		if (previousElementClass === currentClass) {
			previousElementNode.classList.add("found");
			currentNode.classList.add("found");
		}
		previousElementClass = undefined;
		previousElementNode = undefined;
	} else {
		previousElementClass = currentClass;
		previousElementNode = currentNode;
	}
};

newGame.addEventListener("click", () => {
	window.location.href = "../";
});
