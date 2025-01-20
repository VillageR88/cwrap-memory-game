import resolveMove from "./resolveMove.js";
import incrementMovesCount from "./incrementMovesCount.js";
const board = document.querySelector("main > div") as HTMLElement;
const endTitle = document.querySelector(
	"body > div:nth-of-type(1) > div:nth-of-type(1) > h2:nth-of-type(1)",
) as HTMLHeadingElement;
const endDescription = document.querySelector(
	"body > div:nth-of-type(1) > div:nth-of-type(1) > p:nth-of-type(1)",
) as HTMLHeadingElement;
const resultsContainer = document.querySelector(
	"body > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1)",
) as HTMLDivElement;
/**
 * Function that generates main element board
 */
const generateBoard = ({
	maskReference,
	elementReferenceCollection,
	elementDescriptionCollection,
	gridButtonsNumber,
	stopTimer,
}: {
	maskReference: HTMLDivElement;
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
							//end condition multiplayer
							if (pairFoundEnum === gridButtonsNumber / 2) {
								elementReferenceCollection[turn].classList.remove("turn");
								resultsContainer.innerHTML = "";
								endDescription.textContent =
									"Game over! Here’s how you got on…";
								completePlayerCollection.sort((b, a) => a.value - b.value);
								let numberOfWinners = 0;
								for (const { key, value } of completePlayerCollection) {
									const resultDiv = document.createElement("div");
									const resultTitle = document.createElement("h3");
									const resultDescription = document.createElement("p");
									resultTitle.textContent = key;
									if (value === completePlayerCollection[0].value) {
										numberOfWinners++;
										resultDiv.classList.add("winner");
										resultTitle.textContent += " (Winner!)";
									}
									resultDescription.textContent = value
										.toString()
										.concat(value === 1 ? " Pair" : value > 1 ? " Pairs" : "");
									resultDiv.appendChild(resultTitle);
									resultDiv.appendChild(resultDescription);
									resultsContainer.appendChild(resultDiv);
								}
								if (numberOfWinners === 1)
									endTitle.textContent =
										completePlayerCollection[0].key.concat(" Wins!");
								else endTitle.textContent = "It’s a tie!";

								console.log("numberOfWinners", numberOfWinners);
								maskReference.style.opacity = "1";
								maskReference.style.userSelect = "unset";
								maskReference.style.pointerEvents = "unset";
							}
							pairFound = false;
						}
					} else {
						playerPointsCollection[turn]++;
						elementDescriptionCollection[turn].textContent = (
							Number(elementDescriptionCollection[turn].textContent) + 1
						).toString();
					}
				},
			);
		});
		board.appendChild(boardButton);
	}
	let completePlayerCollection: { key: string; value: number }[] = [];
	if (elementReferenceCollection) {
		completePlayerCollection = Array.from(
			{ length: elementDescriptionCollection.length },
			(_, i) => ({ key: `Player ${i + 1}`, value: 0 }),
		);
	}

	const playerPointsCollection = new Array(
		elementDescriptionCollection.length,
	).fill(0);

	let pairFound = false;
	let pairFoundEnum = 0;
	const passEnumPairFoundInfo = () => {
		pairFound = true;
		//multiplayer condition game-play
		if (elementReferenceCollection) {
			completePlayerCollection[turn].value++;
			elementDescriptionCollection[turn].textContent = (
				Number(elementDescriptionCollection[turn].textContent) + 1
			).toString();
		}
		pairFoundEnum++;
		//end condition single
		if (pairFoundEnum === gridButtonsNumber / 2 && stopTimer) {
			const singleTimerReference = document.querySelector(
				"footer > div:nth-of-type(1) > p:nth-of-type(1)",
			) as HTMLParagraphElement;
			endTitle.textContent = "You did it!";
			endDescription.textContent = "Game over! Here’s how you got on…";
			resultsContainer.innerHTML = "";
			for (let i = 0; i < 2; i++) {
				const resultDiv = document.createElement("div");
				const resultTitle = document.createElement("h3");
				const resultDescription = document.createElement("p");
				resultTitle.textContent = ["Time Elapsed", "Moves Taken"][i];
				resultDescription.textContent = [
					singleTimerReference.textContent,
					(playerPointsCollection[turn] + 1).toString().concat(" Moves"),
				][i];
				resultDiv.appendChild(resultTitle);
				resultDiv.appendChild(resultDescription);
				resultsContainer.appendChild(resultDiv);
			}
			maskReference.style.opacity = "1";
			maskReference.style.userSelect = "unset";
			maskReference.style.pointerEvents = "unset";
			stopTimer();
		}
	};
};

export default generateBoard;
