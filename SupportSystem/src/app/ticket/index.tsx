import { router } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const tickets = [
	{ id: 1, title: "Laptop not booting", priority: "High", status: "Pending" },
	{ id: 2, title: "VPN not connecting", priority: "Medium", status: "In Progress" },
	{ id: 3, title: "Printer issue", priority: "Low", status: "Resolved" },
];

export default function TicketListScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.content}>
				<Text style={styles.title}>All Tickets</Text>
				<Text style={styles.subtitle}>Browse the active support requests.</Text>

				{tickets.map((ticket) => (
					<Pressable
						key={ticket.id}
						style={styles.card}
						onPress={() => router.push(`/ticket/${ticket.id}`)}
					>
						<View style={styles.row}>
							<Text style={styles.cardTitle}>{ticket.title}</Text>
							<Text style={styles.status}>{ticket.status}</Text>
						</View>
						<Text style={styles.priority}>{ticket.priority} Priority</Text>
					</Pressable>
				))}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F3F4F6",
	},
	content: {
		padding: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: "700",
		color: "#111827",
	},
	subtitle: {
		marginTop: 8,
		marginBottom: 20,
		color: "#6B7280",
	},
	card: {
		backgroundColor: "#FFFFFF",
		padding: 18,
		borderRadius: 14,
		marginBottom: 16,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 12,
	},
	cardTitle: {
		flex: 1,
		fontSize: 16,
		fontWeight: "600",
		color: "#111827",
	},
	status: {
		color: "#2563EB",
		fontWeight: "600",
	},
	priority: {
		marginTop: 10,
		color: "#6B7280",
	},
});
