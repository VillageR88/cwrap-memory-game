import resolveMove from "./resolveMove.js";
import incrementMovesCount from "./incrementMovesCount.js";
const board = document.querySelector("main > div") as HTMLElement;

/**
 * Function that generates main element board
 */
const generateBoard = ({
	elementReferenceCollection,
	elementDescriptionCollection,
	gridButtonsNumber,
	stopTimer,
}: {
	elementReferenceCollection?: HTMLDivElement[];
	elementDescriptionCollection: HTMLParagraphElement[];
	gridButtonsNumber: 16 | 36;
	stopTimer?: () => void;
}) => {
	let turn = 0;
	if (elementReferenceCollection) {
		elementReferenceCollection[turn].classList.add("turn");
	}
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
				() => {
					passEnumPairFoundInfo();
				},
				() => {
					if (elementReferenceCollection) {
						if (!pairFound) {
							elementReferenceCollection[turn].classList.remove("turn");
							if (turn !== elementReferenceCollection.length - 1) turn++;
							else turn = 0;
							if (pairFoundEnum !== gridButtonsNumber / 2)
								elementReferenceCollection[turn].classList.add("turn");
						} else {
							if (pairFoundEnum === gridButtonsNumber / 2)
								elementReferenceCollection[turn].classList.remove("turn");
							pairFound = false;
						}
					} else
						elementDescriptionCollection[turn].textContent = (
							Number(elementDescriptionCollection[turn].textContent) + 1
						).toString();
				},
			);
		});
		board.appendChild(boardButton);
	}
	let pairFound = false;
	let pairFoundEnum = 0;
	const passEnumPairFoundInfo = () => {
		pairFound = true;
		if (elementReferenceCollection) {
			elementDescriptionCollection[turn].textContent = (
				Number(elementDescriptionCollection[turn].textContent) + 1
			).toString();
		}
		pairFoundEnum++;
		if (pairFoundEnum === gridButtonsNumber / 2 && stopTimer) {
			stopTimer();
		}
	};
};

export default generateBoard;
