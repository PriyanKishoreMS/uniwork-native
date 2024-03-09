const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export const palette = {
	black: "#000000",
	white: "#ffffff",
	gray: "#666666",
	grayLight: "#999999",
	grayLight2: "#A9A9A9",
	grayDark: "#333333",
	blue: "#2f95dc",
	//conver primary to rgba
	//#94D6F2
	primary: "#94D6F2",
	//pastel orange hex code for secondary
	secondary: "#FF7F50",
	success: "#A5D6A7",
	primaryDark: "#66AED6",
	text: "#0D171C",
	transparent: "rgba(0,0,0,0)",
	red: "#FF0000",
	green: "#008000",
};

export const categoryColors = {
	"Academic Assistance": "#FFB6C1",
	"Tutor Home/Virtual": "#FFD700",
	"Books Rent/Buy": "#87CEEB",
	"Vehicle Rent": "#FFA07A",
	"Document Printing": "#98FB98",
	"Resume Creation": "#FF6347",
	"Job Search Support": "#FF4500",
	"Grocery Shopping": "#8A2BE2",
	Fashion: "#00BFFF",
	"Social Media": "#20B2AA",
	"IT Support": "#FF1493",
	"Graphic Design": "#4B0082",
	Delivery: "#FF8C00",
	"Ride sharing": "#1E90FF",
	"Catering/Cooking": "#FF00FF",
};

export default {
	light: {
		text: "#000",
		background: "#FAF9F6",
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
