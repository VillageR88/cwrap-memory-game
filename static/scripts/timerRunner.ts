const timerRunner = ({
	elementNameDescription,
}: { elementNameDescription: HTMLParagraphElement }) => {
	let seconds = 0;

	const updateTimer = () => {
		const hrs = Math.floor(seconds / 3600);
		const mins = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		elementNameDescription.textContent = `${hrs > 0 ? `${hrs}:` : ""}${mins}:${secs < 10 ? `0${secs}` : secs}`;
		seconds++;
	};

	updateTimer();
	const timerInterval = setInterval(updateTimer, 1000);
	return {
		stop: () => clearInterval(timerInterval),
	};
};

export default timerRunner;
