import {
	Menu,
	MenuOption,
	MenuOptions,
	MenuTrigger,
	renderers,
} from "react-native-popup-menu";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { ColorSchemeName, ScrollView, useWindowDimensions } from "react-native";
import Colors, { palette } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import { Pressable, Text } from "../Themed";
import { convertColorIntensity } from "../../utils";
import { categoryColors } from "@/constants/Colors";
import { FormData, ScopeOption, TaskCategory } from "@/types";

type TaskPopupMenuProps = {
	colorScheme: ColorSchemeName;
	taskId: number;
};

type CategoryMenuProps = {
	colorScheme: ColorSchemeName;
	category: string;
	setCategory: (category: string) => void;
	data: FormData;
	setData: React.Dispatch<React.SetStateAction<FormData>>;
};

export const TaskPopupMenu: React.FC<TaskPopupMenuProps> = ({
	colorScheme,
	taskId,
}) => {
	return (
		<Menu
			onSelect={value => console.log(`Selected number: ${value} on ${taskId}`)}
		>
			<MenuTrigger>
				<MaterialCommunityIcons
					name='dots-vertical'
					size={20}
					color={colorScheme === "dark" ? palette.white : palette.black}
				/>
			</MenuTrigger>
			<MenuOptions
				customStyles={{
					optionsContainer: {
						backgroundColor:
							colorScheme === "dark" ? palette.gray : palette.white,
						borderRadius: 12,
					},
				}}
			>
				<MenuOption style={styles.menuItem} value={1}>
					<Text style={styles.text}>Edit</Text>
				</MenuOption>
				<MenuOption style={styles.menuItem} value={2}>
					<Text style={styles.text}>Delete</Text>
				</MenuOption>
			</MenuOptions>
		</Menu>
	);
};

export const ScopeMenu = () => {
	return (
		<Menu
			renderer={renderers.SlideInMenu}
			onSelect={value => console.log(`Selected number: ${value}`)}
		>
			<MenuTrigger>
				<MaterialCommunityIcons
					name='dots-vertical'
					size={20}
					color={palette.white}
				/>
			</MenuTrigger>
			<MenuOptions
				customStyles={{
					optionsContainer: {
						backgroundColor: palette.black,
						borderTopStartRadius: 12,
						borderTopEndRadius: 12,
					},
				}}
			>
				<MenuOption style={styles.menuItem} value={1}>
					<Text style={styles.text}>Edit</Text>
				</MenuOption>
				<MenuOption style={styles.menuItem} value={2}>
					<Text style={styles.text}>Delete</Text>
				</MenuOption>
			</MenuOptions>
		</Menu>
	);
};

export const CategoryMenu: React.FC<CategoryMenuProps> = ({
	colorScheme,
	setCategory,
	category,
	data,
	setData,
}) => {
	let { height } = useWindowDimensions();
	height = height * 0.75;
	const handleCategorySelect = (value: string) => {
		setCategory(value);
		setData({ ...data, category: value });
		console.log("Selected Category", value);
	};
	return (
		<Menu
			onSelect={value => handleCategorySelect(value)}
			renderer={renderers.SlideInMenu}
		>
			<MenuTrigger
				style={{
					borderRadius: 18,
					overflow: "hidden",
				}}
			>
				{category ? (
					<View
						style={[
							styles.category,
							{
								borderColor: convertColorIntensity(
									categoryColors[category as TaskCategory],
									-40
								),
								backgroundColor: categoryColors[category as TaskCategory],
							},
						]}
					>
						<Text
							style={[
								styles.categoryText,
								{
									color: convertColorIntensity(
										categoryColors[category as TaskCategory],
										-60
									),
								},
							]}
						>
							{category}
						</Text>
					</View>
				) : (
					<View
						style={[
							styles.category,
							{
								borderColor: convertColorIntensity(palette.primary, -60),
								backgroundColor: palette.transparent,
							},
						]}
					>
						<Text
							style={[
								styles.categoryText,
								{
									color: convertColorIntensity(
										categoryColors[category as TaskCategory],
										-20
									),
								},
							]}
						>
							Select Category
						</Text>
					</View>
				)}
			</MenuTrigger>
			<MenuOptions
				customStyles={{
					optionsContainer: {
						backgroundColor:
							colorScheme === "dark" ? palette.grayDark : palette.white,
						borderRadius: 12,
					},
				}}
			>
				<View>
					<MenuOption
						onSelect={() => {
							setCategory("");
						}}
						style={[
							styles.menuItem,
							{
								borderBottomWidth: 1,
								borderColor: palette.grayLight,
							},
						]}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								margin: 8,
							}}
						>
							<MaterialIcons
								name='clear'
								size={24}
								color={colorScheme === "dark" ? palette.white : palette.black}
							/>
							<Text
								style={{
									fontFamily: "InterSemiBold",
									paddingHorizontal: 4,
									fontSize: 16,
								}}
							>
								Clear
							</Text>
						</View>
					</MenuOption>
					<ScrollView
						style={{
							maxHeight: height,
							padding: 8,
						}}
					>
						{Object.values(TaskCategory).map((category, index) => (
							<MenuOption style={styles.menuItem} key={index} value={category}>
								<View
									style={[
										styles.category,
										{
											borderColor: convertColorIntensity(
												categoryColors[category as TaskCategory],
												-40
											),
											backgroundColor: categoryColors[category as TaskCategory],
										},
									]}
								>
									<Text
										style={[
											styles.categoryText,
											{
												color: convertColorIntensity(
													categoryColors[category as TaskCategory],
													-60
												),
											},
										]}
									>
										{category}
									</Text>
								</View>
							</MenuOption>
						))}
					</ScrollView>
				</View>
			</MenuOptions>
		</Menu>
	);
};

const styles = StyleSheet.create({
	menuItem: {
		padding: 6,
		borderRadius: 12,
	},
	text: {
		fontFamily: "Inter",
		paddingHorizontal: 8,
	},
	categoryText: {
		fontSize: 16,
		fontFamily: "InterSemiBold",
	},
	category: {
		borderWidth: 2,
		// marginHorizontal: 16,
		paddingHorizontal: 8,
		borderRadius: 18,
		padding: 2,
		backgroundColor: palette.primary,
		alignSelf: "flex-start",
		// marginVertical: 8,
	},
});
