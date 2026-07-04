import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getTicket, updateTicket } from "../../api/ticket";
import { useAuth } from "../../context/AuthContext";

export default function TicketDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { user } = useAuth();
	const isManager = user?.role === "management";
	const isIt = user?.role === "it";
	const [ticket, setTicket] = useState<any | null>(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		loadTicket();
	}, [id]);

	const loadTicket = async () => {
		try {
			const data = await getTicket(id);
			setTicket(data);
		} catch (error) {
			Alert.alert("Error", "Unable to load ticket details.");
		} finally {
			setLoading(false);
		}
	};

	const assignToIT = async () => {
		if (!ticket) {
			return;
		}

		try {
			setSaving(true);
			const response = await updateTicket(ticket.id, {
				assigned_department: "IT Department",
				status: "Assigned",
			});

			setTicket(response.ticket ?? ticket);
			Alert.alert("Success", "Ticket assigned to IT Department.");
		} catch (error) {
			Alert.alert("Error", "Unable to assign the ticket.");
		} finally {
			setSaving(false);
		}
	};

	const updateStatus = async (
		status: string,
		successMessage?: string
	) => {
		if (!ticket) {
			return false;
		}

		try {
			setSaving(true);
			const response = await updateTicket(ticket.id, {
				status,
			});

			setTicket(response.ticket ?? ticket);
			if (successMessage) {
				Alert.alert("Success", successMessage);
			}

			return true;
		} catch (error) {
			Alert.alert("Error", "Unable to update the ticket status.");
			return false;
		} finally {
			setSaving(false);
		}
	};

	const closeTicket = async () => {
		await updateStatus("Closed", "Ticket closed.");
	};

	const reassignToIT = async () => {
		if (!ticket) {
			return;
		}

		try {
			setSaving(true);
			const response = await updateTicket(ticket.id, {
				assigned_department: "IT Department",
				status: "Assigned",
			});

			setTicket(response.ticket ?? ticket);
			Alert.alert("Success", "Ticket sent back to IT Department.");
		} catch (error) {
			Alert.alert("Error", "Unable to reassign the ticket.");
		} finally {
			setSaving(false);
		}
	};

	const isAssigned =
		ticket?.status === "Assigned" ||
		Boolean(ticket?.assigned_department);
	const isInProgress = ticket?.status === "In Progress";
	const isResolved = ticket?.status === "Resolved";
	const isClosed = ticket?.status === "Closed";
	const showAssignedBadge = isAssigned && !isResolved && !isClosed;
	const managerActionLabel = isResolved
		? "Reassign to IT Department"
		: "Assign to IT Department";
	const managerActionHandler = isResolved ? reassignToIT : assignToIT;
	const showManagerAction = !isClosed && (!isAssigned || isResolved);

	if (loading) {
		return (
			<SafeAreaView style={styles.container}>
				<ActivityIndicator size="large" />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.content}>
				<Text style={styles.title}>Ticket Detail</Text>
				<Text style={styles.subtitle}>Viewing ticket #{ticket?.id ?? id}</Text>
				<View style={styles.card}>
					<Text style={styles.label}>Title</Text>
					<Text style={styles.value}>{ticket?.title}</Text>

					<Text style={styles.label}>Description</Text>
					<Text style={styles.description}>{ticket?.description}</Text>

					<Text style={styles.label}>Status</Text>
					<Text style={styles.value}>{ticket?.status}</Text>

					<Text style={styles.label}>Assigned Department</Text>
					<Text style={styles.value}>
						{ticket?.assigned_department ?? "Not assigned"}
					</Text>

					{isClosed ? (
						<View style={styles.closedBadge}>
							<Text style={styles.closedBadgeText}>
								Closed
							</Text>
						</View>
					) : null}

					{isManager ? (
						<>
							{showAssignedBadge ? (
								<View style={styles.assignedBadge}>
									<Text style={styles.assignedBadgeText}>
										Assigned to IT Department
									</Text>
								</View>
							) : null}

							{showManagerAction ? (
								<Pressable
									style={styles.button}
									onPress={managerActionHandler}
									disabled={saving}
								>
									<Text style={styles.buttonText}>
										{saving ? "Saving..." : managerActionLabel}
									</Text>
								</Pressable>
							) : null}

							{isResolved && !isClosed ? (
								<>
									<Pressable
										style={styles.secondaryButton}
										onPress={closeTicket}
										disabled={saving}
									>
										<Text style={styles.secondaryButtonText}>
											Close Ticket
										</Text>
									</Pressable>
								</>
							) : null}
						</>
					) : null}

					{isIt ? (
						<>
							{!isClosed && isInProgress ? (
								<View style={styles.inProgressBadge}>
									<Text style={styles.inProgressBadgeText}>
										In Progress
									</Text>
								</View>
							) : null}

							{!isClosed && !isResolved && !isInProgress ? (
								<Pressable
									style={styles.button}
									onPress={() => updateStatus("In Progress")}
									disabled={saving}
								>
									<Text style={styles.buttonText}>
										Mark In Progress
									</Text>
								</Pressable>
							) : null}

							{!isClosed && ticket?.status === "In Progress" ? (
								<Pressable
									style={styles.secondaryButton}
									onPress={() => updateStatus("Resolved", "Ticket marked as resolved.")}
									disabled={saving}
								>
									<Text style={styles.secondaryButtonText}>
										Mark Resolved
									</Text>
								</Pressable>
							) : null}
						</>
					) : null}
				</View>
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
		marginBottom: 12,
	},
	description: {
		fontSize: 16,
		color: "#374151",
		marginBottom: 12,
		lineHeight: 22,
	},
	button: {
		marginTop: 8,
		backgroundColor: "#2563EB",
		paddingVertical: 14,
		borderRadius: 12,
		alignItems: "center",
	},
	buttonText: {
		color: "#FFFFFF",
		fontSize: 15,
		fontWeight: "700",
	},
	secondaryButton: {
		marginTop: 12,
		backgroundColor: "#E5E7EB",
		paddingVertical: 14,
		borderRadius: 12,
		alignItems: "center",
	},
	secondaryButtonText: {
		color: "#111827",
		fontSize: 15,
		fontWeight: "700",
	},
	assignedBadge: {
		marginTop: 8,
		backgroundColor: "#DBEAFE",
		paddingVertical: 14,
		borderRadius: 12,
		alignItems: "center",
	},
	assignedBadgeText: {
		color: "#1D4ED8",
		fontSize: 15,
		fontWeight: "700",
	},
	inProgressBadge: {
		marginTop: 8,
		backgroundColor: "#DCFCE7",
		paddingVertical: 14,
		borderRadius: 12,
		alignItems: "center",
	},
	inProgressBadgeText: {
		color: "#15803D",
		fontSize: 15,
		fontWeight: "700",
	},
	closedBadge: {
		marginTop: 8,
		backgroundColor: "#E5E7EB",
		paddingVertical: 14,
		borderRadius: 12,
		alignItems: "center",
	},
	closedBadgeText: {
		color: "#374151",
		fontSize: 15,
		fontWeight: "700",
	},
});
