import Task from "@/app/pages/Task";
import { useAuth } from "@/components/contexts/AuthContext";
import LoadingScreen from "@/components/LoadingScreen";
import NothingToSee from "@/components/NothingToSee";
import SomethingWrong from "@/components/SomethingWrong";
import { View } from "@/components/Themed";
import { fetchUserTasks } from "@/utils/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet } from "react-native";

const TaskAssigned: React.FC<{
	userId?: number;
}> = ({ userId }) => {
	// userId prop is passed from otherProfile.tsx
	const { signOut, isLoading, userData } = useAuth();
	// const uid = pathname === "/pages/otherProfile" ? userId : userData?.user?.id;
	const uid = userId || userData?.user?.id;

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
		queryKey: ["userTask", uid],
		queryFn: async ({ pageParam = 1 }) => {
			return await fetchUserTasks(pageParam, userData, signOut, uid);
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
	const isEmpty = flatData?.length === 0;

	if (isEmpty) {
		return <NothingToSee />;
	}

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

export default TaskAssigned;
