let previousElementClass: string | undefined;
let previousElementNode: HTMLButtonElement | undefined;

let moveCount = 0;

const resolveMove = (
	event: MouseEvent,
	currentClass: string,
	currentNode: HTMLButtonElement,
	passPairFoundInfo: () => void,
	passMoveDone: () => void,
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
			setTimeout(() => {
				if (document.body.contains(button)) {
					button.classList.remove("clicked");
				}
			}, 600);
		}
		moveCount = 0;
	}
	if (previousElementClass && previousElementNode) {
		if (previousElementClass === currentClass) {
			previousElementNode.classList.add("found");
			currentNode.classList.add("found");
			passPairFoundInfo();
		}
		previousElementClass = undefined;
		previousElementNode = undefined;
		passMoveDone();
	} else {
		previousElementClass = currentClass;
		previousElementNode = currentNode;
	}
};

export default resolveMove;
