import resolveMove from "./resolveMove.js";
import createBottomElement from "./createBottomElement.js";
import timerRunner from "./timerRunner.js";
const restart = document.getElementById("restart") as HTMLButtonElement;
const newGame = document.getElementById("new-game") as HTMLButtonElement;
const board = document.querySelector("main > div") as HTMLElement;
const footer = document.querySelector("footer") as HTMLElement;
const urlParams = new URLSearchParams(window.location.search);
const theme = urlParams.get("theme");
const players = urlParams.get("players");
const gridSize = urlParams.get("grid-size");
newGame.addEventListener("click", () => {
	window.location.href = "../";
});

if (
	!(theme === "numbers" || theme === "icons") ||
	Number(players) < 1 ||
	Number(players) > 4 ||
	!(gridSize === "4x4" || gridSize === "6x6")
)
	window.location.href = "../";
else {
	let gridCalculated: 16 | 36;
	switch (gridSize) {
		case "4x4":
			gridCalculated = 16;
			board.classList.remove("larger");
			break;
		case "6x6":
			gridCalculated = 36;
			board.classList.add("larger");
			break;
	}
	theme === "icons"
		? board.classList.add("icons")
		: board.classList.remove("icons");
	const setNewGame = (gridCalculated: 36 | 16) => {
		const boardClasses = [] as string[];
		for (let i = 0; i < gridCalculated / 2; i++) {
			for (let j = 0; j < 2; j++) {
				boardClasses.push(`_${i + 1}`);
			}
		}
		let stopTimer: () => void;
		const restartListener = () => {
			restart.removeEventListener("click", restartListener);
			if (stopTimer) stopTimer();
			board.innerHTML = "";
			footer.innerHTML = "";
			setNewGame(gridCalculated);
		};
		restart.addEventListener("click", restartListener);

		let pairFound = 0;
		const receivePairFoundInfo = () => {
			pairFound++;
			if (pairFound === gridCalculated / 2) stopTimer();
		};
		const receiveMoveDone = () => {
			movesDescription.textContent = (
				Number(movesDescription.textContent) + 1
			).toString();
		};
		for (let i = 0; i < gridCalculated; i++) {
			const randomIndex = Math.floor(Math.random() * boardClasses.length);
			const currentClass = boardClasses.splice(randomIndex, 1)[0];
			const boardButton = document.createElement("button");
			boardButton.classList.add(currentClass);
			boardButton.addEventListener("click", (event) => {
				resolveMove(
					event,
					currentClass,
					event.target as HTMLButtonElement,
					() => receivePairFoundInfo(),
					() => receiveMoveDone(),
				);
			});
			board.appendChild(boardButton);
		}
		const { elementName: timer, elementNameDescription: timerDescription } =
			createBottomElement({ name: "Time", bottomType: "non-playerSelector" });
		const { elementName: moves, elementNameDescription: movesDescription } =
			createBottomElement({
				name: "Moves",
				bottomType: "non-playerSelector",
			});
		timerDescription.textContent = "0:00";
		movesDescription.textContent = "0";
		footer.appendChild(timer);
		footer.appendChild(moves);

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
	};
	setNewGame(gridCalculated);
}
