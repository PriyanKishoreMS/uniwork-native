import React from "react";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { palette } from "@/constants/Colors";

interface StarRatingProps {
	rating: number;
	size?: number;
	color?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
	rating,
	size = 12,
	color = palette.primary,
}) => {
	const starCount = 5;
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 !== 0;

	const stars: JSX.Element[] = [];

	for (let i = 0; i < fullStars; i++) {
		stars.push(<FontAwesome key={i} name='star' size={size} color={color} />);
	}

	if (hasHalfStar) {
		stars.push(
			<FontAwesome key='half' name='star-half-full' size={size} color={color} />
		);
	}

	for (let i = stars.length; i < starCount; i++) {
		stars.push(<FontAwesome key={i} name='star-o' size={size} color={color} />);
	}

	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				marginLeft: 8,
			}}
		>
			{stars}
		</View>
	);
};

export default StarRating;
