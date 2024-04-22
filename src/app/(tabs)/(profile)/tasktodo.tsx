import { StyleSheet, FlatList } from "react-native";
import { Text, View } from "@/components/Themed";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { fetchUserTasks } from "@/utils/api";
// import { useAuth } from "@/components/contexts/AuthContext";
// import LoadingScreen from "@/components/LoadingScreen";
// import SomethingWrong from "@/components/SomethingWrong";
// import Task from "@/app/pages/Task";

const MyTaskTodo = () => {
	// ? To work after implementing task requests logic in the backend
	// const { signOut, isLoading, userData } = useAuth();
	// const uid = userData?.user?.id;
	// const {
	// 	data: task,
	// 	error: taskError,
	// 	fetchNextPage,
	// 	hasNextPage,
	// 	isFetching,
	// 	isFetchingNextPage,
	// 	status,
	// 	isLoading: isLoadingTasks,
	// } = useInfiniteQuery({
	// 	queryKey: ["workerTask"],
	// 	queryFn: async ({ pageParam = 1 }) => {
	// 		return await fetchUserTasks(pageParam, userData, signOut, uid);
	// 	},
	// 	initialPageParam: 1,
	// 	enabled: !!userData,
	// 	getNextPageParam: (lastPage, pages) => {
	// 		if (lastPage.length === 0) return undefined;
	// 		return pages.length + 1;
	// 	},
	// });

	// const onEndReachedFunc = () => {
	// 	if (hasNextPage && !isLoadingTasks) {
	// 		fetchNextPage();
	// 	}
	// };

	// const flatData = task?.pages.flatMap(page => page.data);

	// if (isLoading) {
	// 	return <LoadingScreen />;
	// }

	// if (taskError) {
	// 	return <SomethingWrong />;
	// }
	return (
		<View style={styles.container}>
			{/* <FlatList
				data={flatData}
				showsVerticalScrollIndicator={false}
				keyExtractor={item => item?.id.toString()}
				// onEndReached={onEndReachedFunc}
				onEndReachedThreshold={0.5}
				renderItem={({ item }) => <Task item={item} />}
			/> */}
			<Text style={styles.title}>My Task todo</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontFamily: "InterSemiBold",
	},
});

export default MyTaskTodo;
