import {
	Menu,
	MenuOption,
	MenuOptions,
	MenuTrigger,
	renderers,
} from "react-native-popup-menu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ColorSchemeName } from "react-native";
import { palette } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { Text } from "../Themed";

type TaskPopupMenuProps = {
	colorScheme: ColorSchemeName;
	taskId: number;
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

const styles = StyleSheet.create({
	menuItem: {
		padding: 8,
	},
	text: {
		fontFamily: "Inter",
		paddingHorizontal: 8,
	},
});
