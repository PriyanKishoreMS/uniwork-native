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
import { DarkenColor } from "../../utils";
import { categoryColors } from "@/constants/Colors";

enum TaskCategory {
	AcademicAssistance = "Academic Assistance",
	TutorHomeVirtual = "Tutor Home/Virtual",
	BooksRentBuy = "Books Rent/Buy",
	VehicleRent = "Vehicle Rent",
	DocumentPrinting = "Document Printing",
	ResumeCreation = "Resume Creation",
	JobSearchSupport = "Job Search Support",
	GroceryShopping = "Grocery Shopping",
	Fashion = "Fashion",
	SocialMedia = "Social Media",
	ITSupport = "IT Support",
	GraphicDesign = "Graphic Design",
	Delivery = "Delivery",
	RideSharing = "Ride sharing",
	CateringCooking = "Catering/Cooking",
}

type TaskPopupMenuProps = {
	colorScheme: ColorSchemeName;
	taskId: number;
};

type CategoryMenuProps = {
	colorScheme: ColorSchemeName;
	category: string;
	setCategory: (category: string) => void;
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

export const CategoryMenu: React.FC<CategoryMenuProps> = ({
	colorScheme,
	setCategory,
	category,
}) => {
	let { height } = useWindowDimensions();
	height = height * 0.75;
	const handleCategorySelect = (value: string) => {
		setCategory(value);
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
								borderColor: DarkenColor(
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
									color: DarkenColor(
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
								borderColor: DarkenColor(palette.primary, -60),
								backgroundColor: palette.transparent,
							},
						]}
					>
						<Text
							style={[
								styles.categoryText,
								{
									color: DarkenColor(
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
						<MaterialIcons
							name='clear'
							size={20}
							color={colorScheme === "dark" ? palette.white : palette.black}
						/>
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
											borderColor: DarkenColor(
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
												color: DarkenColor(
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
