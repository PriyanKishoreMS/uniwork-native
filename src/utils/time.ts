type pastTime = {
	value: number | "many";
	unit: string;
};
export const formatPastTime = (timestamp: string): pastTime => {
	const currentDate = new Date();
	const providedDate = new Date(timestamp);

	const timeDifference = currentDate.getTime() - providedDate.getTime();

	const seconds = Math.floor(timeDifference / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);

	if (seconds < 60) {
		return { value: seconds, unit: "s" };
	} else if (minutes < 60) {
		return { value: minutes, unit: "m" };
	} else if (hours < 24) {
		return { value: hours, unit: "h" };
	} else if (days < 30) {
		return { value: days, unit: "d" };
	} else if (months < 12) {
		return { value: months, unit: "mo" };
	} else {
		return { value: "many", unit: "years" };
	}
};

export const formatFutureTime = (timestamp: string): string => {
	const currentDate = new Date();
	const providedDate = new Date(timestamp);

	const timeDifference = providedDate.getTime() - currentDate.getTime();

	const seconds = Math.floor(timeDifference / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);

	const daysRemaining = days % 30;
	const hoursRemaining = hours % 24;
	const minutesRemaining = minutes % 60;
	const secondsRemaining = seconds % 60;

	if (seconds < 60) {
		return `${secondsRemaining} second${secondsRemaining !== 1 ? "s" : ""}`;
	} else if (minutes < 60) {
		return `${minutesRemaining} minute${minutesRemaining !== 1 ? "s" : ""}`;
	} else if (hours < 24) {
		return `${hoursRemaining} hour${
			hoursRemaining !== 1 ? "s" : ""
		} ${minutesRemaining} minute${minutesRemaining !== 1 ? "s" : ""}`;
	} else if (days < 30) {
		return `${daysRemaining} day${
			daysRemaining !== 1 ? "s" : ""
		} ${hoursRemaining} hour${hoursRemaining !== 1 ? "s" : ""}`;
	} else if (months < 12) {
		return `${months} month${months !== 1 ? "s" : ""} ${daysRemaining} day${
			daysRemaining !== 1 ? "s" : ""
		} `;
	} else {
		return "More than a year";
	}
};

type dateAndTime = {
	date: string;
	time: string;
};

export const formatDateTime = (timestamp: string): dateAndTime => {
	const date = new Date(timestamp);
	const day = date.getDate();
	const month = date.toLocaleString("default", { month: "short" });
	const year = date.getFullYear().toString().slice(-2);
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? "pm" : "am";
	const formattedHours = hours == 0 ? 12 : hours % 12;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
	const formattedDate = `${day} ${month} ${year}`;
	return { date: formattedDate, time: formattedTime };
};
