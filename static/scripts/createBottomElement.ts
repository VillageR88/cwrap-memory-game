/**
 * Creates Footer bottom element like timer, moves counter or player selected.
 */
const createBottomElement = ({
	name,
	extended,
}: { name: string; extended?: boolean }) => {
	const elementName = document.createElement("div");
	const elementNameTitle = document.createElement("h2");
	const elementNameDescription = document.createElement("p");
	elementNameTitle.textContent = name;
	elementName.appendChild(elementNameTitle);
	elementName.appendChild(elementNameDescription);
	if (extended) {
		elementName.appendChild(createSvgPointer());
		const span = document.createElement("span");
		span.textContent = "CURRENT TURN";
		elementName.appendChild(span);
	}

	return { elementName, elementNameDescription };
};

export default createBottomElement;

const createSvgPointer = () => {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width", "39");
	svg.setAttribute("height", "20");
	svg.setAttribute("viewBox", "0 0 39 20");
	svg.setAttribute("fill", "none");
	svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path.setAttribute("fill-rule", "evenodd");
	path.setAttribute("clip-rule", "evenodd");
	path.setAttribute("d", "M0 19.2788L19.2788 0L38.5577 19.2788H0Z");
	svg.appendChild(path);
	return svg;
};
