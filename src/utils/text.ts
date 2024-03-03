export const limitDescription = (description: string, limit: number) => {
	if (description.length > limit) {
		return description.slice(0, limit) + "...";
	}
	return description;
};
