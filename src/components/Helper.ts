import { palette } from "@/constants/Colors";

export function DarkenColor(color: string, percent: number): string {
	if (color === undefined) {
		color = palette.primary;
	}
	var R = parseInt(color.substring(1, 3), 16);
	var G = parseInt(color.substring(3, 5), 16);
	var B = parseInt(color.substring(5, 7), 16);

	R = parseInt(((R * (100 + percent)) / 100).toFixed(0));
	G = parseInt(((G * (100 + percent)) / 100).toFixed(0));
	B = parseInt(((B * (100 + percent)) / 100).toFixed(0));

	R = R < 255 ? R : 255;
	G = G < 255 ? G : 255;
	B = B < 255 ? B : 255;

	R = Math.round(R);
	G = Math.round(G);
	B = Math.round(B);

	var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
	var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
	var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

	return "#" + RR + GG + BB;
}

export function formatTime(timestamp: string): string {
	const currentDate = new Date();
	const providedDate = new Date(
		timestamp.replace(" ", "T").replace(/\+\d+/, "")
	);

	const timeDifference = currentDate.getTime() - providedDate.getTime();

	const seconds = Math.floor(timeDifference / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (seconds < 60) {
		return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
	} else if (minutes < 60) {
		return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
	} else if (hours < 24) {
		return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
	} else {
		return `${days} day${days !== 1 ? "s" : ""} ago`;
	}
}

export const LightenColor = (color: string, factor: number) => {
	let num = parseInt(color.replace("#", ""), 16);
	let newColor = (num & num) << factor;
	return `#${newColor.toString(16)}`;
};
