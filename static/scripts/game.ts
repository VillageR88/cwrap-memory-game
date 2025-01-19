import createBottomElement from "./createBottomElement.js";
import timerRunner from "./timerRunner.js";
import generateBoard from "./generateBoard.js";
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
		const restartListener = () => {
			restart.removeEventListener("click", restartListener);
			if (stopTimer) stopTimer();
			board.innerHTML = "";
			footer.innerHTML = "";
			setNewGame(gridButtonsNumber);
		};
		restart.addEventListener("click", restartListener);

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
				createBottomElement("Time");
			const { elementName: moves, elementNameDescription: movesDescription } =
				createBottomElement("Moves");
			timerDescription.textContent = "0:00";
			movesDescription.textContent = "0";
			footer.appendChild(timer);
			footer.appendChild(moves);

			generateBoard({
				elementDescriptionCollection: [movesDescription],
				gridButtonsNumber: gridButtonsNumber,
				stopTimer: () => stopTimer(),
			});
			for (const boardButton of board.childNodes) {
				(boardButton as HTMLButtonElement).addEventListener(
					"click",
					buttonFirstClickListener,
				);
			}
		} else {
			const elementReferenceCollection = [] as HTMLDivElement[];
			const elementDescriptionCollection = [] as HTMLParagraphElement[];
			for (let i = 0; i < Number(players); i++) {
				const {
					elementName: player,
					elementNameDescription: player1Description,
				} = createBottomElement(`Player ${i + 1}`);
				player1Description.textContent = "0";
				footer.appendChild(player);
				elementReferenceCollection.push(player);
				elementDescriptionCollection.push(player1Description);
			}
			generateBoard({
				elementReferenceCollection: elementReferenceCollection,
				elementDescriptionCollection: elementDescriptionCollection,
				gridButtonsNumber: gridButtonsNumber,
			});
		}
	};
	setNewGame(gridButtonsNumber);
}
