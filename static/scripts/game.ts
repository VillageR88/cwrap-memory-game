import resolveMove from "./resolveMove.js";
import createBottomElement from "./createBottomElement.js";
import timerRunner from "./timerRunner.js";
const newGame = document.getElementById("new-game") as HTMLButtonElement;
const board = document.getElementById("board") as HTMLElement;
let pairFound = 0;

const footerContainer = document.querySelector(
	"footer > div:nth-of-type(1)",
) as HTMLElement;
const boardClasses = [] as string[];
for (let i = 0; i < 8; i++) {
	for (let j = 0; j < 2; j++) {
		boardClasses.push(`_${i + 1}`);
	}
}
const passPairFoundInfo = () => {
	pairFound++;
	if (pairFound === 8) stopTimer();
};

for (let i = 0; i < 16; i++) {
	const randomIndex = Math.floor(Math.random() * boardClasses.length);
	const currentClass = boardClasses.splice(randomIndex, 1)[0];
	const boardButton = document.createElement("button");
	boardButton.classList.add(currentClass);
	boardButton.addEventListener("click", (event) => {
		resolveMove(event, currentClass, event.target as HTMLButtonElement, () =>
			passPairFoundInfo(),
		);
	});
	board.appendChild(boardButton);
}
const { elementName: timer, elementNameDescription: timerDescription } =
	createBottomElement({ name: "Time", bottomType: "non-playerSelector" });
const { elementName: moves, elementNameDescription: movesDescription } =
	createBottomElement({ name: "Moves", bottomType: "non-playerSelector" });
timerDescription.textContent = "0:00";
movesDescription.textContent = "0";
footerContainer.appendChild(timer);
footerContainer.appendChild(moves);
newGame.addEventListener("click", () => {
	window.location.href = "../";
});
let stopTimer: () => void;
const buttonFirstClickListener = () => {
	const { stop } = timerRunner({
		elementNameDescription: timerDescription,
	});
	for (const boardButton of board.childNodes) {
		(boardButton as HTMLButtonElement).removeEventListener(
			"click",
			buttonFirstClickListener,
		);
	}
	stopTimer = stop;
};

for (const boardButton of board.childNodes) {
	(boardButton as HTMLButtonElement).addEventListener(
		"click",
		buttonFirstClickListener,
	);
}
