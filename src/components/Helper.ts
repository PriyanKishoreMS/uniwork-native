export const DarkenColor = (color: string, factor: number) => {
	let num = parseInt(color.replace("#", ""), 16);
	let newColor = (num & num) >> factor;
	return `#${newColor.toString(16)}`;
};

export const LightenColor = (color: string, factor: number) => {
	let num = parseInt(color.replace("#", ""), 16);
	let newColor = (num & num) << factor;
	return `#${newColor.toString(16)}`;
};
