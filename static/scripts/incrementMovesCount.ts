const incrementMovesCount = (movesDescription: HTMLParagraphElement) => {
	movesDescription.textContent = (
		Number(movesDescription.textContent) + 1
	).toString();
};

export default incrementMovesCount;
