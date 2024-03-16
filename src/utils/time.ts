export const formatPastTime = (timestamp: string): string => {
	const currentDate = new Date();
	const providedDate = new Date(timestamp);

	const timeDifference = currentDate.getTime() - providedDate.getTime();

	const seconds = Math.floor(timeDifference / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);

	if (seconds < 60) {
		return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
	} else if (minutes < 60) {
		return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
	} else if (hours < 24) {
		return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
	} else if (days < 30) {
		return `${days} day${days !== 1 ? "s" : ""} ago`;
	} else if (months < 12) {
		return `${months} month${months !== 1 ? "s" : ""} ago`;
	} else {
		return "More than a year ago";
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

export const formatDateTime = (timestamp: string): string => {
	const date = new Date(timestamp);
	const day = date.getDate();
	const month = date.toLocaleString("default", { month: "short" });
	const year = date.getFullYear().toString().slice(-2);
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";
	const formattedHours = hours % 12;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
	const formattedDate = `${day} ${month} ${year}, ${formattedTime}`;
	return formattedDate;
};
