import resolveMove from "./resolveMove.js";
import createBottomElement from "./createBottomElement.js";
import timerRunner from "./timerRunner.js";
import incrementMovesCount from "./incrementMovesCount.js";
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
	let stopTimer: () => void;
	let turn = 0;
	let gridButtonsNumber: 16 | 36;
	switch (gridSize) {
		case "4x4":
			gridButtonsNumber = 16;
			board.classList.remove("larger");
			break;
		case "6x6":
			gridButtonsNumber = 36;
			board.classList.add("larger");
			break;
	}
	theme === "icons"
		? board.classList.add("icons")
		: board.classList.remove("icons");
	const setNewGame = (gridButtonsNumber: 36 | 16) => {
		const boardClasses = [] as string[];
		for (let i = 0; i < gridButtonsNumber / 2; i++) {
			for (let j = 0; j < 2; j++) {
				boardClasses.push(`_${i + 1}`);
			}
		}
		const restartListener = () => {
			restart.removeEventListener("click", restartListener);
			if (stopTimer) stopTimer();
			board.innerHTML = "";
			footer.innerHTML = "";
			setNewGame(gridButtonsNumber);
		};
		restart.addEventListener("click", restartListener);

		let pairFound = 0;
		const receivePairFoundInfo = () => {
			pairFound++;
			if (pairFound === gridButtonsNumber / 2) stopTimer();
		};

		/**
		 *
		 * @param movesDescriptionArray - array of HTMLParagraphElements that represent number of player moves
		 */
		const generateBoard = (movesDescriptionArray: HTMLParagraphElement[]) => {
			for (let i = 0; i < gridButtonsNumber; i++) {
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
						() => incrementMovesCount(movesDescriptionArray[turn]),
					);
				});
				board.appendChild(boardButton);
			}
		};

		if (Number(players) === 1) {
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

			generateBoard([movesDescription]);

			for (const boardButton of board.childNodes) {
				(boardButton as HTMLButtonElement).addEventListener(
					"click",
					buttonFirstClickListener,
				);
			}
		}
	};
	setNewGame(gridButtonsNumber);
}
