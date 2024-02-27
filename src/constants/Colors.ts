const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export const palette = {
	black: "#000000",
	white: "#ffffff",
	gray: "#666666",
	grayLight: "#999999",
	grayDark: "#333333",
	blue: "#2f95dc",
	//conver primary to rgba
	//#94D6F2
	primary: "#94D6F2",
	success: "#A5D6A7",
	primaryDark: "#66AED6",
	text: "#0D171C",
	transparent: "rgba(0,0,0,0)",
};

export default {
	light: {
		text: "#000",
		background: "#fff",
		tint: tintColorLight,
		borderColor: tintColorDark,
		tabIconDefault: "#ccc",
		tabIconSelected: tintColorLight,
		tabBackground: "#f2f2f2",
	},
	dark: {
		text: "#fff",
		background: "#222",
		tint: tintColorDark,
		borderColor: tintColorLight,
		tabIconDefault: "#ccc",
		tabIconSelected: tintColorDark,
		tabBackground: "#111",
	},
};
