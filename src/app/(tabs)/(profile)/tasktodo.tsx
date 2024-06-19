import Task from "@/app/pages/Task";
import { useAuth } from "@/components/contexts/AuthContext";
import LoadingScreen from "@/components/LoadingScreen";
import SomethingWrong from "@/components/SomethingWrong";
import { View } from "@/components/Themed";
import { fetchTaskTodo } from "@/utils/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePathname } from "expo-router";
import { FlatList, StyleSheet } from "react-native";

const MyTaskTodo: React.FC<{
	userId?: number;
}> = ({ userId }) => {
	const { signOut, isLoading, userData } = useAuth();
	const pathname = usePathname();
	const uid = pathname === "/pages/otherProfile" ? userId : userData?.user?.id;

	const {
		data: task,
		error: taskError,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
		isLoading: isLoadingTasks,
	} = useInfiniteQuery({
		queryKey: ["userTodo", uid],
		queryFn: async ({ pageParam = 1 }) => {
			return await fetchTaskTodo(pageParam, userData, signOut, uid);
		},
		initialPageParam: 1,
		enabled: !!userData && uid !== undefined,
		getNextPageParam: (lastPage, pages) => {
			if (lastPage.length === 0) return undefined;
			return pages.length + 1;
		},
	});

	const onEndReachedFunc = () => {
		if (hasNextPage && !isLoadingTasks) {
			fetchNextPage();
		}
	};

	const flatData = task?.pages.flatMap(page => page.data);

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (taskError) {
		return <SomethingWrong />;
	}
	return (
		<View style={styles.container}>
			<FlatList
				data={flatData}
				showsVerticalScrollIndicator={false}
				keyExtractor={item => item?.id.toString()}
				onEndReached={onEndReachedFunc}
				onEndReachedThreshold={0.5}
				renderItem={({ item }) => <Task item={item} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontFamily: "InterSemiBold",
	},
});

export default MyTaskTodo;
