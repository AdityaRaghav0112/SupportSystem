import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function TicketDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>Ticket Detail</Text>
				<Text style={styles.subtitle}>Viewing ticket #{id}</Text>
				<View style={styles.card}>
					<Text style={styles.label}>Status</Text>
					<Text style={styles.value}>In Progress</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F3F4F6",
	},
	content: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: "700",
		color: "#111827",
	},
	subtitle: {
		marginTop: 8,
		color: "#6B7280",
		marginBottom: 20,
	},
	card: {
		backgroundColor: "#FFFFFF",
		borderRadius: 14,
		padding: 18,
	},
	label: {
		color: "#6B7280",
		marginBottom: 6,
	},
	value: {
		fontSize: 18,
		fontWeight: "600",
		color: "#111827",
	},
});
