import { StyleSheet } from "react-native";
import { View, Text } from "@/components/Themed";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const task = () => {
	const { id } = useLocalSearchParams();
	return (
		<View>
			<Text>Task id {id}</Text>
		</View>
	);
};

export default task;

const styles = StyleSheet.create({});
