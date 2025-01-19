import resolveMove from "./resolveMove.js";
import incrementMovesCount from "./incrementMovesCount.js";
const board = document.querySelector("main > div") as HTMLElement;

/**
 *
 * @param movesDescription - HTMLParagraphElement that represent number of player moves
 */
const generateBoard = ({
	movesDescription,
	gridButtonsNumber,
	stopTimer,
}: {
	movesDescription: HTMLParagraphElement;
	gridButtonsNumber: 16 | 36;
	stopTimer: () => void;
}) => {
	const boardClasses = [] as string[];
	for (let i = 0; i < gridButtonsNumber / 2; i++) {
		for (let j = 0; j < 2; j++) {
			boardClasses.push(`_${i + 1}`);
		}
	}
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
				() => incrementMovesCount(movesDescription),
			);
		});
		board.appendChild(boardButton);
	}
	let pairFound = 0;

	const receivePairFoundInfo = () => {
		pairFound++;
		if (pairFound === gridButtonsNumber / 2) {
			stopTimer();
		}
	};
};

export default generateBoard;
