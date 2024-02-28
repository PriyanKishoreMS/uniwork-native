import React, { useState } from "react";
import {
	View,
	Image,
	StyleSheet,
	ScrollView,
	useWindowDimensions,
	Text,
	TouchableHighlight,
	Pressable,
} from "react-native";
import FastImage from "react-native-fast-image";
import ImageView from "react-native-image-viewing";
interface ImageSliderProps {
	images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
	let { width } = useWindowDimensions();
	const height = width * 0.7;

	const [visible, setVisible] = useState(false);
	const [active, setActive] = useState(0);

	const onScrollChange = ({ nativeEvent }: any) => {
		const slide = Math.ceil(
			nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
		);
		if (slide !== active) {
			setActive(slide);
		}
	};

	return (
		<View>
			<ScrollView
				pagingEnabled
				horizontal
				onScroll={onScrollChange}
				showsHorizontalScrollIndicator={false}
				style={{ width, height }}
			>
				{images.map((image, index) => (
					<Pressable key={index} onPress={() => setVisible(true)}>
						<FastImage
							key={index}
							source={{
								uri: image,
								priority: FastImage.priority.normal,
							}}
							style={{
								width: width,
								height,
							}}
							resizeMode={FastImage.resizeMode.cover}
						/>
					</Pressable>
				))}

				<ImageView
					images={images.map(img => ({ uri: img }))}
					imageIndex={0}
					visible={visible}
					onRequestClose={() => setVisible(false)}
				/>
			</ScrollView>
			<View style={styles.pagination}>
				{images.length > 1 &&
					images.map((i, k) => (
						<Text key={k} style={k === active ? styles.activeDot : styles.dot}>
							•
						</Text>
					))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	pagination: {
		flexDirection: "row",
		position: "absolute",
		bottom: -15,
		alignSelf: "center",
	},
	dot: {
		marginBottom: 12,
		color: "#888",
		fontSize: 32,
	},
	activeDot: {
		marginBottom: 12,
		color: "#FFF",
		fontSize: 32,
	},
});

export default ImageSlider;
