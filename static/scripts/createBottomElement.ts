/**
 * Creates Footer bottom element like timer, moves counter or player selected.
 */
const createBottomElement = (name: string) => {
	const elementName = document.createElement("div");
	const elementNameTitle = document.createElement("h2");
	const elementNameDescription = document.createElement("p");
	elementNameTitle.textContent = name;
	elementName.appendChild(elementNameTitle);
	elementName.appendChild(elementNameDescription);
	return { elementName, elementNameDescription };
};

export default createBottomElement;
