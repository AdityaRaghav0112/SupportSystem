import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  priority: string;
  status: string;
  onPress?: () => void;
};

const statusColors: Record<string, string> = {
  Pending: "#F59E0B",
  Assigned: "#3B82F6",
  "In Progress": "#8B5CF6",
  Resolved: "#10B981",
  Closed: "#6B7280",
};

export default function TicketCard({
  title,
  priority,
  status,
  onPress,
}: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.row}>
        <Text style={styles.priority}>{priority} Priority</Text>

        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                statusColors[status] ?? "#CBD5E1",
            },
          ]}
        >
          <Text style={styles.badgeText}>{status}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 2,
  },

  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
  },

  row: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  priority: {
    color: "#6B7280",
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },

  badgeText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
});